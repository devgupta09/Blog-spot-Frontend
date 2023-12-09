import { Navigate } from "react-router-dom";
import routes from "./routes";

const ProtectedRoute = (props) => {
  const authToken = localStorage.getItem("authToken");
  const currentPath = window.location.pathname;
  const { children } = props;

  const isValidRoute = routes.find((route) => {
    return route.path == currentPath;
  });

  if (window.location.pathname == "/") {
    return <Navigate to={authToken ? "/allBlogs" : "/signIn"} replace />;
  }

  if (!isValidRoute) {
    return authToken === "null" ? (
      <Navigate to="/signIn" replace />
    ) : (
      <Navigate to="/errorPage" replace />
    );
  }

  if (authToken === "null") {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
