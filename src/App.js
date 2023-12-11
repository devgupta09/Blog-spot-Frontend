import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import AuthenticationPage from "./pages/AuthenticationPage";
import store from "./store/store";

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <AuthenticationPage />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
