import { action, thunk } from "easy-peasy";

const UserModel = {
  token: null,
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  signIn: thunk((action, payload) => {}),
};

export default UserModel;
