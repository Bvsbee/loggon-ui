import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { UserModel } from "../utils/models/UserModel";
import { getProfile } from "../api/authAPI";

interface AuthContextType {
  user: UserModel | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: UserModel, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);

      // Fetch latest user profile on page refresh
      getProfile(JSON.parse(storedUser).email, storedToken)
        .then((updatedProfile) => {
          setUser(updatedProfile);
          localStorage.setItem("user", JSON.stringify(updatedProfile)); // Update storage with full profile
        })
        .catch((error) => console.error("Error fetching profile", error));
    }
  }, []);

  {
    console.log("User", { user });
    console.log(user);
  }

  const login = async (userData: UserModel, token: string) => {
    if (!userData?.email) {
      console.error("User email is missing!");
      return;
    }

    try {
      // Fetch the full profile
      const userProfile = await getProfile(userData.email, token);

      // Update state with the full profile
      setUser(userProfile);
      setToken(token);

      // Store the full user profile and token in localStorage
      localStorage.setItem("user", JSON.stringify(userProfile));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin ?? false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
