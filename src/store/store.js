import { action, createStore } from "easy-peasy";
import ModelsStore from "./models/ModelsStore";

const store = createStore({
  ...ModelsStore,
  reset: action((state, payload) => ({ ...initialState })),
});

let initialState = {};

initialState = store.getState();

export default store;
