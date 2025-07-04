const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Show all products in admin dashboard
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('admin/admin_products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add new product
router.post('/products', async (req, res) => {
  try {
    console.log("🟢 FORM DATA RECEIVED:", req.body);

    // Handle checkbox data properly (ensure it's always an array)
    const clothing = Array.isArray(req.body.Clothing)
      ? req.body.Clothing
      : [req.body.Clothing];

    const newProduct = new Product({
      Name: req.body.Name,
      Brand: req.body.Brand,
      Description: req.body.Description,
      Price: req.body.Price,
      Size: req.body.Size,
      Category: req.body.Category,
      Gender: req.body.Gender,
      Clothing: clothing,
      Stock_Quantity: req.body.Stock_Quantity,
    });

    await newProduct.save();
    console.log("✅ Saved to MongoDB!");
    res.redirect('/admin/products');
  } catch (err) {
    console.error("❌ Error saving product:", err);
    res.status(400).send('Error adding product');
  }
});

module.exports = router;
