import './style.css';

const list = JSON.parse(localStorage.getItem('list')) || [{
  descreption: 'first',
  completed: false,
},
{
  descreption: 'second',
  completed: false,
},
{
  descreption: 'third',
  completed: false,
}];
const insert = document.getElementById('insert');
const listItems = document.querySelector('.list-items');
function ToDo(descreption, completed, index) {
  this.descreption = descreption;
  this.completed = completed;
  this.index = index;
}

function removeChildNodes(listItems) {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
}

function refreshStorage() {
  localStorage.setItem('list', JSON.stringify(list));
}

function update() {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
    refreshStorage();
  }
}

function clearAll() {
  const clearAllBtn = document.querySelector('.remove-button');
  if (listItems.childNodes.length > 0) {
    clearAllBtn.style.display = 'block';
  } else {
    clearAllBtn.style.display = 'none';
  }
  clearAllBtn.addEventListener('click', () => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].completed) {
        list.splice(i, 1);
        listItems.removeChild(listItems.childNodes[i]);
        window.location.reload();
        refreshStorage();
        update();
      }
    }
  });
}

function addToDo() {
  const newAdd = new ToDo();
  newAdd.descreption = document.getElementById('insert').value;
  newAdd.completed = false;
  list.push(newAdd);
  update();
}

function pushContent() {
  removeChildNodes(listItems);
  insert.value = '';
  // insert.focus();
  list.forEach((element) => {
    const listItem = document.createElement('li');
    const check = document.createElement('div');
    check.className = 'check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';
    const descreForm = document.createElement('form');
    descreForm.className = 'desc-form';
    const descreption = document.createElement('input');
    descreption.type = 'text';
    descreption.className = 'descreption';
    descreption.value = element.descreption;
    const icon1 = document.createElement('button');
    icon1.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    icon1.className = 'fas fa-ellipsis-v';
    const icon2 = document.createElement('button');
    icon2.className = 'fa fa-trash';
    icon2.innerHTML = '<i class="fas fa-trash">u</i>';
    descreForm.appendChild(descreption);
    check.appendChild(input);
    check.appendChild(descreForm);
    listItem.appendChild(check);
    listItem.appendChild(icon1);
    listItem.appendChild(icon2);
    listItems.appendChild(listItem);
  });
  update();
  refreshStorage();
}

function removeToDO() {
  const remove = Array.from(document.querySelectorAll('.fa-trash'));
  for (let i = 0; i < list.length; i += 1) {
    remove[i].addEventListener('click', () => {
      list.splice(i, 1);
      listItems.removeChild(listItems.childNodes[i]);
      window.location.reload();
      update();
      refreshStorage();
    });
  }
}

function checked() {
  const checks = Array.from(document.querySelectorAll('.checkbox'));
  const descreption = Array.from(document.querySelectorAll('.descreption'));
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].completed) {
      descreption[i].classList.toggle('checked');
      checks[i].toggleAttribute('checked');
      refreshStorage();
    }
  }
}

function checkBox() {
  const checks = Array.from(document.querySelectorAll('.checkbox'));
  const descreption = Array.from(document.querySelectorAll('.descreption'));
  for (let i = 0; i < list.length; i += 1) {
    checks[i].addEventListener('click', () => {
      list[i].completed = checks[i].checked;
      descreption[i].classList.toggle('checked');
      checks[i].toggleAttribute('checked');
      refreshStorage();
    });
  }
}

function edit() {
  const descForm = Array.from(document.querySelectorAll('.desc-form'));
  const enterDes = Array.from(document.querySelectorAll('.descreption'));
  for (let i = 0; i < list.length; i += 1) {
    descForm[i].addEventListener('submit', (e) => {
      e.preventDefault();
      list[i].descreption = enterDes[i].value;
      refreshStorage();
    });
  }
}

document.querySelector('.insert').addEventListener('submit', (e) => {
  e.preventDefault();
  addToDo();
  pushContent();
  removeToDO();
  checked();
  checkBox();
  clearAll();
  edit();
});

window.onload = () => {
  pushContent();
  removeToDO();
  checked();
  checkBox();
  clearAll();
  edit();
};