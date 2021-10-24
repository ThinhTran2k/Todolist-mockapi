import React from "react";
import { useSelector } from "react-redux";
import { Itask, Itasks } from "../../types";
import TodoItem from "../todoItem/todoItem";
import Modal from "../Modal/Modal";
import "./todoList.scss";

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
        return [...tasks].filter((item) => item.status);
      case "Active":
        return [...tasks].filter((item) => !item.status);
      default:
        return [...tasks];
    }
  };

  return (
    <>
      <div className="container_item">
        <ul>
          {taskFilter(tasks, fitlerType)
            .reverse()
            .map((task: Itask) => {
              return <TodoItem key={task.id} task={task} getID={getID} />;
            })}
        </ul>

        {toggle ? <Modal id={idEdit} clearIDEdit={clearIDEdit} /> : null}
      </div>
      <div className="count_item">
        Count: {taskFilter(tasks, fitlerType).length}
      </div>
    </>
  );
}
export default React.memo(ListField);
