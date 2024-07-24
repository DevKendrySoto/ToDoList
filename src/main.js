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
      <input type="checkbox" class=" ms-2" id="${id}" data='done' ${done ? "checked" : ""}/>
      <span id="task" class="mx-5 ${
        done ? stylescheckComplete : ""
      }">${task}</span>
      <input type="button" id="${id}" class="btn btn-link ms-2" data="remove" value="delete">
    </li>`;

  list.insertAdjacentHTML("beforeend", element);
}

function taskDone(element) {
  const taskSpan = element.parentNode.querySelector("#task");
  taskSpan.classList.toggle(stylescheckComplete);
  LIST[element.id].done = !LIST[element.id].done;
  localStorage.setItem("TDList", JSON.stringify(LIST));
}

function removeTask(element) {
  const taskId = element.id;

  element.parentNode.remove();

  LIST = LIST.filter((task) => task.id != taskId);
  localStorage.setItem("TDList", JSON.stringify(LIST));
}

button.addEventListener("click", () => {
  const taskValue = input.value;
  if (taskValue) {
    addTask(taskValue, id, false, false);
    LIST.push({
      name: taskValue,
      id: id,
      done: false,
      trash: false,
    });
    localStorage.setItem("TDList", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const taskValue = input.value;
    if (taskValue) {
      addTask(taskValue, id, false, false);
      LIST.push({
        name: taskValue,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TDList", JSON.stringify(LIST));
      input.value = "";
      id++;
    }
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

let data = localStorage.getItem("TDList");
if (data) {
  LIST = JSON.parse(data);
  loadList(LIST);
  id = LIST.length;
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    if (!item.trash) {
      addTask(item.name, item.id, item.done, item.trash);
    }
  });
}
