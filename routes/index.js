const express = require("express");
const router = express.Router();

const {
	addSales,
	updateSales,
	getSalesList,
	deleteSales,
	getStatsSales
} = require("../controllers/SalesController");

router.post("/sales", addSales);
router.patch("/sales", updateSales);
router.get("/sales", getSalesList);
router.delete("/sales/:id", deleteSales);
router.get("/statsales/:stats", getStatsSales);

module.exports = router;
