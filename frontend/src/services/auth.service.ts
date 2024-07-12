import axios from "axios";

const API_URL = "http://localhost:8080/";

const AuthService = {
  register: async (user: { nome: string; email: string; senha: string }) => {
    const response = await axios.post(API_URL + "students/register", user);
    return response;
  },

  login: async (email: string, senha: string) => {
    const response = await axios.post(API_URL + "login", {
      email,
      senha,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getUser: () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  },
};

export default AuthService;
