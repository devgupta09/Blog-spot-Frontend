import { action, thunk } from "easy-peasy";
import http from "../../utlis/htts";

const UserModel = {
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {},
  setToken: action((state, payload) => {
    state.auth = payload;
    localStorage.setItem("auth", JSON.stringify(payload));
  }),

  // Sign-in API call

  signIn: thunk(async (action, payload) => {
    const response = await http()
      .post("auth/signIn", payload)
      .then((res) => {
        const { data } = res;
        action.setToken(data);
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
        // action.setToken(data);
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
  }),

  // Get User Details

  getUserDetails: thunk(async (action, payload) => {
    const resolve = await http()
      .get("auth/getUserDetails")
      .then((res) => {
        const { data } = res;
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return resolve;
  }),

  // Update User Details

  updateUserDetails: thunk(async (action, payload) => {
    const resolve = await http()
      .post("auth/updateUserDetails", payload)
      .then((res) => {
        const { data } = res;
        return new Promise((resolve, reject) => resolve(data));
      })
      .catch((err) => {
        return new Promise((resolve, reject) => reject(err));
      });
    return resolve;
  }),
};

export default UserModel;
