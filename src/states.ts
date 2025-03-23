import { Board } from "./type";

export let boards: Board[] | null = null;
export const setBoards = (boards_: Board[] | ((prev: Board[]) => Board[])) =>
  typeof boards_ == "function"
    ? (boards = boards_(boards ? boards : []))
    : (boards = boards_);
export let currentBoard: Board | null = null;
export const setCurrentBoard = (board: Board) => (currentBoard = board);
