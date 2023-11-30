import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import RouterFlow from "./routes/RouterFlow";
import store from "./store/store";

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <RouterFlow />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
