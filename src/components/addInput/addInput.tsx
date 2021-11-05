import React from "react";
import "./addInput.scss";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/actions/index";

function InputField() {
  const dispatch = useDispatch();
  console.log("object");
  return (
    <div className="container-form">
      <form>
        <input
          readOnly
          type="text"
          placeholder="Add new..."
          onClick={() => {
            dispatch(setToggle());
          }}
          className="input-text"
        />
      </form>
    </div>
  );
}
export default React.memo(InputField);
