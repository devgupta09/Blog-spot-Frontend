import axios from "axios";

const http = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "auth-token": auth?.authToken,
      "Content-Type": "application/json",
    },
  });
};

export default http;
