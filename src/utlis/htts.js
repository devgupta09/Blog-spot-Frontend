import axios from "axios";

const config = {
  BASE_URL: "http://localhost:8000/",
};

const http = (props) => {
  const authToken = localStorage.getItem("authToken");
  let defaultHeaders = authToken == null ? {} : { "auth-token": authToken };

  if (props) {
    defaultHeaders = { ...defaultHeaders, ...props.headers };
  }

  return axios.create({
    baseURL: config.BASE_URL,
    headers: {
      ...defaultHeaders,
    },
  });
};

export default http;
