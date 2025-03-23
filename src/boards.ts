import { v4 as uuidv4 } from "uuid";
import { listTaskUI } from "./board";
import { boardTitleField, initialScreen } from "./elements";
import { setBoards, setCurrentBoard } from "./states";
import { Board } from "./type";

// handle adding board
function addBoard(board: Board) {
  // first check whether there's existing board in ls
  const localBoards = localStorage.getItem("boards");
  if (localBoards == null) {
    setBoards([board]);
    localStorage.setItem("boards", JSON.stringify([board]));
    pushCurrentBoard(board, listTaskUI);
    return;
  }

  // board exists
  const existingBoards = JSON.parse(localBoards) as Board[];
  // set boards in the localStorage
  localStorage.setItem("boards", JSON.stringify([...existingBoards, board]));
  // set boards in state
  setBoards((prev) => [...prev, board]);
  pushCurrentBoard(board, listTaskUI);
}

function pushCurrentBoard(board: Board, onDone: () => void) {
  // set the current board
  setCurrentBoard(board);
  // now update the UI
  // hide the board section

  initialScreen.style.display = "none";
  console.log("I am here");
  onDone();
}

export const handleCreateBoard = () => {
  const title = boardTitleField.value;
  if (!title || title.trim().length < 1) {
    alert("Invalid task title");
    return;
  }
  const newBoard: Board = {
    title: title,
    tasks: [],
    bid: uuidv4().toString(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  addBoard(newBoard);
};
