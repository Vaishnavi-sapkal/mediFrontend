import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token) {
          setIsAuthenticated(false);
          return;
        }

        const { data } = await axios.post(
          "https://medibackend-au6d.onrender.com",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          removeCookie("token");
        }
      } catch (error) {
        setIsAuthenticated(false);
        removeCookie("token");
      }
    };

    verifyCookie();
  }, [cookies.token, removeCookie]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
