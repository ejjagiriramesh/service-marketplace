import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../schemas/authSchema.js";
import { useAuth } from "../../../app/providers/AuthProvider.jsx";
import { AppTextField } from "../../../shared/components/TextField.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "priya@example.com", password: "demo123" },
  });

  const onSubmit = async (values) => {
    setFormError(null);
    try {
      await login(values);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setFormError(err.message || "Could not sign in.");
    }
  };

  return (
    <div className="flex items-center justify-center px-6" style={{ minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div className="f-mono" style={{ fontSize: 10.5, color: "var(--amber-deep)", letterSpacing: "0.12em", marginBottom: 6 }}>SERVICEHUB · SIGN IN</div>
        <h1 className="f-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 24 }}>Sign in to track requests and manage your account.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AppTextField label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <AppTextField label="Password" type="password" error={errors.password?.message} {...register("password")} />
          {formError && <div style={{ fontSize: 12.5, color: "var(--rust)", marginBottom: 12 }}>{formError}</div>}
          <AppButton type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </AppButton>
        </form>

        <div style={{ fontSize: 12.5, color: "var(--slate)", marginTop: 8 }}>
          Demo credentials are pre-filled — any 6+ character password works.
        </div>
        <div style={{ fontSize: 13, marginTop: 18, textAlign: "center" }}>
          New here? <Link to="/register" style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
