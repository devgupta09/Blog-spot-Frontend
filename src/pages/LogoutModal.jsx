import { Modal } from "antd";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import Notification from "../components/common/Notification";

const LogoutModal = (props) => {
  const setToken = useStoreActions((action) => action.user.setToken);
  const { modalOpen, setModalOpen } = props;
  const navigate = useNavigate();

  const handleOk = () => {
    setToken(null);
    setModalOpen(false);
    navigate("/signIn");
    Notification.success("Log out Successfully!");
  };

  return (
    <Modal
      title={
        <span>
          <span
            class="material-symbols-outlined"
            style={{ color: "#faad14", fontSize: "25px" }}
          >
            gpp_maybe
          </span>
          {` Log out!`}
        </span>
      }
      style={{
        top: "20vh",
        height: "400px",
      }}
      open={modalOpen}
      onOk={handleOk}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
    >
      Do you want to log out?
    </Modal>
  );
};

export default LogoutModal;
