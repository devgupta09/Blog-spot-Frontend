import { action, thunk } from "easy-peasy";
import http from "../../utlis/htts";

const UserModel = {
  authToken: localStorage.getItem("authToken"),
  setToken: action((state, payload) => {
    state.authToken = payload;
    localStorage.setItem("authToken", payload);
  }),

  // Sign-in API call

  signIn: thunk(async (action, payload) => {
    const response = await http()
      .post("auth/signIn", payload)
      .then((res) => {
        const { data } = res;
        action.setToken(data.authToken);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return response;
  }),

  // Sign-up APi calling

  signUp: thunk(async (action, payload) => {
    await http()
      .post("auth/signUp", payload)
      .then((res) => {
        const { data } = res;
        action.setToken(data.authToken);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
  }),
};

export default UserModel;
