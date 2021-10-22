import "./inputField.scss";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/actions/index";

export default function InputField() {
  const dispatch = useDispatch();

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
        <input type="button" value="ADD" className="input-btn" />
      </form>
    </div>
  );
}
