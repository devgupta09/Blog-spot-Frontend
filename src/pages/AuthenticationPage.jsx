import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "../components/auth/ForgetPassword";
import DashboardPage from "./DashboardPage";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import "./style.scss";

const AuthenticationPage = () => {
  return (
    <div className="default-container">
      <Suspense>
        <Routes>
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="signIn" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default React.memo(AuthenticationPage);
