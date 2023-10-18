import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { Modal } from "antd";
import Page404 from "./Page404";
import AllBlogs from "./AllBlogs";
import NewBlog from "./AddBlog";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import "../styles/style.scss";

const MainPage = () => {
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
              <AiFillExclamationCircle size={25} style={{color:"#faad14"}} />
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
              navigate("/login");
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
          <Suspense>
            <Routes>
              <Route exact path="/addBlog" element={<NewBlog />} />
              <Route exact path="/allBlogs" element={<AllBlogs />} />
              <Route exact path="/errorPage" element={<Page404 />} />
              <Route path="/*" element={<Navigate to="/errorPage" />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Loader>
  );
};

export default MainPage;
