import { contextMenu } from "./elements";
export var isContextMenuOpen = false;
export function handleContextMenu(e) {
  e.preventDefault();
  const clientOffset = {
    x: e.clientX,
    y: e.clientY,
  };
  contextMenu.style.left = clientOffset.x.toString() + "px";
  contextMenu.style.top = clientOffset.y.toString() + "px";
  contextMenu.style.display = "block";
  isContextMenuOpen = true;
  if (isContextMenuOpen) {
    window.addEventListener("click", function (e) {
      if (e.target != contextMenu && e.target != contextMenu.children[0]) {
        contextMenu.style.display = "none";
      }
    });
  }
}
