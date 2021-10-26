import moment from "moment";

export const onDeadline = (taskTime: string, taskStatus: boolean) => {
  if (!taskStatus && moment(taskTime).isAfter(moment())) {
    const a = moment(taskTime);
    const b = moment();
    return a.diff(b, "minutes") <= 60;
  }
};
export const onExprise = (taskTime: string, taskStatus: boolean) => {
  if (!taskStatus) {
    return moment(taskTime).isBefore(moment());
  }
};
