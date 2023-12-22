import { useState } from "react";
import RouterFlow from "../routes/RouterFlow";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import LogoutModal from "./LogoutModal";
import "./style.scss";

const DashboardPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const showLogoutPopup = () => {
    setModalOpen(true);
  };

  return (
    <div className="main-container">
      <Header showLogoutPopup={showLogoutPopup} />
      <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <RouterFlow />
      <Footer />
    </div>
  );
};

export default DashboardPage;
