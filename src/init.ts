import { setBoards } from "./states";

// Initializes the app when launched.
export const initializeBoards = () => {
  // check whether board history exists in local storage
  const localBoards = localStorage.getItem("boards");
  if (localBoards == null) {
    return;
  }
  // board exists
  const JSONParsedBoards = JSON.parse(localBoards);
  setBoards(JSONParsedBoards);
  setBoards(JSONParsedBoards);
};
