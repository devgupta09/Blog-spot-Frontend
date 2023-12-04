import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
          <Route path="/*" element={<Navigate to="/errorPage" />} />
        </Routes>
      </ProtectedRoute>
    </Suspense>
  );
};

export default RouterFlow;
