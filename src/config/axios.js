import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/"
});

export const AxiosInterceptors = {
  responseInterceptor() {
    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
};
