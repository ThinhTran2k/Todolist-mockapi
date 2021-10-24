import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import todoAPI from "./services/api/todoAPI";
import AddInput from "./components/addInput/addInput";
import FilterItem from "./components/filterItem/filterItem";
import TodoList from "./components/todoList/todoList";
import { toastError } from "./helper/toastHelper";
import { getTasks } from "./redux/actions/index";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getListTask();
  }, []);
  const getListTask = async () => {
    try {
      const res: any = await todoAPI.getListTask();
      dispatch(getTasks(res.data));
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="container">
      <h1>My Todo</h1>
      <AddInput />
      <FilterItem />
      <TodoList />

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
