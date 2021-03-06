export type Itask = {
  id: number;
  value: string;
  isCompleteTodo: boolean;
  deadlinetime: string;
};
export type Itasks = {
  tasks: Itask[];
  fitlerType: string;
  formToggle: boolean;
};
export type Itoggle = {
  toggle: boolean;
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
export type IToggleForm = {
  type: string;
  payload: boolean;
};
export type IAddTodo = {
  value: string;
  deadlinetime: string;
};
export type IUpdateTodo = {
  value: string;
  isCompleteTodo: boolean;
  deadlinetime: string;
};
export type TaskAction =
  | IGetTaskAction
  | IAddTaskAction
  | IUpdateAction
  | IDeleteAction
  | IToggleForm;
