import React, { createContext, useContext } from "react";
import { tokens } from "../theme/tokens.js";

// Placeholder for a real theme system (e.g. MUI's ThemeProvider). Keeping
// this as its own provider means swapping the underlying UI kit later only
// touches this file, not every page that reads a color or font.
const ThemeContext = createContext(tokens);

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
