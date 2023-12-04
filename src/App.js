import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <Suspense>
          <Routes>
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/signIn" />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
        </Suspense>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
