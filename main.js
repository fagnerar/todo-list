(function init() {
  const todoList =  document.querySelector('.list');

  for (let i = 0; i < 5; i++) {
    todoList.appendChild(newTODO());
  }

  initTODO(0, 'Preparar mp3 player.');
  initTODO(1, 'Fazer alongamento por 10 minutos.');
  initTODO(2, 'Colocar o tênis.');
  initTODO(3, 'Sair na rua.');
  initTODO(4, 'Correr.');

  function initTODO(index, todoText) {
    todoList.children[index]
      .getElementsByTagName('span')[0]
      .innerText = todoText;
  }

const btnAdd = document.querySelector('.btn-add');

document.querySelector('.btn-add').addEventListener('click', function(e) {
  if (isInputClear()) return;
  document.querySelector('.list').appendChild(newTODO());
  clearInput();
});

function newTODO() {
  /* <li class="todo">
  <input type="checkbox" class="real-check" id="check{number}">
  <div class="drag"></div>
  <label for="check{number}" class="checker"></label>
  <span>Input text.</span><div class="trash"></div></li> */
  const newCheckId = getCheckId();
  const newCheckbox = getNewCheckbox(newCheckId);
  const newLabel = getNewLabel(newCheckId);
  const newDrag = getNewDrag();
  const newSpan = getNewSpan();
  const newTrash = getNewTrash();

  const todo = document.createElement('li');
  todo.className = 'todo';
  todo.appendChild(newCheckbox);
  todo.appendChild(newLabel);
  todo.appendChild(newDrag);
  todo.appendChild(newSpan);
  todo.appendChild(newTrash);
  todo.addEventListener('click', toggleTodo);

  return todo;
}

function toggleTodo() {
  const checkbox = this.firstElementChild;
  if (checkbox.checked) checkbox.checked = false;
  else checkbox.checked = true;
}

function getNewDrag() {
  const newDrag = document.createElement('div');
  newDrag.className = 'drag';
  return newDrag;
}

function getNewTrash() {
  const newTrash = document.createElement('div');
  newTrash.className = 'trash';
  newTrash.addEventListener('click', removeTodo);
  return newTrash;
}

function removeTodo() {
  const li = this.parentNode;
  if ( ! li.firstElementChild.checked) return;

  li.parentNode.removeChild(li);
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
  const hasTodo = document.querySelector('.list').hasChildNodes();
  if ( ! hasTodo) return 'check1';

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

})();
