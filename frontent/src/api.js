import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  //baseURL: "https://bitesngrill.onrender.com/api",
  withCredentials: true,
});

export default API;
