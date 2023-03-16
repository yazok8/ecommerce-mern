import Order from "../models/orderModel.js";

import asyncHandler from 'express-async-handler';

// @desc  create a new order
// @route GET /api/orders
// @access PRIVATE
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    console.log("No order items founds");
  }
  else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    console.log(order);
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }

});

// @desc  get an order by id
// @route GET /api/orders/:id
// @access PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
  const reqOrder = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (reqOrder) {
    res.status(201).json(reqOrder);
  } else {
    res.status(401);
    throw new Error('Order not found');
  }
});

// Update order by Id to be paid, private route GET /api/orders/:id/pay
const updateOrderToBePaid = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
  else {
    console.log(error)
    res.status(401).json({ messae: "Order not found" });
  }
});

// Update order by Id to be delivered, private Admin route GET /api/orders/:id/delivered
const updateOrderToBeDelivered = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }

  else {
    res.status(404).json({ error });
  }
});

// Get user logged in orders, private route GET /api/orders/myorders

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort(
    '-createdAt'
  );
  res.json(orders);
});

// Get All logged in orders, Private route GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name").sort('-createdAt');;
  res.json(orders);
});

export {
  createOrder,
  getOrderById,
  updateOrderToBePaid,
  updateOrderToBeDelivered,
  getMyOrders,
  getOrders,
};
