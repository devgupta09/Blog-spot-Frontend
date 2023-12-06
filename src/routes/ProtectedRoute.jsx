import { Navigate } from "react-router-dom";
import routes from "./routes";

const ProtectedRoute = (props) => {
  const authToken = localStorage.getItem("authToken");
  const { children } = props;

  const isValidRoute = routes.filter((route) => {
    return route.path == window.location.pathname;
  });

  if (window.location.pathname == "/") {
    return <Navigate to={authToken ? "/allBlogs" : "/signIn"} />;
  }

  if (!isValidRoute.length) {
    return !authToken ? (
      <Navigate to="/errorPage" replace />
    ) : (
      <Navigate to="/signIn" replace />
    );
  }

  if (!authToken) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
