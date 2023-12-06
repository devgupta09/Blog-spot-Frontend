import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "../components/auth/ForgetPassword";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import MainPage from "./MainPage";

const DefaultPage = () => {
  return (
    <div className="default-container">
      <Suspense>
        <Routes>
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default DefaultPage;
