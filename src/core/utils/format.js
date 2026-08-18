export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function classNames(...parts) {
  return parts.filter(Boolean).join(" ");
}
