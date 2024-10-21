import { makeAutoObservable } from "mobx";
import { signIn } from "../services/ituaService";
import { saveToken, removeToken } from "../utils/tokenHelper";

class AuthStore {
  token: string | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(login: string, password: string) {
    try {
      const response = await signIn(login, password);
      if (response.token) {
        this.token = response.token;
        this.isAuthenticated = true;
        saveToken(response.token);
      } else {
        throw new Error("Невірний логін або пароль");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Помилка авторизації");
      } else {
        throw new Error("Невідома помилка авторизації");
      }
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    removeToken();
  }

  loadToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    }
  }
}

const authStore = new AuthStore();
export default authStore;
