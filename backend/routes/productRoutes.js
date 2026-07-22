const express = require("express");
const products = require("../controllers/productController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", products.list);
router.get("/:id", products.getOne);
router.post("/", requireAuth, requireAdmin, products.create);
router.put("/:id", requireAuth, requireAdmin, products.update);
router.delete("/:id", requireAuth, requireAdmin, products.remove);

module.exports = router;
