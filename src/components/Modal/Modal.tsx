import React from "react";
import "./Modal.scss";
import todoApi from "../../services/api/todoAPI";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask, setToggle, updateTasks } from "../../redux/actions";
import { toastError, toastSuccess } from "../../helper/toastHelper";

type Props = {
  id: number;
  clearIDEdit: () => void;
};

function ModalEdit(props: Props) {
  const { id, clearIDEdit } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    valueTodo: "",
    statusTodo: false,
    deadlinetime: "",
  });

  React.useEffect(() => {
    if (id !== 0 && id) {
      getTaskByID();
    }
  }, [id]);

  const getTaskByID = async () => {
    try {
      const res: any = await todoApi.getTaskByID(id);
      setValue({
        ...value,
        valueTodo: res.data.value,
        statusTodo: res.data.status,
        deadlinetime: res.data.deadlinetime,
      });
    } catch (error) {}
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      statusTodo: e.target.checked,
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.valueTodo.length === 0 || !value) {
      toastError("Enter your todo !!!");
    } else {
      if (id) {
        try {
          const res: any = await todoApi.updateTask(id, {
            value: value.valueTodo,
            status: value.statusTodo,
            deadlinetime: value.deadlinetime,
          });
          dispatch(
            updateTasks({
              id: res.data.id,
              value: value.valueTodo,
              status: value.statusTodo,
              deadlinetime: value.deadlinetime,
            })
          );
          clearIDEdit();
          toastSuccess("Update success !!!");
        } catch (error) {
          clearIDEdit();
          toastError("Update failed !!!");
          dispatch(setToggle());
        }
      } else {
        try {
          const res: any = await todoApi.addTask({
            value: value.valueTodo.trim(),
            deadlinetime: value.deadlinetime,
          });
          dispatch(
            addTask({
              id: res.data.id,
              value: value.valueTodo,
              status: value.statusTodo,
              deadlinetime: value.deadlinetime,
            })
          );
          setValue({
            valueTodo: "",
            statusTodo: false,
            deadlinetime: "",
          });
          clearIDEdit();
          toastSuccess("Add success !!!");
        } catch (error) {
          clearIDEdit();
          toastError("Update failed !!!");
          dispatch(setToggle());
        }
      }
    }
    dispatch(setToggle());
  };

  return (
    <div className="container_modal">
      <div className="background" onClick={() => dispatch(setToggle())}></div>
      <div className="wrapper_modal">
        <h1>{id ? "Edit Todo" : "Add Todo"}</h1>
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
              onChange={(e) => handleOnChange(e)}
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
export default React.memo(ModalEdit);
