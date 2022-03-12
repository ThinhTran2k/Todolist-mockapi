import React from "react";
import "./TodoForm.scss";
import todoApi from "../../services/api/todoAPI";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask, setToggle, updateTasks } from "../../redux/actions";
import { toast } from "react-toastify";
import { Itask } from "../../types";

type TodoFormProps = {
  todoEdit: Itask;
  clearIDEdit: () => void;
};

function TodoForm({ todoEdit, clearIDEdit }: TodoFormProps) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    valueTodo: "",
    statusTodo: false,
    deadlinetime: "",
  });
  const { valueTodo, deadlinetime } = value;

  React.useEffect(() => {
    if (todoEdit) {
      setValue({
        ...value,
        valueTodo: todoEdit.value,
        statusTodo: todoEdit.isCompleteTodo,
        deadlinetime: todoEdit.deadlinetime,
      });
    }
  }, [todoEdit]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      statusTodo: e.target.checked,
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valueTodo) {
      toast.error("Enter your todo !!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!deadlinetime) {
      toast.error("Select deadlinetime, please!!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      if (todoEdit.id) {
        try {
          await todoApi.updateTask(todoEdit.id, {
            value: value.valueTodo,
            isCompleteTodo: value.statusTodo,
            deadlinetime: value.deadlinetime,
          });
          dispatch(
            updateTasks({
              id: todoEdit.id,
              value: value.valueTodo,
              isCompleteTodo: value.statusTodo,
              deadlinetime: value.deadlinetime,
            })
          );
          clearIDEdit();
          toast.success("Update success !!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          dispatch(setToggle());
        } catch (error) {
          clearIDEdit();
          toast.error("Update failed !!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          dispatch(setToggle());
        }
      } else {
        try {
          await todoApi.addTask({
            value: value.valueTodo.trim(),
            deadlinetime: value.deadlinetime,
          });
          dispatch(
            addTask({
              id: todoEdit.id,
              value: value.valueTodo,
              isCompleteTodo: value.statusTodo,
              deadlinetime: value.deadlinetime,
            })
          );
          setValue({
            valueTodo: "",
            statusTodo: false,
            deadlinetime: "",
          });
          clearIDEdit();
          toast.success("Add success !!!", {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(setToggle());
        } catch (error) {
          clearIDEdit();
          toast.error("Add failed !!!", {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(setToggle());
        }
      }
    }
  };

  return (
    <div className="container_modal">
      <div className="background" onClick={() => dispatch(setToggle())}></div>
      <div className="wrapper_modal">
        <h1>{todoEdit ? "Edit Todo" : "Add Todo"}</h1>
        <div className="modal_closeICon">
          <FaTimesCircle
            className="closeIcon"
            onClick={() => {
              dispatch(setToggle());
              clearIDEdit();
            }}
          />
        </div>
        <form className="wrapper_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write something ..."
            className="text_edit"
            value={value.valueTodo}
            onChange={(e) =>
              setValue({
                ...value,
                valueTodo: e.target.value,
              })
            }
          />
          <div className="wrapper_status">
            <span>Todo status</span>
            <input
              type="checkbox"
              className="checkbox_edit"
              onChange={handleOnChange}
              checked={value.statusTodo}
            />
          </div>
          <div className="wrapper_deadline">
            <span>Todo deadline</span>
            <input
              type="datetime-local"
              className="input-datetime"
              value={value.deadlinetime}
              onChange={(e) => {
                setValue({
                  ...value,
                  deadlinetime: e.target.value,
                });
              }}
            />
          </div>
          <input type="submit" value="Submit" className="input_submit" />
        </form>
      </div>
    </div>
  );
}
export default React.memo(TodoForm);
