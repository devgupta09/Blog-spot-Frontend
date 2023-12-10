import axios from "axios";

const config = {
  BASE_URL: "http://localhost:8000/",
  DEPLOYED_URL: "https://blog-spot-backend-dev-guptas-projects.vercel.app/",
};

const http = (props) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  let defaultHeaders = auth ? { "auth-token": auth?.authToken } : {};
  const currentHost = window.location.host;

  if (props) {
    defaultHeaders = { ...defaultHeaders, ...props.headers };
  }

  return axios.create({
    baseURL:
      currentHost == "localhost:3000" ? config.BASE_URL : config.DEPLOYED_URL,
    headers: {
      ...defaultHeaders,
    },
  });
};

export default http;
