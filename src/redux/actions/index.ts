import { Itask, Itasks } from "./../../interface/index";
import * as actionTypes from "./actionTypes";

export const getTasks = (tasks: Itasks) => {
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
export const deleteTask = (id: number) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload: id,
  };
};
