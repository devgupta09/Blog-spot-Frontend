import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import MainPage from "./MainPage";
import "../styles/style.scss";

const DefaultPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <div className="default-container">
        <div className="form-container">
          <Suspense>
            <Routes>
              <Route exact path="/signIn" element={<SignIn />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Loader>
  );
};

export default DefaultPage;
