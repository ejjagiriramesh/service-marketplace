import { db } from "../api/db.js";
import { mockRequest } from "../api/mockClient.js";
import { setToken, clearToken } from "./authStorage.js";
import { ROLES } from "./permissions.js";

// Stands in for POST /auth/login, /auth/register, /auth/me against the
// platform's Authentication service. Swap the body of each function for an
// axiosClient call and the rest of the app (AuthProvider, ProtectedRoute,
// pages) does not need to change.
export const authService = {
  async login({ email, password }) {
    return mockRequest(() => {
      if (!email || !password || password.length < 6) {
        throw { status: 401, message: "Invalid email or password." };
      }
      const user = {
        id: "U1",
        name: "Priya Kumar",
        email,
        phone: "+91 98xxxxxx21",
        role: ROLES.CUSTOMER,
        location: "Kukatpally, Telangana",
        rating: 4.9,
      };
      setToken("demo-token." + btoa(email));
      db.saveUser(user);
      return user;
    });
  },

  async register({ name, email, password, location, coordinates }) {
    return mockRequest(() => {
      const user = {
        id: "U" + Date.now(),
        name,
        email,
        phone: "",
        role: ROLES.CUSTOMER,
        location: location || "Kukatpally, Telangana",
        coordinates: coordinates || null,
        rating: null,
      };
      setToken("demo-token." + btoa(email));
      db.saveUser(user);
      return user;
    });
  },

  async logout() {
    return mockRequest(() => {
      clearToken();
      db.clearUser();
      return true;
    });
  },

  getCurrentUser() {
    return db.getUser();
  },
};
