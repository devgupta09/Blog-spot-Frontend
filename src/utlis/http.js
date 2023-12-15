import axios from "axios";

const http = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const DEPLOYED_URL = process.env.REACT_APP_DEPLOYED_URL;

  return axios.create({
    baseURL: window.location.host != "localhost:3000" ? BASE_URL : DEPLOYED_URL,
    headers: {
      "auth-token": auth?.authToken,
      "Content-Type": "application/json",
    },
  });
};

export default http;
