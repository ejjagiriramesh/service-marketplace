import React from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout.jsx";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import ProviderLayout from "../../layouts/ProviderLayout.jsx";

import ServicesHomePage from "../../features/services/pages/ServicesHomePage.jsx";
import ServiceCategoriesPage from "../../features/services/pages/ServiceCategoriesPage.jsx";
import ServiceSearchPage from "../../features/services/pages/ServiceSearchPage.jsx";
import ProviderDetailsPage from "../../features/services/pages/ProviderDetailsPage.jsx";
import ServiceRequestPage from "../../features/services/pages/ServiceRequestPage.jsx";
import RequestSuccessPage from "../../features/services/pages/RequestSuccessPage.jsx";
import MyRequestsPage from "../../features/services/pages/MyRequestsPage.jsx";
import SavedProvidersPage from "../../features/services/pages/SavedProvidersPage.jsx";
import AccountPage from "../../features/services/pages/AccountPage.jsx";
import ProviderDashboardPage from "../../features/services/pages/provider/ProviderDashboardPage.jsx";

import LoginPage from "../../features/auth/pages/LoginPage.jsx";
import RegisterPage from "../../features/auth/pages/RegisterPage.jsx";

import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import { NotFoundPage } from "../../shared/components/NotFoundPage.jsx";

// Mirrors the routing plan from the architecture doc:
//   / , /categories, /search, /providers/:id, /request/new
//   /account, /account/requests, /account/saved
//   /provider/dashboard
export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<ServicesHomePage />} />
        <Route path="/categories" element={<ServiceCategoriesPage />} />
        <Route path="/search" element={<ServiceSearchPage />} />
        <Route path="/providers/:providerId" element={<ProviderDetailsPage />} />
        <Route path="/request/new" element={<ServiceRequestPage />} />
        <Route path="/request/success" element={<RequestSuccessPage />} />
        <Route
          path="/account"
          element={<ProtectedRoute><AccountPage /></ProtectedRoute>}
        />
        <Route
          path="/account/requests"
          element={<ProtectedRoute><MyRequestsPage /></ProtectedRoute>}
        />
        <Route
          path="/account/saved"
          element={<ProtectedRoute><SavedProvidersPage /></ProtectedRoute>}
        />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      </Route>

      <Route element={<ProviderLayout />}>
        <Route
          path="/provider/dashboard"
          element={<ProtectedRoute><ProviderDashboardPage /></ProtectedRoute>}
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
