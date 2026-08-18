export const ROLES = { CUSTOMER: "customer", PROVIDER: "provider" };

export function canAccess(user, requiredRole) {
  if (!requiredRole) return true;
  if (!user) return false;
  return user.role === requiredRole;
}
