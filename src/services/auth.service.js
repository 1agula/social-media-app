import axios from "axios";

class AuthService {
  login(email, password) {
    return axios.post("/auth/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post("/auth/register", {
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
