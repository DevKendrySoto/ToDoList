let tasks = [];

const getAllTasks = () => tasks;

const addTask = (task) => {
  tasks.push({
    ...task,
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    done: false,
  });
};
const toggleTaskDone = (id) => {
  tasks = tasks.map(task => 
    task.id == id ? { ...task, done: !task.done } : task
  );
};
const removeTask = (id) => {
  tasks = tasks.filter(task => task.id != id);
};

module.exports = {
  getAllTasks,
  addTask,
  toggleTaskDone,
  removeTask,
};
