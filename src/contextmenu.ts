import { contextMenu, context_del } from "./elements";
import { removeTask } from "./localstorage";
export var isContextMenuOpen = false;
export function handleContextMenu(e: any) {
  e.preventDefault();
  const clientOffset = {
    x: e.clientX,
    y: e.clientY,
  };
  let target = e.target.getAttribute("data-id");
  contextMenu.style.left = clientOffset.x.toString() + "px";
  contextMenu.style.top = clientOffset.y.toString() + "px";
  contextMenu.style.display = "block";
  isContextMenuOpen = true;
  context_del.addEventListener("click", function (e) {
    removeTask(target);
    contextMenu.style.display = "none";
  });
  if (isContextMenuOpen) {
    window.addEventListener("click", function (e) {
      if (e.target != contextMenu && e.target != contextMenu.children[0]) {
        contextMenu.style.display = "none";
      }
    });
  }
}
