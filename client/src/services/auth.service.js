import api from "./api";
import ToKenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

// asynchronous function
const register = async (userData) => {
  return await api.post(API_URL + "/signup", userData);
};

const login = async (email, password) => {
  const response = await api.post(API_URL + "/signin", { email, password });
  // saving user data to local storage
  if (!response.data.token) {
    return response;
  }

  ToKenService.setUser(response.data);
  return response;
};

const logout = () => {
  ToKenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
