import axios from "axios";

export const baseUrl = import.meta.env.VITE_IOT_BPM_BACKEND;

export const apiInstance = axios.create({
  baseURL: baseUrl,
});

export const wssInstance = import.meta.env.VITE_IOT_BPM_STREAM;
