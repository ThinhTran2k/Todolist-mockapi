import React from "react";
import { useSelector } from "react-redux";
import { Itask, Itasks } from "../../types";
import TodoItem from "../TodoItem/todoItem";
import TodoForm from "../TodoForm/TodoForm";
import "./todoList.scss";
import { EFilterTypes } from "../../redux/actions/actionTypes";

function ListField() {
  const { tasks, formToggle, fitlerType } = useSelector(
    (state: Itasks) => state
  );
  const [todoEdit, setTodoEdit] = React.useState<Itask>({
    id: 0,
    value: "",
    isCompleteTodo: false,
    deadlinetime: "",
  });
  const getTodo = (id: Itask) => {
    setTodoEdit(id);
  };
  const clearIDEdit = () => {
    setTodoEdit({
      id: 0,
      value: "",
      isCompleteTodo: false,
      deadlinetime: "",
    });
  };
  const taskFilter = (tasks: Itask[], typeFilter: string) => {
    switch (typeFilter) {
      case EFilterTypes.All:
        return [...tasks];
      case EFilterTypes.Completed:
        return [...tasks].filter((item) => item.isCompleteTodo);
      case EFilterTypes.Active:
        return [...tasks].filter((item) => !item.isCompleteTodo);
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
              return <TodoItem key={task.id} task={task} getTodo={getTodo} />;
            })}
        </ul>

        {formToggle ? (
          <TodoForm todoEdit={todoEdit} clearIDEdit={clearIDEdit} />
        ) : null}
      </div>
      <div className="count_item">
        Count: {taskFilter(tasks, fitlerType).length}
      </div>
    </>
  );
}
export default React.memo(ListField);
