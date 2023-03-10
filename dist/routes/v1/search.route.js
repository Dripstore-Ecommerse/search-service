import express from "express";
import { searchController } from "../../modules/search";
const router = express.Router();
router.route("/").get(searchController.searchProducts);
router.route("/").post(searchController.createProduct);
export default router;
//# sourceMappingURL=search.route.js.map