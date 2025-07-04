const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // ✅ using your existing model

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('admin/admin_products', { products }); // ✅ pass to EJS
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add product route
router.post('/products', async (req, res) => {
  try {
    console.log("🟢 FORM DATA RECEIVED:", req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log("✅ Saved to MongoDB!");
    res.redirect('/admin/products');
  } catch (err) {
    console.error("❌ Error saving product:", err);
    res.status(400).send('Error adding product');
  }
});






module.exports = router;
