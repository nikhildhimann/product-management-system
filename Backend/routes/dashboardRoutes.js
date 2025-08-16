import express from "express";
import User from "../models/User.js";
import AddProduct from "../models/AddProduct.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
router.get("/stats", protect, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await AddProduct.countDocuments();
    const totalSales = await AddProduct.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalSales" },
        },
      },
    ]);

    res.json({
      userCount,
      productCount,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;