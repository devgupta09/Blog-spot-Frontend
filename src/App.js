import { BrowserRouter } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthenticationPage />
    </BrowserRouter>
  );
};

export default App;
