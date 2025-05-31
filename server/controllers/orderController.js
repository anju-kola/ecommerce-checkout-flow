
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    const outcome = req.body.outcome;
    if (outcome === "1") {
      await sendEmail(order.email, "Order Confirmed", "Your order has been confirmed.", "approved", order);
    } else if (outcome === "2") {
      await sendEmail(order.email, "Order Declined", "Your payment was declined.", "declined", order);
    } else {
      await sendEmail(order.email, "Gateway Error", "There was an error processing your order.", "error", order);
    }

    res.status(201).json({ orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: "Order not found" });
  }
};
