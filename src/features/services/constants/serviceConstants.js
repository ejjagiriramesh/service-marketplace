import { Zap, Wrench, Wind, Hammer, PaintRoller, Sparkles, Droplets, Camera, Fan } from "lucide-react";

export const CATEGORY_ICONS = {
  Zap, Wrench, Wind, Hammer, PaintRoller, Sparkles, Droplets, Camera, Fan,
};

export const REQUEST_TABS = ["All", "Pending", "Accepted", "In Progress", "Completed", "Cancelled"];

export function matchRequestTab(status, tab) {
  if (tab === "All") return true;
  if (tab === "Pending") return status === "Requested";  
  return status === tab;
}
