import React from "react";
import "./todoItem.scss";
import todoApi from "../../services/api/todoAPI";
import moment from "moment";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Itask } from "../../types";
import { useDispatch } from "react-redux";
import { deleteTask, setToggle, updateStatus } from "../../redux/actions";
import { toastError, toastSuccess } from "../../helper/toastHelper";
import { onDeadline, onExprise } from "../../helper/timeHelper";

type Props = {
  task: Itask;
  getID: Function;
};

function ItemField(props: Props) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<boolean>(false);
  React.useEffect(() => {
    setValue(props.task.status);
  }, [props.task]);

  const onDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (answer) {
        await todoApi.deleteTask(props.task.id);
        dispatch(deleteTask(props.task.id));
        toastSuccess("Delete successfully !!!");
        return;
      }
    } catch (error) {
      toastError("Delete failed !!!");
    }
  };

  const onOpenFormEdit = () => {
    dispatch(setToggle());
    props.getID(props.task.id);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editStatus();
    setValue(e.target.checked);
    dispatch(
      updateStatus({
        id: props.task.id,
        value: props.task.value,
        status: !value,
        deadlinetime: props.task.deadlinetime,
      })
    );
  };

  const editStatus = async () => {
    try {
      await todoApi.updateTask(props.task.id, {
        value: props.task.value,
        status: !value,
        deadlinetime: props.task.deadlinetime,
      });
    } catch (error) {
      toastError("Update todo status failed !!!");
    }
  };

  return (
    <li>
      <div className="wrapper_item">
        <input
          type="checkbox"
          className="item_checkbox"
          onChange={(event) => {
            handleOnchange(event);
          }}
          checked={value}
        />

        <div className="wrapper_text">
          <p>{props.task.value}</p>
        </div>
        <div className="wrapper_deadline">
          <p>{moment(props.task.deadlinetime).format("LLLL")}</p>
          {onDeadline(props.task.deadlinetime, props.task.status) ? (
            <span className="warning_deadline">
              Warning time is running out{" "}
            </span>
          ) : null}
          {onExprise(props.task.deadlinetime, props.task.status) ? (
            <span className="error_deadline">The Task has expired</span>
          ) : null}
        </div>
        <div className="wrapper_icons">
          <FaPen className="icon_edit" onClick={onOpenFormEdit} />
          <FaTrashAlt className="icon_delete" onClick={onDelete} />
        </div>
      </div>
    </li>
  );
}
export default React.memo(ItemField);
