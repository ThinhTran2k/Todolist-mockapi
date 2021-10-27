import React from "react";
import "./todoItem.scss";
import todoApi from "../../services/api/todoAPI";
import moment from "moment";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Itask } from "../../types";
import { useDispatch } from "react-redux";
import { deleteTask, setToggle, updateStatus } from "../../redux/actions";
import { onDeadline, onExprise } from "../../helper/timeHelper";
import { toast } from "react-toastify";

type Props = {
  task: Itask;
  getTodo: Function;
};

function ItemField(props: Props) {
  const dispatch = useDispatch();
  const [checkBoxValue, setCheckBoxValue] = React.useState<boolean>(false);
  React.useEffect(() => {
    setCheckBoxValue(props.task.isCompleteTodo);
  }, [props.task]);

  const onDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (answer) {
        await todoApi.deleteTask(props.task.id);
        dispatch(deleteTask(props.task.id));
        toast.success("Delete successfully !!!", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    } catch (error) {
      toast.error("Delete failed !!!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onOpenFormEdit = () => {
    dispatch(setToggle());
    props.getTodo(props.task);
  };

  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await editStatus();
    setCheckBoxValue(e.target.checked);
    dispatch(
      updateStatus({
        id: props.task.id,
        value: props.task.value,
        isCompleteTodo: !checkBoxValue,
        deadlinetime: props.task.deadlinetime,
      })
    );
  };

  const editStatus = async () => {
    try {
      await todoApi.updateTask(props.task.id, {
        value: props.task.value,
        isCompleteTodo: !checkBoxValue,
        deadlinetime: props.task.deadlinetime,
      });
    } catch (error) {
      toast.error("Update todo status failed !!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
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
          checked={checkBoxValue}
        />

        <div className="wrapper_text">
          <p>{props.task.value}</p>
        </div>
        <div className="wrapper_deadline">
          <p>{moment(props.task.deadlinetime).format("LLLL")}</p>
          {onDeadline(props.task.deadlinetime, props.task.isCompleteTodo) ? (
            <span className="warning_deadline">
              Warning time is running out{" "}
            </span>
          ) : null}
          {onExprise(props.task.deadlinetime, props.task.isCompleteTodo) ? (
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
