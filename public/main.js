const date = document.querySelector("#date");
const input = document.querySelector("#input");
const button = document.querySelector("#add");
const list = document.querySelector("#list");
let id;
let LIST = [];

const stylescheckComplete = "text-decoration-line-through";

const TM = new Date();
date.innerHTML = TM.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function addTask(task, id, done) {
  const element = `
    <li class="d-flex align-items-center justify-content-center rounded-pill p-3">
      <input type="checkbox" class="ms-2" id="${id}" data='done' ${done ? "checked" : ""}/>
      <span id="task" class="mx-5 ${done ? stylescheckComplete : ""}">${task}</span>
      <input type="button" id="${id}" class="btn btn-link ms-2" data="remove" value="delete">
    </li>`;
  list.insertAdjacentHTML("beforeend", element);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        addTask(task.name, task.id, task.done);
      });
      LIST = tasks;
      id = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;
    });
});

button.addEventListener("click", () => {
  const taskValue = input.value;
  if (taskValue) {
    const newTask = {
      name: taskValue,
      id: id,
      done: false
    };
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(task => {
      addTask(task.name, task.id, task.done);
      LIST.push(task);
      input.value = "";
      id++;
    });
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

list.addEventListener("click", function (e) {
  const element = e.target;
  const elementData = element.attributes.data.value;
  if (elementData === "done") {
    taskDone(element);
  } else if (elementData === "remove") {
    removeTask(element);
  }
});

function taskDone(element) {
  const taskId = element.id;
  fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
  })
  .then(() => {
    const taskSpan = element.parentNode.querySelector("#task");
    taskSpan.classList.toggle(stylescheckComplete);
    LIST = LIST.map(task =>
      task.id == taskId ? { ...task, done: !task.done } : task
    );
  });
}

function removeTask(element) {
  const taskId = element.id;
  fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  })
  .then(() => {
    element.parentNode.remove();
    LIST = LIST.filter(task => task.id != taskId);
  });
}
