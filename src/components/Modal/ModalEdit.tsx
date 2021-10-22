import React from "react";
import "./ModalEdit.scss";
import todoApi from "../../services/api/todoAPI";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask, setToggle, updateTasks } from "../../redux/actions";
import { toastError, toastSuccess } from "../../helper/toastHelper";

type Props = {
  idEdit: number;
  clearIDEdit: any;
};

function ModalEdit(props: Props) {
  const { idEdit, clearIDEdit } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    valueTodo: "",
    statusTodo: false,
    deadlinetime: "",
  });

  React.useEffect(() => {
    if (idEdit !== 0 && idEdit !== undefined) {
      getTaskByID();
    }
  }, [idEdit]);

  const getTaskByID = async () => {
    try {
      const res: any = await todoApi.getTaskByID(idEdit);
      setValue({
        ...value,
        valueTodo: res.data.value,
        statusTodo: res.data.status,
        deadlinetime: res.data.deadlinetime,
      });
    } catch (error) {}
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setValue({
      ...value,
      statusTodo: e.target.checked,
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (value.valueTodo.length === 0 || !value) {
        toastError("Enter your task !!!");
      } else {
        if (idEdit) {
          const res: any = await todoApi.updateTask(idEdit, {
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
        } else {
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
        }
      }
      dispatch(setToggle());
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="container">
      <div className="background" onClick={() => dispatch(setToggle())}></div>
      <div className="container_modal">
        <h1>{idEdit ? "Edit Todo" : "Add Todo"}</h1>
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
            <span>Status</span>
            <input
              type="checkbox"
              className="checkbox_edit"
              onChange={(e: any) => handleOnChange(e)}
              checked={value.statusTodo}
            />
          </div>
          <div className="wrapper_deadline">
            <span>Deadline</span>
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
