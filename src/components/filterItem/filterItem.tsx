import React from "react";
import "./filterItem.scss";
import { useDispatch } from "react-redux";
import { filterTasks } from "../../redux/actions";
import { typeFilter } from "../../constants";

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
        {typeFilter.map((item: string) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}
export default React.memo(ControlField);
