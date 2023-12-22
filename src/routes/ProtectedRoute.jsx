import { Navigate } from "react-router-dom";
import ErrorPage from "../components/common/ErrorPage";
import Notification from "../components/common/Notification";
import routes from "./routes";

const ProtectedRoute = (props) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { children } = props;

  const isValidRoute =
    routes.filter(
      (route) =>
        route.path.toLowerCase() === window.location.pathname.toLowerCase()
    ).length != 0;

  if (!auth) {
    return <Navigate to="/signIn" replace />;
  }

  if (new Date().getTime() - auth?.sessionTimeout > 30 * 60 * 1000) {
    localStorage.clear();
    Notification.error("Session Time out, Please Try Again!");
    return <Navigate to="/signIn" replace />;
  }

  if (window.location.pathname == "/") {
    return <Navigate to={auth ? "/allBlogs" : "/signIn"} replace />;
  }

  if (!isValidRoute) {
    return auth ? <ErrorPage /> : <Navigate to="/signIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
