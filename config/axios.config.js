import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");

  const localConfig = config;
  if (!localConfig.thirdParty) {
    if (!localConfig.headers["Content-type"]) {
      localConfig.headers["Content-type"] = "application/json";
    }
    localConfig.headers.Accept = "application/json";
    localConfig.timeout =
      localConfig.timeout === 0 ? 60000 : localConfig.timeout;
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      return Promise.reject({
        status: false,
        ...error.response.data,
      });
    } else if (error.message === "Network Error") {
      // handle network error
      return Promise.reject({
        status: false,
        message:
          "Network Connection Error. Please check your internet connection",
      });
    } else if (error.response && error.response.status >= 500) {
      // handle server error
      if (error.response?.data?.error?.issues) {
        const [responseError] = error.response?.data?.error?.issues || [];
        return Promise.reject({
          status: false,
          message: responseError.message,
        });
      } else
        return Promise.reject({
          status: false,
          message:
            "Internal Server Error. Our Technincal team has been informed and assistance will be provided shortly.",
        });
    }
    return Promise.reject(error);
  }
);

export default api;
