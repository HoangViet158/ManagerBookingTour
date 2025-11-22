import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import adminApi from "../services/adminApi";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // { id, role_id }
  const [loading, setLoading] = useState(true); // { id, role_id }

  // Cập nhật user khi token thay đổi
  useEffect(() => {
    // console.log(">>> token changed: ", token);
    setLoading(true);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          role_id: decoded.role_id,
          cus_id: decoded.cus_id,
          emp_id: decoded.emp_id,
        });
        localStorage.setItem("token", token);
        // localStorage.setItem("loading", loading);
      } catch (err) {
        console.error("Token invalid", err);
        setUser(null);
        setToken(null);
        setLoading(false);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  // Hàm login
  const login = async (email, password) => {
    const res = await adminApi.login(email, password);
    // console.log(">>> login res: ", res.token);
    if (res.token) {
      setToken(res.token);
      return true;
    }
    return false;
  };

  // Hàm logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
