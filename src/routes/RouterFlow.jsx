import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainPage from "../pages/MainPage";
import routes from "./routes";

const RouterFlow = () => {
  return (
    <Suspense>
      <ProtectedRoute>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </ProtectedRoute>
    </Suspense>
  );
};

export default RouterFlow;
