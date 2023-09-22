import axios from "axios";

const api = axios.create({
  baseURL: "https://solving.ai/public/api"
});

export default api;