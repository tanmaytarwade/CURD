const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import cors

const db = require("./database/db.js");
db();

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  pname: String,
  price: Number,
  discount: Number,
});

var userModel = mongoose.model("product", userSchema, "product");

const app = express();

// Use CORS middleware globally
app.use(cors());  // This allows all origins, enabling cross-origin requests

app.use(express.json());

app.get("/product", async (req, res) => {
  try {
    const products = await userModel.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message); // Only log errors
    res.status(500).json({ message: err.message });
  }
});


app.post("/product", async (req, res) => {
  try {
    const record = new userModel(req.body);
    await record.save();
    res.status(201).send("Product Added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    await userModel.findByIdAndDelete(productId);
    res.status(200).send("Product deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(9000, () => {
  console.log("Server is running on http://localhost:9000");
});


