import React from "react";
import { classNames } from "../../core/utils/format.js";

export function Chip({ active, children, ...props }) {
  return (
    <span className={classNames("chip", active && "active")} {...props}>
      {children}
    </span>
  );
}
