import axios from "axios";

/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/
const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://6113a162cba40600170c1b5c.mockapi.io/todolistAPI",
  headers: {
    "content-type": "application/json",
  },
  timeout: 5000,
  responseType: "json",
});

export default axiosClient;
