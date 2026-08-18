import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useProvider } from "../hooks/useProviders.js";
import { useCreateRequest } from "../hooks/useMyRequests.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { AsyncState } from "../../../shared/components/AsyncState.jsx";
import { ServiceRequestWizard } from "../components/ServiceRequestWizard.jsx";

export default function ServiceRequestPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const providerId = state?.providerId;
  const { data: provider, isLoading, isError, error } = useProvider(providerId);
  const createRequest = useCreateRequest();

  if (!providerId) return <Navigate to="/search" replace />;

  const handleSubmit = (form) => {
    createRequest.mutate(
      {
        providerId: provider.id,
        service: form.service.name,
        address: form.address,
        date: form.date,
        time: form.time,
        notes: form.notes,
      },
      {
        onSuccess: (created) => navigate("/request/success", { state: { ticketNo: created.ticketNo } }),
      }
    );
  };

  return (
    <div>
      <TopBar title="Request service" showBack />
      <div className="px-4 pt-4">
        <AsyncState isLoading={isLoading} isError={isError} error={error} isEmpty={!isLoading && !provider}>
          {provider && (
            <ServiceRequestWizard
              provider={provider}
              initialService={state?.service}
              onSubmit={handleSubmit}
              isSubmitting={createRequest.isPending}
            />
          )}
        </AsyncState>
      </div>
    </div>
  );
}
