import { message } from "antd";

const Notification = {
  success: (content) => {
    message.open({
      type: "success",
      duration: 10,
      message: "Success",
      content: content,
    });
  },
  error: (content) => {
    message.open({
      type: "error",
      duration: 10,
      message: "Error",
      content: content,
    });
  },
  warning: (content) => {
    message.open({
      type: "warning",
      duration: 10,
      message: "Warning",
      content: content,
    });
  },
};
export default Notification;
