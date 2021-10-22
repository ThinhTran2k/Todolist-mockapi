import * as actionTypes from "../actions/actionTypes";
import { Itasks, Itask } from "../../types/index";
import { filterTypes } from "../actions/actionTypes";
import { TaskAction } from "../../types/index";

const initialState: Itasks = {
  tasks: [],
  fitlerType: filterTypes.All,
  toggle: false,
};

const Tasks = (state: Itasks = initialState, action: TaskAction): Itasks => {
  switch (action.type) {
    case actionTypes.GET_TODOS:
      return {
        ...state,
        tasks: action.payload as Itask[],
      };

    case actionTypes.DELETE_TODO:
      const idDelete = action.payload;
      const newTask = state.tasks.filter((todo) => todo.id !== idDelete);
      return {
        ...state,
        tasks: newTask,
      };

    case actionTypes.UPDATE_TODO:
      const { id, value, status, deadlinetime } = action.payload as {
        id: number;
        value: string;
        status: boolean;
        deadlinetime: string;
      };
      const newTaskEdit = {
        id: id,
        value: value,
        status: status,
        deadlinetime: deadlinetime,
      };
      const findTask = state.tasks.findIndex((item) => item.id === id);
      state.tasks[findTask] = newTaskEdit;
      return { ...state };

    case actionTypes.UPDATE_STATUS:
      const payload = action.payload as {
        id: number;
        value: string;
        status: boolean;
      };
      const findStatus = state.tasks.findIndex(
        (item) => item.id === payload.id
      );
      state.tasks[findStatus] = {
        ...state.tasks[findStatus],
        status: payload.status,
      };
      return { ...state };

    case actionTypes.POST_TODO:
      state.tasks.push(
        action.payload as {
          id: number;
          value: string;
          status: boolean;
          deadlinetime: string;
        }
      );
      return { ...state };

    case actionTypes.TOGGLE_FORM:
      return {
        ...state,
        toggle: !state.toggle,
      };

    case actionTypes.CHANGE_FILTER:
      return {
        ...state,
        fitlerType: action.payload as string,
      };

    default:
      return state;
  }
};
export default Tasks;
