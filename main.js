let btnAdd = document.querySelector('.btn-add');

btnAdd.addEventListener('click', function(e) {
  const newCheckId = getCheckId();

  const newCheckbox = getNewCheckbox(newCheckId);
  const newLabel = getNewLabel(newCheckId);
  const newSpan = getNewSpan();

  const newLine = getLastLine().cloneNode();
  newLine.appendChild(newCheckbox);
  newLine.appendChild(newLabel);
  newLine.appendChild(newSpan);

  /* <li class="todo">
  <input type="checkbox" class="real-check" id="check{number}">
  <label for="check{number}" class="checker"></label>
  <span>Input text.</span></li> */
  document.querySelector('.list').appendChild(newLine);
});

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
