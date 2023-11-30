import { action, thunk } from "easy-peasy";
import http from "../../utlis/htts";

const UserModel = {
  authToken: null,
  setToken: action((state, payload) => {
    state.authToken = payload;
    localStorage.setItem("authToken", payload);
    console.log("Token set Successfully!", payload);
  }),

  // Sign-in API call

  signIn: thunk(async (action, payload) => {
    console.log(payload);
    await http()
      .post("auth/signIn", payload)
      .then((res) => {
        const { data } = res;
        console.log("Logged In successfully! ", data);
        action.setToken(data.authToken);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  // Sign-up APi calling

  signUp: thunk(async (action, payload) => {
    await http()
      .post("auth/signUp", payload)
      .then((res) => {
        const { data } = res;
        console.log("Sign up successfully!", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
};

export default UserModel;
