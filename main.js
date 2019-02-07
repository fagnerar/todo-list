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
  todoList
    .children[index]
    .getElementsByTagName('span')[0]
    .innerText = todoText;
}

document.querySelector('.btn-add').addEventListener('click', function(e) {
  if (isInputClear()) return;

  todoList.appendChild(newTODO());

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

  todo.addEventListener('dragstart', handleDragStart, false);
  todo.addEventListener('dragend', handleDragEnd, false);
  todo.addEventListener('dragenter', handleDragEnter, false);
  todo.addEventListener('dragover', handleDragOver, false);
  todo.addEventListener('drop', handleDrop, false);
  todo.addEventListener('dragleave', handleLeave, false);
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
  newDrag.addEventListener('mousedown', function() {
    this.parentNode.draggable = true;
  });
  newDrag.addEventListener('mouseup', function() {
    this.parentNode.draggable = false;
  });
  return newDrag;
}

let dragSrc = null;
function handleDragStart(e) {
  this.style.opacity = 0.4;
  dragSrc = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragSrc.innerHTML);
}

function handleDragEnter() {
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrc === this) {
    return;
  }

  const itemArray = Array.prototype.slice.call(this.parentNode.children);
  const draggedItemPosition = itemArray.indexOf(dragSrc);
  const newPosition = itemArray.indexOf(this);

  if (draggedItemPosition < newPosition) {
    this.parentNode.insertBefore(dragSrc, this.nextSibling);

  } else {
    this.parentNode.insertBefore(dragSrc, this);
    
  }
}

function handleLeave() {
}

function handleDragEnd() {
  this.draggable = false;
  this.style.opacity = 1.0;
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
  newSpan.draggable = false;
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
  if ( ! todoList.hasChildNodes() ) return 'check0';

  let newCheckId = 0;

  while (todoList.querySelector('#check' + newCheckId)) {
    newCheckId++;
  }

  newCheckId = 'check' + newCheckId;

  return newCheckId;
}

})();
