import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import DefaultPage from "./pages/DefaultPage";
import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <DefaultPage />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
