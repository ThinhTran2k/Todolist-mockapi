import React from "react";
import "./App.scss";
import InputField from "./components/inputField/inputField";
import ListField from "./components/listField/listField";
import ControlField from "./components/controlField/controlField";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container">
      <h1>My Todo</h1>
      <InputField />
      <ControlField />
      <ListField />

      <ToastContainer />
    </div>
  );
}

export default App;
