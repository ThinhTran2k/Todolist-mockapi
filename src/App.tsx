import React from "react";
import "./App.scss";
import InputField from "./components/inputField/inputField";
import ListField from "./components/listField/listField";
import ControlField from "./components/controlField/controlField";
import { ToastContainer } from "react-toastify";
import { getTasks } from "./redux/actions/index";
import todoAPI from "./services/api/todoAPI";
import { useDispatch } from "react-redux";
import { toastError } from "./helper/toastHelper";
import "react-toastify/dist/ReactToastify.css";

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
      <InputField />
      <ControlField />
      <ListField />

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
