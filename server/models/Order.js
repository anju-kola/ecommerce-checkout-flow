
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  product: Object,
  variant: String,
  quantity: Number,
  outcome: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
