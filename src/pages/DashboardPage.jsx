import React, { useState } from "react";
import RouterFlow from "../routes/RouterFlow";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Loader from "../components/common/Loader";
import LogoutModal from "./LogoutModal";
import "./style.scss";

const DashboardPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const showLogoutPopup = () => {
    setModalOpen(true);
  };

  return (
    <Loader isLoading={false}>
      <div className="main-container">
        <Header showLogoutPopup={showLogoutPopup} />
        <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <RouterFlow />
        <Footer />
      </div>
    </Loader>
  );
};

export default React.memo(DashboardPage);
