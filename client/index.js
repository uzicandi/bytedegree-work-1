// input 창에서 keyword 입력하면 받아서 전달
function inputKeyword() {
  const searchField = document.querySelector('#search-field');
  searchField.addEventListener('input', e =>
    loadItems(e.target.value).then(items => {
      displayItems(items);
      setEventListeners();
    })
  );
}

// 받은 keyword 로 데이터 추출
function loadItems(q) {
  return fetch('/autocomplete?keyword=' + q)
    .then(res => res.json())
    .then(json => json);
}

// 받은 데이터를 ul 하위에 입력
function displayItems(items) {
  if (items.length > 0) {
    const container = document.querySelector('.autocomplete-results');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
  }
}

// ul 하위에 입력할 li tag 생성
function createHTMLString(item) {
  return `<li class="item">${item}</li>`;
}

// li tag 클릭시 값 받아오기
function setEventListeners() {
  const itemList = document.querySelectorAll('.item');
  for (let item of itemList) {
    item.addEventListener('click', e => setInput(e.target.textContent));
  }
}

// 클릭 후 받은 값 Input 창에 넣고 list 창 닫기
function setInput(val) {
  const inputTag = document.querySelector('#search-field');
  const resultItems = document.querySelectorAll('.item');
  inputTag.value = val;
  for (let item of resultItems) {
    item.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', inputKeyword);
