import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { QueryProvider } from "./providers/QueryProvider.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { FavoritesProvider } from "./providers/FavoritesProvider.jsx";
import { AppRouter } from "./router/AppRouter.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <div className="sma-root">
                <AppRouter />
              </div>
            </BrowserRouter>
          </FavoritesProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
