import { notification } from "antd";

const Notification = {
  success: (message) => {
    notification.open({
      type: "success",
      duration: 10,
      message: "Success",
      description: message,
    });
  },
  error: (message) => {
    notification.open({
      type: "error",
      duration: 10,
      message: "Error",
      description: message,
    });
  },
  warning: (message) => {
    notification.open({
      type: "warning",
      duration: 10,
      message: "Warning",
      description: message,
    });
  },
};
export default Notification;
