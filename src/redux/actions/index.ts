import { Itask } from "../../types/index";
import { actionTypes } from "./actionTypes";

export const getTasks = (tasks: Itask[]) => {
  return {
    type: actionTypes.GET_TODOS,
    payload: tasks,
  };
};
export const addTask = (task: Itask) => {
  return {
    type: actionTypes.POST_TODO,
    payload: task,
  };
};
export const updateTasks = (task: Itask) => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload: task,
  };
};
export const updateStatus = (task: Itask) => {
  return {
    type: actionTypes.UPDATE_STATUS,
    payload: task,
  };
};
export const deleteTask = (id: number) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload: id,
  };
};
export const setToggle = () => {
  return {
    type: actionTypes.TOGGLE_FORM,
  };
};
export const filterTasks = (action: string) => {
  return {
    type: actionTypes.CHANGE_FILTER,
    payload: action,
  };
};
