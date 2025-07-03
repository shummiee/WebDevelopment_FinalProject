//CRUD

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ---------------------
// CREATE (Add Product)
// ---------------------
router.post('/add', async (req, res) => {
  try {
    const { price, size, category, clothingTypes, stock } = req.body;

    const newProduct = new Product({
      price,
      size,
      category,
      clothingTypes, // make sure your form uses name="clothingTypes"
      stock
    });

    await newProduct.save();
    res.redirect('/admin/products'); // or wherever you want to go after adding
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to add product');
  }
});

// ---------------------
// READ (View All Products) — ADMIN ONLY
// ---------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin/admin_products', { products }); 
    // ^ Make sure path matches: /views/admin/admin_products.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to fetch products');
  }
});

// ---------------------
// UPDATE (Show Edit Form)
// ---------------------
router.get('/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('edit_product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to fetch product');
  }
});

// ---------------------
// UPDATE (Handle Edit Form Submission)
// ---------------------
router.put('/:id', async (req, res) => {
  try {
    const { price, size, category, clothingTypes, stock } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      price,
      size,
      category,
      clothingTypes,
      stock
    });

    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to update product');
  }
});

// ---------------------
// DELETE (Remove Product)
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

