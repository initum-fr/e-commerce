const Order = require('../models/order');

exports.createOrder = (req, res, next) => {
  const order = new Order({
    ...req.body,
  });
  order
    .save()
    .then(() => res.status(201).json({ message: 'Order created!' }))
    .catch((error) =>
      res.status(400).json({ error, message: 'Order not created!' })
    );
};

exports.getOneOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((order) => res.status(200).json(order))
    .catch((error) =>
      res.status(404).json({ error, message: 'Order not found!' })
    );
};

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((error) =>
      res.status(400).json({ error, message: 'Orders not found!' })
    );
};

exports.editOrder = (req, res, next) => {
  Order.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Order updated!' }))
    .catch((error) =>
      res.status(400).json({ error, message: 'Order not updated!' })
    );
};

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Order deleted!' }))
    .catch((error) =>
      res.status(400).json({ error, message: 'Order not deleted!' })
    );
};
