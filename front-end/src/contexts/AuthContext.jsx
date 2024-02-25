import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const login = () => [setAuthenticated(true)];
  return (
    <AuthContext.Provider value={{ authenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
