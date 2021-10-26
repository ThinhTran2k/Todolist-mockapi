import React from "react";
import { useSelector } from "react-redux";
import { Itask, Itasks } from "../../types";
import TodoItem from "../todoItem/todoItem";
import Modal from "../Modal/Modal";
import "./todoList.scss";
import { filterTypes } from "../../redux/actions/actionTypes";

function ListField() {
  const { tasks, formToggle, fitlerType } = useSelector(
    (state: Itasks) => state
  );
  const [todoID, setTodoID] = React.useState<number>(0);
  const getID = (id: number) => {
    setTodoID(id);
  };
  const clearIDEdit = () => {
    setTodoID(0);
  };
  const taskFilter = (tasks: Itask[], typeFilter: string) => {
    switch (typeFilter) {
      case filterTypes.All:
        return [...tasks];
      case filterTypes.Completed:
        return [...tasks].filter((item) => item.status);
      case filterTypes.Active:
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

        {formToggle ? <Modal id={todoID} clearIDEdit={clearIDEdit} /> : null}
      </div>
      <div className="count_item">
        Count: {taskFilter(tasks, fitlerType).length}
      </div>
    </>
  );
}
export default React.memo(ListField);
