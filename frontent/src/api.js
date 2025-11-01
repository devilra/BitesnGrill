import axios from "axios";

//console.log(import.meta.env.VITE_CPANEL_API_URL);

const API = axios.create({
  //baseURL: "http://localhost:4000/api",
  //baseURL:  `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `${import.meta.env.VITE_CPANEL_API_URL}/api`,
  withCredentials: true,
});

export default API;
