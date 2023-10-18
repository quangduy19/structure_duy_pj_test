import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import { snakeToCamel } from "../utils";

// Create an Axios instance
const API: AxiosInstance = axios.create({
  baseURL: config.REACT_APP_API, // Replace with your API URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
API.interceptors.request.use(
  (config: any) => {
    // Add custom headers, authentication tokens, or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with the response data (e.g., logging, error handling, etc.)
    response.data = snakeToCamel(response.data);
    return response;
  },
  (error) => {
    // Handle response errors (e.g., display an error message, redirect, etc.)
    return Promise.reject(error);
  }
);

export default API;
