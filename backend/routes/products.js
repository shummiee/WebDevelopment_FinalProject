const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ---------------------
// CREATE (Add Product)
// POST /products/add
// ---------------------
router.post('/add', async (req, res) => {
  try {
    const { price, size, category, clothingTypes, stock, image } = req.body;

    const newProduct = new Product({
      price,
      size,
      category,
      clothingTypes, // ensure your form uses name="clothingTypes"
      stock,
      image // optional if you have an image URL field
    });

    await newProduct.save();
    res.redirect('/admin/products'); // Redirect to admin product list after adding
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to add product');
  }
});

// ---------------------
// READ (View All Products) — ADMIN ONLY
// GET /products/
// ---------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin/admin_products', { products });
    // Make sure views/admin/admin_products.ejs exists
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to fetch products');
  }
});

// ---------------------
// UPDATE (Show Edit Form)
// GET /products/:id/edit
// ---------------------
router.get('/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('admin/edit_product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to fetch product');
  }
});

// ---------------------
// UPDATE (Handle Edit Form Submission)
// PUT /products/:id
// ---------------------
router.put('/:id', async (req, res) => {
  try {
    const { price, size, category, clothingTypes, stock, image } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      price,
      size,
      category,
      clothingTypes,
      stock,
      image
    });

    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to update product');
  }
});

// ---------------------
// DELETE (Remove Product)
// DELETE /products/:id
// ---------------------
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to delete product');
  }
});

module.exports = router;


