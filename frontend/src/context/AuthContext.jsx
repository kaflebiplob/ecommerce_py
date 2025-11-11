import { createContext, useState, useEffect, children } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [Loading, setLoading] = useState(false);

  // Django backend API Url

  const API_URL = "http://localhost:8000/api";

    const register = async (username, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/register/`, {
        username,
        email,
        password,
      });
      if (response.status === 201 || response.data?.id) {
        return { success: true, message: "User Registration Succesfull" };
      } else {
        return { success: false, message: "Unexpected response from server" };
      }
    } catch (error) {
      console.error("Registration Failed", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed. Try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login/`, {
        username,
        password,
      });

      if (response.data?.access) {
        const userData = response.data.user || { username };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Login failed. Please check your credentials.",
      };
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
