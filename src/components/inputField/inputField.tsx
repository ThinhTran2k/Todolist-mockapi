import React from "react";
import "./inputField.scss";
import { toastSuccess, toastError } from "../../helper/toastHelper";

export default function InputField() {
  const [value, setValue] = React.useState<string>("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-text"
        />
        <input type="submit" value="ADD" className="input-btn" />
      </form>
    </div>
  );
}
