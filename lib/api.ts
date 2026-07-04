import axios from "axios";

const api = axios.create({
  baseURL: "https://problem-tracker-zww7.onrender.com/api",
});

export default api;