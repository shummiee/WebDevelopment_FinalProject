const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Name: String,
  Brand: String,
  Description: String,
  Price: Number,
  Size: String,
  Category: String,     // Should be 'Men' or 'Women'
  Clothing: [String],   // Array of checkboxes
  Stock_Quantity: Number,
});

module.exports = mongoose.model('product', ProductSchema, 'CRUD Products ( Admin )');
