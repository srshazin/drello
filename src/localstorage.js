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
