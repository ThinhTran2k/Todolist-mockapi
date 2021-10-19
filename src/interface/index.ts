export type Itask = {
  id: number;
  value: string;
  status: boolean;
};
export type Itasks = {
  tasks: Itask[];
  fitlerType: string;
};
export type IGetTaskAction = {
  type: string;
  payload: Itask[];
};
export type IAddTaskAction = {
  type: string;
  payload: string;
};
export type IUpdateAction = {
  type: string;
  payload: Itask;
};
export type IDeleteAction = {
  type: string;
  payload: number;
};

export type TaskAction =
  | IGetTaskAction
  | IAddTaskAction
  | IUpdateAction
  | IDeleteAction;
