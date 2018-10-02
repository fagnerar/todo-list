let btnAdd = document.querySelector('.btn-add');

btnAdd.addEventListener('click', function(e) {
  if (isInputClear()) return;
  document.querySelector('.list').appendChild(newTODO());
  clearInput();
});

function newTODO() {
  /* <li class="todo">
  <input type="checkbox" class="real-check" id="check{number}">
  <label for="check{number}" class="checker"></label>
  <span>Input text.</span><div class="trash"></div></li> */
  const newCheckId = getCheckId();
  const newCheckbox = getNewCheckbox(newCheckId);
  const newLabel = getNewLabel(newCheckId);
  const newSpan = getNewSpan();
  const newTrash = getNewTrash();

  const todo = getLastLine().cloneNode();
  todo.appendChild(newCheckbox);
  todo.appendChild(newLabel);
  todo.appendChild(newSpan);
  todo.appendChild(newTrash);

  return todo;
}

function getNewTrash() {
  const newTrash = document.createElement('div');
  newTrash.className = 'trash';
  return newTrash;
}

function isInputClear() {
  return document.querySelector('.input-add').value === '';
}

function clearInput() {
  document.querySelector('.input-add').value = '';
}

function getNewSpan() {
  const newSpan = document.createElement('span');
  newSpan.innerText = document.querySelector('.input-add').value;
  return newSpan;
}

function getNewLabel(newCheckId) {
  const newLabel = document.createElement('label');
  newLabel.htmlFor = newCheckId;
  newLabel.className = 'checker';

  return newLabel;
}

function getNewCheckbox(newCheckId) {
  const newCheck = document.createElement('input');
  newCheck.type = 'checkbox';
  newCheck.className = 'real-check';
  newCheck.id = newCheckId;

  return newCheck;
}

function getCheckId() {
  let newCheckId = getLastCheckId().match(/[0-9]+/gi);
  newCheckId = parseInt(newCheckId) + 1;
  newCheckId = 'check' + newCheckId;

  return newCheckId;
}

function getLastCheckId() {
  const list = document.querySelector('.list');
  const lastLine = list.lastElementChild;
  const lastCheckId = lastLine.firstElementChild.id;

  return lastCheckId;
}

function getLastLine() {
  return document.querySelector('.list').lastElementChild;
}
