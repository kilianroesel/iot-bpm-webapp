import axios from "axios";

const baseUrl = import.meta.env.VITE_IOT_BPM_BACKEND;

export const apiInstance = axios.create({
  baseURL: baseUrl,
});
