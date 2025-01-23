const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const orderModel = new mongoose.Schema({
  paymentIntentId: { type: String, required: true, unique: true },
  orderItems: [
    {
      quantity: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  shippingAddress: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentId: { type: String, required: true },
  user: {
    email: { type: String, required: true },
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

orderModel.plugin(uniqueValidator);

module.exports = mongoose.model('Order', orderModel);
