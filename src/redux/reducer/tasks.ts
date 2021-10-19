import * as actionTypes from "../actions/actionTypes";
import { Itasks, Itask } from "./../../interface/index";
import { filterTypes } from "../actions/actionTypes";
import { TaskAction } from "../../interface/index";

const initialState: Itasks = {
  tasks: [],
  fitlerType: filterTypes.All,
};

const Tasks = (state: Itasks = initialState, action: TaskAction): Itasks => {
  switch (action.type) {
    case actionTypes.GET_TODOS:
      return {
        ...state,
        tasks: action.payload as Itask[],
      };
    default:
      return state;
  }
};
export default Tasks;
