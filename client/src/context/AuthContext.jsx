import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import ToKenService from "../services/token.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  // logout ไปแล้ว login เข้ามาใหม่ state ก็จะเปลี่ยนใหม่ ที่ user
  const login = (user) => setUser(user);

  const logout = () => {
    // clear ใน browser เรา localstorage
    AuthService.logout();
    // clear in state
    setUser(null);
  };

  useEffect(() => {
    // เวลามีการเปลี่ยน user หรือ token ก็จะ update
    // update token user
    ToKenService.setUser(user);
  }, [user]);

  // login ค้างไว้
  function getUser() {
    const currentUser = ToKenService.getUser();
    return currentUser;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
