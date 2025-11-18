import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import adminApi from "../services/adminApi";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, role_id }
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Cập nhật user khi token thay đổi
  useEffect(() => {
    console.log(">>> token changed: ", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          role_id: decoded.role_id,
          cus_id: decoded.cus_id,
        });
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Token invalid", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // Hàm login
  const login = async (email, password) => {
    const res = await adminApi.login(email, password);
    // console.log(">>> login res: ", res.token);
    setToken(res.token);
    return true;
  };

  // Hàm logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
