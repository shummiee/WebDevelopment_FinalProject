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

module.exports = router;
