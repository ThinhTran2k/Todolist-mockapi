import { Itasks, Itask } from "../../types/index";
import { actionTypes, EFilterTypes } from "../actions/actionTypes";
import { TaskAction } from "../../types/index";

const initialState: Itasks = {
  tasks: [],
  fitlerType: EFilterTypes.All,
  formToggle: false,
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
      const { id, value, isCompleteTodo, deadlinetime } = action.payload as {
        id: number;
        value: string;
        isCompleteTodo: boolean;
        deadlinetime: string;
      };
      const newTaskEdit = {
        id: id,
        value: value,
        isCompleteTodo: isCompleteTodo,
        deadlinetime: deadlinetime,
      };
      const findTask = state.tasks.findIndex((item) => item.id === id);
      state.tasks[findTask] = newTaskEdit;
      return { ...state };

    case actionTypes.UPDATE_STATUS:
      const payload = action.payload as {
        id: number;
        value: string;
        isCompleteTodo: boolean;
      };
      const findStatus = state.tasks.findIndex(
        (item) => item.id === payload.id
      );
      state.tasks[findStatus] = {
        ...state.tasks[findStatus],
        isCompleteTodo: payload.isCompleteTodo,
      };
      return { ...state };

    case actionTypes.POST_TODO:
      state.tasks.push(
        action.payload as {
          id: number;
          value: string;
          isCompleteTodo: boolean;
          deadlinetime: string;
        }
      );
      return { ...state };

    case actionTypes.TOGGLE_FORM:
      return {
        ...state,
        formToggle: !state.formToggle,
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
