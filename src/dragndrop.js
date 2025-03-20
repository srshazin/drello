import { list_taskUI, taskCount } from "./board";
import { boardDoing, boardFinished, boardTask, task_slots } from "./elements";
import {
  getTask,
  getTaskIndex,
  getTasks,
  updateTaskStatus,
} from "./localstorage";
var selected, draggedElement;
export function handleDrag(e, task) {
  selected = e.target;
  e.dataTransfer.setData("text/plain", e.target.innerText);

  e.dataTransfer.effectAllowed = "move";
  selected.style.opacity = 0.5;

  //   selected.classList.add("dragging");
  // Doing box
  if (taskCount.pending == 0) {
    document.getElementById("task-drop").style.display = "flex";
  }
  if (taskCount.doing == 0) {
    document.getElementById("doing-drop").style.display = "flex";
  }
  if (taskCount.finished == 0) {
    document.getElementById("finished-drop").style.display = "flex";
  }

  // Drop on task board
  boardTask.addEventListener("drop", function (ev) {
    ev.stopImmediatePropagation();
    // console.log(taskCount.doing);
    if (taskCount.pending == 0) {
      console.log("Shifted bitch");
      boardTask.innerHTML = "";
      updateTaskStatus(selected.getAttribute("data-id"), 0);
      selected = null;
    }
  });

  // Drop on doing board
  boardDoing.addEventListener("drop", function (ev) {
    ev.stopImmediatePropagation();
    // console.log(taskCount.doing);
    if (taskCount.doing == 0) {
      boardDoing.innerHTML = "";
      updateTaskStatus(selected.getAttribute("data-id"), 1);
      selected = null;
    }
  });
  // Drop on finished board
  boardFinished.addEventListener("drop", function (ev) {
    ev.stopImmediatePropagation();
    if (taskCount.finished == 0) {
      boardFinished.innerHTML = "";
      updateTaskStatus(selected.getAttribute("data-id"), 2);
      selected = null;
    }
  });

  task.addEventListener("dragend", function () {
    try {
      selected.style.opacity = 1;
    } catch {
      // nothing
    }
    if (taskCount.doing == 0) {
      document.getElementById("doing-drop").style.display = "none";
    }
    if (taskCount.finished == 0) {
      document.getElementById("finished-drop").style.display = "none";
    }
    // remove any open slot
    task_slots.forEach((task) => {
      task.classList.remove("dragged_slot");
    });
  });

  // Dragover on task board
  boardTask.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    if (taskCount.pending == 0) {
      boardTask.children[0].style.color = "#000";
      boardTask.children[0].style.borderColor = "#000";
    }
  });

  // Dragover on doing board
  boardDoing.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    if (taskCount.doing == 0) {
      boardDoing.children[0].style.color = "#000";
      boardDoing.children[0].style.borderColor = "#808080";
    }
  });
  // Dragover on finished board
  boardFinished.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    if (taskCount.finished == 0) {
      boardFinished.children[0].style.color = "#000";
      boardFinished.children[0].style.borderColor = "#808080";
    }
  });
  // Dragleave on finished board
  boardTask.addEventListener("dragleave", function (ev) {
    ev.preventDefault();
    if (taskCount.pending == 0) {
      boardTask.children[0].style.color = "#686868";
      boardTask.children[0].style.borderColor = "#ddd";
    }
  });
  // Dragleave on finished board
  boardDoing.addEventListener("dragleave", function (ev) {
    ev.preventDefault();
    if (taskCount.doing == 0) {
      boardDoing.children[0].style.color = "#686868";
      boardDoing.children[0].style.borderColor = "#ddd";
    }
  });
  // Dragleave on finished board
  boardFinished.addEventListener("dragleave", function (ev) {
    ev.preventDefault();
    if (taskCount.finished == 0) {
      boardFinished.children[0].style.color = "#686868";
      boardFinished.children[0].style.borderColor = "#ddd";
    }
  });

  // Dragover on slots
  for (var i = 0; i < task_slots.length; i++) {
    task_slots[i].addEventListener("dragover", function (ev) {
      ev.preventDefault();
      ev.target.classList.add("dragged_slot");
    });
    task_slots[i].addEventListener("dragleave", function (ev) {
      ev.preventDefault();
      ev.target.classList.remove("dragged_slot");
    });

    // On drop
    task_slots[i].addEventListener("drop", function (ev) {
      ev.stopImmediatePropagation();
      var selectedNodeId = selected.getAttribute("data-id");
      var droppedNodeId = parseInt(ev.target.getAttribute("data-child"));
      const tasks = getTasks();
      tasks.splice(getTaskIndex(selectedNodeId), 1);
      const dropIndex = tasks.findIndex(
        (task) => task.task_id == droppedNodeId
      );
      // Check if they belong to different board
      let replacedTask = getTask(selectedNodeId);
      let parentNode = ev.target.parentNode;
      console.log(parentNode);
      if (parentNode == boardTask) {
        replacedTask.status = 0;
      } else if (parentNode == boardDoing) {
        replacedTask.status = 1;
      } else {
        replacedTask.status = 2;
      }
      tasks.splice(dropIndex + 1, 0, replacedTask);

      console.log(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      list_taskUI();

      // ev.target.classList.add("dragged_slot");
    });
  }
}
