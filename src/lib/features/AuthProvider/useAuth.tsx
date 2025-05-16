import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../../config/firebaseConfig";
import { User } from "next-auth";

interface AuthContextType {
  user: Partial<User>;
  loading: boolean;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
}

const defaultAuthContext: AuthContextType = {
  user: {},
  loading: true,
  role: "customer",
  setRole: () => {},
  token: null,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("customer");
  const [token, setToken] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const fetchedToken: any = await _user.getIdToken();
        setToken(fetchedToken);
        setUser(_user);
      } else {
        setToken(null);
      }
      console.log(user);
      setLoading(false);
      const role = localStorage.getItem("role");
      if (role) {
        setRole(role);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, setRole, token }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
