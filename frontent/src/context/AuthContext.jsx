import { createContext, useState } from "react";
import API from "../api";
import { useEffect } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get current user
  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // ✅ Signup (only admin can register)
  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post("/users/register", userData);

      return res.data;
    } catch (error) {
      throw error?.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/users/login", { email, password });
      await fetchMe();

      return res.data;
    } catch (error) {
      throw err.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
