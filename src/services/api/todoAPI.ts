import axiosClient from "../axiosClient";

const todoApi = {
  getListTask() {
    const url = "/tasks";
    return axiosClient.get(url);
  },

  deleteTask(id: number) {
    const url = `/tasks/${id}`;
    return axiosClient.delete(url);
  },

  addTask(data: any) {
    const url = "/tasks";
    return axiosClient.post(url, data);
  },

  updateTask(id: number, data: any) {
    const url = `/tasks/${id}`;
    return axiosClient.put(url, data);
  },
};
