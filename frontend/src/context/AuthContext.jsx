import { createContext, useState, useEffect, children } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [Loading, setLoading] = useState(false);

  // Django backend APi Url

  const API_URL = "http://localhost:8000/api";

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login/`, {
        username,
        password,
      });
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      return { success: true };
    } catch (error) {
      console.error("login failed", error);
      return { success: false, message: "Invalid Credentials" };
    } finally {
      setLoading(false);
    }
  };
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/register/`, {
        username,
        email,
        password,
      });
      return { success: true, message: "User Registration Succesfull" };
    } catch (error) {
      console.error("Registration Failed", error);
      return { success: false, message: "Registration Failed" };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
    useEffect(() => {
    const refreshToken = async () => {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh,
          });
          localStorage.setItem("access", response.data.access);
        } catch (error) {
          console.error("Token refresh failed", error);
          logout();
        }
      }
    };

    const interval = setInterval(refreshToken, 4 * 60 * 1000); // every 4 min
    return () => clearInterval(interval);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, Loading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
