import { IAddTodo, IUpdateTodo } from "./../../types/index";
import axiosClient from "../axiosClient";

const todoApi = {
  getListTask() {
    const url = "/tasks";
    return axiosClient.get(url);
  },

  getTaskByID(id: number) {
    const url = `/tasks/${id}`;
    return axiosClient.get(url);
  },

  deleteTask(id: number) {
    const url = `/tasks/${id}`;
    return axiosClient.delete(url);
  },

  addTask(data: IAddTodo) {
    const url = "/tasks";
    return axiosClient.post(url, data);
  },

  updateTask(id: number, data: IUpdateTodo) {
    const url = `/tasks/${id}`;
    return axiosClient.put(url, data);
  },
};
export default todoApi;
