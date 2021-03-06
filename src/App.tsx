import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import todoAPI from "./services/api/todoAPI";
import AddInput from "./components/AddInput/addInput";
import FilterItem from "./components/FilterItem/filterItem";
import TodoList from "./components/TodoList/todoList";
import { getTasks } from "./redux/actions/index";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { Itask } from "./types";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getListTodo = async () => {
      try {
        const res = await todoAPI.getListTask();
        dispatch(getTasks(res.data as Itask[]));
      } catch (error) {
        toast.error("Get list failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    getListTodo();
  }, []);

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
