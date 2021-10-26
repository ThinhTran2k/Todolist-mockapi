import React from "react";
import "./filterItem.scss";
import { useDispatch } from "react-redux";
import { filterTasks } from "../../redux/actions";
import { typeFilter } from "../../constants";

function FilterItem() {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = React.useState<string>("");
  React.useEffect(() => {
    dispatch(filterTasks(filterValue));
  }, [filterValue, dispatch]);

  return (
    <div className="container_filter">
      <span className="filter_title">Filter</span>
      <select
        className="filter_option"
        value={filterValue}
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
      >
        {typeFilter.map((item: string) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}
export default React.memo(FilterItem);
