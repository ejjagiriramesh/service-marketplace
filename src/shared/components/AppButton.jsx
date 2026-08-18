import React from "react";
import { classNames } from "../../core/utils/format.js";

const VARIANT_CLASS = {
  primary: "btn-primary",
  amber: "btn-amber",
  outline: "btn-outline",
};

export function AppButton({ variant = "primary", fullWidth, className, style, ...props }) {
  return (
    <button
      className={classNames(VARIANT_CLASS[variant] || VARIANT_CLASS.primary, className)}
      style={{ width: fullWidth ? "100%" : undefined, ...style }}
      {...props}
    />
  );
}
