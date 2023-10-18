import React, { Suspense } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route exact path="/login" element={<DefaultPage />} />
          <Route exact path="/signup" element={<DefaultPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<MainPage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
