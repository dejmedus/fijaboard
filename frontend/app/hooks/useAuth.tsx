import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isLoading: true,
  error: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedUser = localStorage.getItem("cached_user");
    if (cachedUser) setUser(JSON.parse(cachedUser));

    if (!cachedUser) {
      fetchUserData();
    }

    setIsLoading(false);
  }, []);

  function updateUser(userData: User) {
    setUser(userData);
    localStorage.setItem("cached_user", JSON.stringify(userData));
  }

  function clearUser() {
    setUser(null);
    localStorage.removeItem("cached_user");
  }

  const fetchUserData = async () => {
    try {
      // fetch api https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      // response: {type: 'cors', url: 'http://localhost:5000/api/auth/user', redirected: false, status: 200, ok: true}
      const response = await fetch(`${BACKEND_URL}/auth/user`, {
        // "credentials are cookies, TLS client certificates, or authentication headers"
        // "include: always include credentials, even cross-origin"
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Auth failed:", response.status);
        clearUser();
        return;
      }

      const userData = await response.json();

      if (!userData.authenticated) {
        clearUser();
      } else {
        updateUser(userData);
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      clearUser();
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#creating_a_request_object
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }

      const authUserData = await response.json();
      updateUser(authUserData);
      return true;
    } catch (err: any) {
      setError(err.message || "Sign up failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      updateUser(userData);
      return true;
    } catch (err: any) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      clearUser();
      return true;
    } catch (err) {
      setError("Logout failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
