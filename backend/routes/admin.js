const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // ✅

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // ✅ fetch all products
    console.log('Products:', products);    // ✅ log to verify!
    res.render('admin/admin_products', { products }); // ✅ pass to EJS
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


