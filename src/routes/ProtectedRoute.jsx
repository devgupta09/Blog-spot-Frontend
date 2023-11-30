import { Navigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const ProtectedRoute = (props) => {
  const token = useStoreState((state) => state.user.token);
  const { children } = props;

  if (token) {
    return children;
  }

  return <Navigate to="/signIn" />;
};

export default ProtectedRoute;
