import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { Modal } from "antd";
import RouterFlow from "../routes/RouterFlow";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Loader from "../components/common/Loader";
import "../styles/style.scss";

const MainPage = () => {
  const setToken = useStoreActions((action) => action.user.setToken);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const showLogoutPopup = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <div className="main-container">
        <Header setIsLoading={setIsLoading} showLogoutPopup={showLogoutPopup} />
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
          onOk={() => {
            setIsLoading(true);
            setTimeout(() => {
              setToken(null);
              navigate("/signIn");
              setIsLoading(false);
            }, 1000);
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
          maskClosable={false}
        >
          Do you really want to log out?
        </Modal>
        <div className="content-container">
          <RouterFlow />
        </div>
        <Footer />
      </div>
    </Loader>
  );
};

export default MainPage;
