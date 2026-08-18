import React from "react";
import { classNames } from "../../core/utils/format.js";

// Thin wrapper so react-hook-form's register() spreads straight onto a
// consistently-styled input, with an inline error message underneath.
export const AppTextField = React.forwardRef(function AppTextField(
  { label, error, type = "text", ...props },
  ref
) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      {label && (
        <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)", marginBottom: 6, letterSpacing: "0.06em" }}>
          {label.toUpperCase()}
        </div>
      )}
      <input ref={ref} type={type} className={classNames("input-field", error && "input-error")} {...props} />
      {error && <div style={{ fontSize: 11.5, color: "var(--rust)", marginTop: 5 }}>{error}</div>}
    </label>
  );
});
