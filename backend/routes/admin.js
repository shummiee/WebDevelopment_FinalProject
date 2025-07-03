const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.render('admin/admin_products'); // ✅ renders views/admin/admin_products.ejs
});

module.exports = router;
