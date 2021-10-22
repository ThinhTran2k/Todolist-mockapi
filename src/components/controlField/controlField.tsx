import React from "react";
import { useDispatch } from "react-redux";
import { filterTasks } from "../../redux/actions";
import "./controlField.scss";

function ControlField() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => {
    dispatch(filterTasks(value));
  }, [value, dispatch]);

  return (
    <div className="container_filter">
      <span className="filter_title">Filter</span>
      <select
        className="filter_option"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
export default React.memo(ControlField);
