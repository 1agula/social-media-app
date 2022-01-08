import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class AuthService {
  login(email, password) {
    return axiosInstance.post("/auth/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    try {
      if (!localStorage.user) return undefined;
      return JSON.parse(localStorage.user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();
