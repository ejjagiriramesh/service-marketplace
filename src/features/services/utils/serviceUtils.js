import { CATEGORY_ICONS } from "../constants/serviceConstants.js";
import { CATEGORIES } from "../../../core/api/db.js";

export function getCategoryIcon(categoryId) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return CATEGORY_ICONS[cat?.icon] || CATEGORY_ICONS.Zap;
}
