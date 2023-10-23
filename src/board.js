import { handleContextMenu } from "./contextmenu";
import {
  add_task_btn,
  boardTask,
  task_entry,
  task_entry_form,
} from "./elements";
import { addTask, getTasks } from "./localstorage";

export function list_taskUI() {
  if (!boardTask.hasChildNodes()) {
    if (getTasks()) {
      // Fetch those tasks from localstorage
      const localTasks = getTasks();

      localTasks.forEach((task_, i) => {
        const task = document.createElement("div");
        task.classList.add("board-item");
        task.setAttribute("data-id", task_.task_id);
        task.innerHTML = task_.task;
        // append that child
        boardTask.prepend(task);
        // add context menu
        task.addEventListener("contextmenu", function (e) {
          handleContextMenu(e);
        });
      });
    }
  } else {
    boardTask.innerHTML = "";
    list_taskUI();
  }
}

export function handleAddTask() {
  add_task_btn.addEventListener("click", function (e) {
    task_entry_form.style.display = "block";
    // set focus
    document.getElementById("task_entry").focus();

    document.querySelector(".add_task_display").style.display = "none";
    // add border
    add_task_btn.style.border = "2px solid #9C27B0";
    // add_task_btn.style.boxShadow = "inset 0px 0px 7px 0px #9C27B0";
    // bind submit event on that input
    function hideEntrybox() {
      task_entry_form.style.display = "none";
      // show task label
      document.querySelector(".add_task_display").style.display = "flex";
      // remove border
      add_task_btn.style.border = "2px solid transparent";
    }
    window.addEventListener("keyup", function (e) {
      if (e.key == "Escape") {
        // TODO: Add a condition to call the function only when input is open
        hideEntrybox();
      }
      task_entry.addEventListener("focusout", function (e) {
        hideEntrybox();
      });
    });
    task_entry_form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (task_entry.value.trim().length > 0) {
        const taskName = task_entry.value.trim();
        task_entry.value = "";
        addTask(taskName);
        list_taskUI();

        // reset task box
        // hide task entry box
        hideEntrybox();
      }
    });
  });
}
