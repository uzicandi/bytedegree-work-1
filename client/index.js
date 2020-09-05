function loadItems(q) {
  return fetch('/autocomplete?keyword=' + q)
    .then(res => res.json())
    .then(json => json);
}

function inputKeyword() {
  const searchField = document.querySelector('#search-field');
  searchField.addEventListener('input', e =>
    loadItems(e.target.value).then(items => {
      displayItems(items);
      setEventListeners();
    })
  );
}

function displayItems(items) {
  if (items.length > 0) {
    const container = document.querySelector('.autocomplete-results');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
  }
}

function createHTMLString(item) {
  return `<li class="item">${item}</li>`;
}

// 선택하면 input창의 입력값이 해당 키워드로 변경
function setEventListeners() {
  const itemList = document.querySelectorAll('.item');
  for (let item of itemList) {
    item.addEventListener('click', e => setInput(e.target.textContent));
  }
}

function setInput(val) {
  const inputTag = document.querySelector('#search-field');
  const resultItems = document.querySelectorAll('.item');
  inputTag.value = val;
  for (let item of resultItems) {
    item.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', inputKeyword);
