import { listTaskUI } from "./board";
import { currentBoard } from "./states";
import { Board, Task } from "./type";

const localstorage_param = "boards";

export function addTask(task: string, onAdd: () => void) {
  if (!currentBoard) {
    return;
  }
  const newTask: Task = {
    task_id:
      currentBoard.tasks.length > 0
        ? currentBoard.tasks[currentBoard.tasks.length - 1].task_id + 1
        : 0,
    task: task,
    status: 0,
    created_at: Date.now(),
  };

  currentBoard.tasks.push(newTask);
  currentBoard.updatedAt = Date.now();
  // call in the on add callback before making changes to localstorage for fast ui update
  onAdd();
  const localBoards = localStorage.getItem("boards");
  if (localBoards == null) {
    alert("Something went wrong!");
    return;
  }
  const parsedBoards = JSON.parse(localBoards) as Board[];
  const loc = parsedBoards.findIndex((b) => b.bid == currentBoard!.bid);
  if (loc == -1) {
    alert("Something went wrong!");
    return;
  }
  parsedBoards[loc].tasks.push(newTask);
  // now save the changes into localstorage
  localStorage.setItem("boards", JSON.stringify(parsedBoards));
}

export function updateTaskStatus(
  taskId: number,
  status: number,
  onDone: () => void = listTaskUI
) {
  if (!currentBoard) {
    return;
  }
  const taskIndex = currentBoard.tasks.findIndex((t) => t.task_id == taskId);
  currentBoard.tasks[taskIndex].status = status;
  // trigger ui changing callback
  onDone();
  // now update changes in the localstorage
  const localBoards = localStorage.getItem("boards");
  if (!localBoards) {
    alert("Something went wrong!");
    return;
  }
  const parsedBoards = JSON.parse(localBoards) as Board[];
  // find the index of the board
  const boardIndex = parsedBoards.findIndex((b) => b.bid == currentBoard!.bid);
  if (boardIndex == -1) {
    alert("Something went wrong!");
    return;
  }
  // now find the index of the task we're updating
  const tIndex = parsedBoards[boardIndex].tasks.findIndex(
    (t) => t.task_id == taskId
  );
  // update the status of that specific task
  parsedBoards[boardIndex].tasks[tIndex].status = status;
  // finally save the changes into localstorage
  localStorage.setItem("boards", JSON.stringify(parsedBoards));
}

export function removeTask(taskId: number, onDone: () => void = listTaskUI) {
  if (!currentBoard) {
    return;
  }
  // filter-out the task id
  currentBoard.tasks = currentBoard.tasks.filter((t) => t.task_id != taskId);
  // trigger ui changing callback
  onDone();
  // now update changes in the localstorage
  const localBoards = localStorage.getItem("boards");
  if (!localBoards) {
    alert("Something went wrong!");
    return;
  }
  const parsedBoards = JSON.parse(localBoards) as Board[];
  // find the index of the board
  const boardIndex = parsedBoards.findIndex((b) => b.bid == currentBoard!.bid);
  if (boardIndex == -1) {
    alert("Something went wrong!");
    return;
  }
  // filter-out
  parsedBoards[boardIndex].tasks = parsedBoards[boardIndex].tasks.filter(
    (t) => t.task_id != taskId
  );
  // finally save the changes into localstorage
  localStorage.setItem("boards", JSON.stringify(parsedBoards));
}
