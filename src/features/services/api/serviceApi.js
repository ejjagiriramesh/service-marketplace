import { CATEGORIES } from "../../../core/api/db.js";
import { mockRequest } from "../../../core/api/mockClient.js";

export const serviceApi = {
  getCategories: () => mockRequest(() => CATEGORIES),
};
