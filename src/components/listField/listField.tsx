import React from "react";
import { useSelector } from "react-redux";
import { Itask, Itasks } from "../../types";
import ItemField from "../itemField/itemField";
import ModalEdit from "../Modal/ModalEdit";
import "./listField.scss";

function ListField() {
  const { tasks, toggle, fitlerType } = useSelector((state: Itasks) => state);
  const [idEdit, setIdEdit] = React.useState<number>(0);
  const getID = (id: number) => {
    setIdEdit(id);
  };
  const clearIDEdit = () => {
    setIdEdit(0);
  };
  const taskFilter = (tasks: Itask[], typeFilter: string) => {
    switch (typeFilter) {
      case "All":
        return [...tasks];
      case "Completed":
        return [...tasks].filter((item) => item.status === true);
      case "Active":
        return [...tasks].filter((item) => item.status === false);
      default:
        return [...tasks];
    }
  };

  return (
    <div className="container_item">
      <ul>
        {taskFilter(tasks, fitlerType)
          .reverse()
          .map((task: Itask) => {
            return <ItemField key={task.id} task={task} getID={getID} />;
          })}
      </ul>
      {toggle ? <ModalEdit idEdit={idEdit} clearIDEdit={clearIDEdit} /> : null}
    </div>
  );
}
export default React.memo(ListField);
