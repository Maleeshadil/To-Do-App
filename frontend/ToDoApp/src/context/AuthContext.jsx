// import { createContext, useState } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   // Debugging user state initialization
//   console.debug("Initializing user state:", user);

//   const login = (data) => {
//     console.debug("Logging in user:", data);
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const logout = () => {
//     console.debug("Logging out user:", user);
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // export const useAuth = () => useContext(AuthContext);

import { createContext, useState } from "react";
import api from "../utils/axios";
import { setAccessToken, logout as clearToken } from "../utils/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {    
    setUser(data);
    setAccessToken(data.token);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

