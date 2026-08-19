import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../schemas/authSchema.js";
import { useAuth } from "../../../app/providers/AuthProvider.jsx";
import { AppTextField } from "../../../shared/components/TextField.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";
import { OfficeLocationPicker } from "../../../shared/location/OfficeLocationPicker.jsx";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [officeLocation, setOfficeLocation] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values) => {
    setFormError(null);
    if (!officeLocation?.address) {
      setFormError("Search for your office location or use your live location.");
      return;
    }
    try {
      await registerUser({ ...values, location: officeLocation.address, coordinates: officeLocation.coordinates });
      navigate("/", { replace: true });
    } catch (err) {
      setFormError(err.message || "Could not create your account.");
    }
  };

  return (
    <div className="flex items-center justify-center px-6" style={{ minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div className="f-mono" style={{ fontSize: 10.5, color: "var(--amber-deep)", letterSpacing: "0.12em", marginBottom: 6 }}>SERVICEHUB · SIGN UP</div>
        <h1 className="f-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Create your account</h1>
        <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 24 }}>Book trusted local providers in a few taps.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AppTextField label="Full name" error={errors.name?.message} {...register("name")} />
          <AppTextField label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <AppTextField label="Password" type="password" error={errors.password?.message} {...register("password")} />
          <AppTextField label="Confirm password" type="password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
          <OfficeLocationPicker value={officeLocation} onChange={setOfficeLocation} />
          {formError && <div style={{ fontSize: 12.5, color: "var(--rust)", marginBottom: 12 }}>{formError}</div>}
          <AppButton type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </AppButton>
        </form>

        <div style={{ fontSize: 13, marginTop: 18, textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
