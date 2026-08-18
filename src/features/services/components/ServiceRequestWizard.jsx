import React, { useState } from "react";
import { AddressSelector } from "../../../shared/location/AddressSelector.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";
import { StepService } from "./wizard/StepService.jsx";
import { StepDateTime } from "./wizard/StepDateTime.jsx";
import { StepDetails } from "./wizard/StepDetails.jsx";
import { StepConfirm } from "./wizard/StepConfirm.jsx";
import { requestWizardSchema } from "../schemas/requestSchema.js";

const STEPS = ["Service", "Location", "Date & time", "Details", "Confirm"];

export function ServiceRequestWizard({ provider, initialService, onSubmit, isSubmitting }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: initialService || null,
    address: null,
    date: null,
    time: null,
    notes: "",
  });
  const [detailsError, setDetailsError] = useState(null);

  const canContinue = [
    !!form.service,
    !!form.address,
    !!form.date && !!form.time,
    true,
    true,
  ][step];

  const goNext = () => {
    if (step === 3) {
      const result = requestWizardSchema.safeParse(form);
      if (!result.success) {
        setDetailsError(result.error.flatten().fieldErrors.notes?.[0] || null);
        return;
      }
      setDetailsError(null);
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-5">
        {STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "var(--amber)" : "var(--line)" }} />
        ))}
      </div>
      <div className="f-mono" style={{ fontSize: 10.5, color: "var(--amber-deep)", letterSpacing: "0.1em", marginBottom: 4 }}>
        STEP {step + 1} OF {STEPS.length}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <h2 className="f-display" style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{STEPS[step]}</h2>
      </div>
      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 11.5, color: "var(--slate)", marginBottom: 14 }}
        >
          ← back to {STEPS[step - 1].toLowerCase()}
        </button>
      )}
      {step === 0 && <div style={{ marginBottom: 18 }} />}

      {step === 0 && (
        <StepService provider={provider} value={form.service} onSelect={(service) => setForm((f) => ({ ...f, service }))} />
      )}
      {step === 1 && (
        <AddressSelector value={form.address} onChange={(address) => setForm((f) => ({ ...f, address }))} />
      )}
      {step === 2 && (
        <StepDateTime
          date={form.date}
          time={form.time}
          onDate={(date) => setForm((f) => ({ ...f, date }))}
          onTime={(time) => setForm((f) => ({ ...f, time }))}
        />
      )}
      {step === 3 && (
        <StepDetails notes={form.notes} onNotes={(notes) => setForm((f) => ({ ...f, notes }))} error={detailsError} />
      )}
      {step === 4 && (
        <StepConfirm provider={provider} service={form.service} address={form.address} date={form.date} time={form.time} />
      )}

      <div className="mt-6">
        {step < STEPS.length - 1 ? (
          <AppButton fullWidth disabled={!canContinue} onClick={goNext}>Continue</AppButton>
        ) : (
          <AppButton fullWidth disabled={isSubmitting} onClick={() => onSubmit(form)}>
            {isSubmitting ? "Sending request…" : "Confirm request"}
          </AppButton>
        )}
      </div>
    </div>
  );
}

export { STEPS as WIZARD_STEPS };
