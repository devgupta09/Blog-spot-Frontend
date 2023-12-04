import { Navigate } from "react-router-dom";
import Page404 from "../components/common/Page404";
import routes from "./routes";

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
