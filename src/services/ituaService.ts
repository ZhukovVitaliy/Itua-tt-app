import axios from "axios";
import { DepartmentResponse } from "../types/departments";
import { IUsersCompanyCollection } from "../types/usersCompanyCollection";
import {
  getToken,
  getRefreshToken,
  saveTokens,
  removeTokens,
} from "../utils/tokenHelper";
import authStore from "../stores/authStore";

const axiosInstance = axios.create({
  baseURL: "https://demo2-uk.prod.itua.in.ua/core_api",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axiosInstance.post("/auth/refresh_token", {
      refresh_token: refreshToken,
    });

    const { token, refresh_token } = response.data;
    saveTokens(token, refresh_token);
    return token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    removeTokens();
    authStore.logout();
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Expired JWT Token"
    ) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

const handleRequestError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Server error occurred");
  } else if (error.request) {
    throw new Error("No response received from server");
  } else {
    throw new Error("Error in setting up the request");
  }
};

export const signIn = async (login: string, password: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      login,
      password,
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

export const getAllEmployees =
  async (): Promise<IUsersCompanyCollection | null> => {
    try {
      const response = await axiosInstance.get("/company/users");
      return response.data as IUsersCompanyCollection;
    } catch (error) {
      handleRequestError(error);
      return null;
    }
  };

export const getFilterEmployees = async (
  filters: Record<string, string>
): Promise<IUsersCompanyCollection | null> => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`/company/users?${queryParams}`);
    return response.data as IUsersCompanyCollection;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};

export const getDepartments = async (): Promise<DepartmentResponse | null> => {
  try {
    const response = await axiosInstance.get("/company/departments");
    return response.data as DepartmentResponse;
  } catch (error) {
    handleRequestError(error);
    return null;
  }
};
