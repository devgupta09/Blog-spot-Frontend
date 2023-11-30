import { Navigate } from "react-router-dom";
import routes from "./routes";
import Page404 from "../pages/Page404";

const ProtectedRoute = (props) => {
  const authToken = localStorage.getItem("authToken");
  const { children } = props;

  const isValidRoute = routes.filter((route) => {
    return route.path == window.location.pathname;
  });

  if (!isValidRoute) {
    return <Page404 />;
  }

  if (authToken) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
