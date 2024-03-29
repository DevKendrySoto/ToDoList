const date = document.querySelector("#date");
const input = document.querySelector("#input");
const button = document.querySelector("#add");
const list = document.querySelector("#list");
const check = document.querySelector("#check");
const remove = document.querySelector("#remove");
const task = document.querySelector(".task");
const taskComplete = document.querySelector(".tasks");
let id;
let LIST;

const stylescheckComplete = "text-decoration-line-through";

const TM = new Date();
date.innerHTML = TM.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function addTask(task, id, done, trash) {
  const element = ` <li 
    class="d-flex align-items-center justify-content-center rounded-pill p-3"
  >
    <input type="checkbox" id="${id}" data='done'/>
    <span id="task" class="mx-5">${task}</span>
    <input type="button" id="${id}" class="btn btn-link ms-2" data="remove">
              <svg
                data="remove"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </input>
  </li>`;

  list.insertAdjacentHTML("beforeend", element);
}

function taskDone(element) {
  element.parentNode
    .querySelector("#task")
    .classList.toggle(stylescheckComplete);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

button.addEventListener("click", () => {
  const task = input.value;
  if (task) {
    addTask(task, id, false, false);
    LIST.push({
      name: task,
      id: id,
      done: false,
      trash: false,
    });
  }
  localStorage.setItem("TDList", JSON.stringify(LIST));
  input.value = "";
  id++;
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const task = input.value;
    if (task) {
      addTask(task, id, false, false);
      LIST.push({
        name: task,
        id: id,
        done: false,
        trash: false,
      });
    }
    localStorage.setItem("TDList", JSON.stringify(LIST));
    input.value = "";
    id++;
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
  localStorage.setItem("TDList", JSON.stringify(LIST));
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
    addTask(item.name, item.id, item.done, item.trash);
  });
}
