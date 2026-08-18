import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../core/auth/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setInitializing(false);
  }, []);

  const login = async (credentials) => {
    const loggedIn = await authService.login(credentials);
    setUser(loggedIn);
    return loggedIn;
  };

  const register = async (details) => {
    const created = await authService.register(details);
    setUser(created);
    return created;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchRole = (role) => {
    setUser((u) => (u ? { ...u, role } : u));
  };

  return (
    <AuthContext.Provider value={{ user, initializing, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
