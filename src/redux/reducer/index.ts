import { combineReducers } from "redux";
import tasks from "./tasks";

const rootReducer = combineReducers({ todo: tasks });
export default rootReducer;
