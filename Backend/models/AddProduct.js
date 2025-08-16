import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productBrand: { type: String, required: true },
    productPrice: { type: Number, required: true },
    totalSales: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    status: { type: String, default: 'Active', enum: ['Active', 'Draft'] },
    productDescription: { type: String, required: true },
    // Changed to an array to hold multiple image URLs
    productImages: { type: [String], default:"../../frontend/public/dp.jpg" ||"https://images.unsplash.com/vector-1738237080330-b9d0755ede07?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" },
}, { timestamps: true });

export const AddProduct = mongoose.model("AddProduct", addProductSchema);
export default AddProduct;