import axios from "axios";
import { DepartmentResponse } from "../types/departments";
import { IUsersCompanyCollection } from "../types/usersCompanyCollection";
import { getToken } from "../utils/tokenHelper";

const axiosInstance = axios.create({
  baseURL: "https://demo2-uk.prod.itua.in.ua/core_api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
