import { createContext } from "react";
import { useAuth } from "../Hook/useAuth";

export const AuthContext = createContext();
export const user_Data = createContext();
const AuthContextProvider = ({ children }) => {
  const { login, logout, token, userData } = useAuth();

  return (

      <AuthContext.Provider
        value={{ login, logout, token, userData, isLoggedIn: !!token }}
      >
        {children}
      </AuthContext.Provider>
 
  );
};

export default AuthContextProvider;