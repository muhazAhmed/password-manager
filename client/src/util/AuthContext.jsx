import axios from "axios";
import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { API_URL } from "../assets/API/API_URL";
import { ServerVariables } from "./ServerVariables";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = useCallback(async (inputs) => {
    const res = await axios.post(API_URL+ServerVariables.Login, inputs);
    setCurrentUser(res.data);
  }, []);

  const logout = useCallback(async () => {
    await axios.post(API_URL+ServerVariables.Logout);
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const authContextValue = useMemo(() => ({ currentUser, login, logout }), [currentUser, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
