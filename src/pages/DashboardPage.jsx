import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { Modal } from "antd";
import RouterFlow from "../routes/RouterFlow";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Notification from "../components/common/Notification";

const DashboardPage = () => {
  const setToken = useStoreActions((action) => action.user.setToken);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const showLogoutPopup = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setToken(null);
    setModalOpen(false);
    Notification.success("Log out Successfully!");
    navigate("/signIn");
  };

  return (
    <div className="main-container">
      <Header showLogoutPopup={showLogoutPopup} />
      <Modal
        title={
          <span>
            <AiFillExclamationCircle size={25} style={{ color: "#faad14" }} />
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
      <RouterFlow />
      <Footer/>
    </div>
  );
};

export default DashboardPage;
