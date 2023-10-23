import { list_taskUI } from "./board";

const localstorage_param = "tasks";

export function getTasks() {
  if (localStorage.getItem(localstorage_param)) {
    return JSON.parse(localStorage.getItem(localstorage_param));
  } else {
    return null;
  }
}
export function addTask(task) {
  const timeStamp = Date.now();
  const task_obj = {
    task_id: 0,
    task: task,
    status: 0,
    created_at: timeStamp,
  };
  if (getTasks()) {
    let prevTasks = getTasks();
    // Update the id
    task_obj.task_id = parseInt(prevTasks[prevTasks.length - 1].task_id) + 1;
    prevTasks.push(task_obj);
    localStorage.setItem(localstorage_param, JSON.stringify(prevTasks));
  } else {
    localStorage.setItem(localstorage_param, JSON.stringify([task_obj]));
  }
}

export function updateTaskStatus(taskId, status) {
  let tasks = getTasks();
  let obj = tasks.find((task) => task.task_id == taskId);
  obj.status = status;
  localStorage.setItem(localstorage_param, JSON.stringify(tasks));
  list_taskUI();
}
export function getTask(id) {
  return getTasks().find((task) => task.task_id == id);
}
export function getTaskIndex(id) {
  return getTasks().findIndex((task) => task.task_id == id);
}

export function removeTask(taskId) {
  let filteredTasks = getTasks().filter((task) => task.task_id != taskId);
  localStorage.setItem(localstorage_param, JSON.stringify(filteredTasks));
  list_taskUI();
}
