import express, { Router } from "express";
import { searchController } from "../../modules/search";

const router: Router = express.Router();

router.route("/").get(searchController.searchProducts);
router.route("/").post(searchController.createProduct);

export default router;
