export type Task = {
  task_id: number;
  task: string;
  status: number;
  created_at: number;
};

export type Board = {
  bid: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  tasks: Task[];
};
