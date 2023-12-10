import { Navigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import Notification from "../components/common/Notification";
import routes from "./routes";

const ProtectedRoute = (props) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const setToken = useStoreActions((action) => action.user.setToken);
  const currentPath = window.location.pathname;
  const timeDiff = Date.now() - auth?.sessionTimeout;
  const { children } = props;

  const isValidRoute = routes.find((route) => {
    return route.path == currentPath;
  });

  if (!auth) {
    return <Navigate to="/signIn" replace />;
  }

  if (timeDiff > 30 * 60 * 1000) {
    setToken(null);
    Notification.error("Session Expired, Please Sign-in Again!");
    return <Navigate to="/signIn" replace />;
  }

  if (window.location.pathname == "/") {
    return <Navigate to={auth ? "/allBlogs" : "/signIn"} replace />;
  }

  if (!isValidRoute) {
    return auth ? (
      <Navigate to="/errorPage" replace />
    ) : (
      <Navigate to="/signIn" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
