import express from "express";
import AddProduct from "../models/AddProduct.js";
import { protect } from "../middleware/authMiddleware.js"; // 'admin' middleware is removed
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// Create product - accessible to any logged-in user
router.post("/", protect, async (req, res) => {
    try {
        // Create the product once
        const product = await AddProduct.create(req.body);

        // Send email to admin
        await sendEmail(
            process.env.ADMIN_EMAIL,
            "New Product Added",
            `<p>Product <strong>${product.name}</strong> has been added by user ID: ${req.user._id}</p>`
        );

        // Respond to client
        res.status(201).json(product);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all products - accessible to any logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const products = await AddProduct.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single product - accessible to any logged-in user
router.get("/:id", protect, async (req, res) => {
    try {
        const product = await AddProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update product - accessible to any logged-in user
router.put("/:id", protect, async (req, res) => {
    try {
        const product = await AddProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product - accessible to any logged-in user
router.delete("/:id", protect, async (req, res) => {
    try {
        const product = await AddProduct.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;