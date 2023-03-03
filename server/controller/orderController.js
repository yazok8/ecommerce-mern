import Order from '../models/orderModel.js'

// Create new order private route GET /api/orders
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
}

// Get order by Id private route GET /api/orders/:id
const getOrderById = async (req, res) => {

  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) res.json(order)
    
  } catch (error) {
    res.status(404).json({messae:'Order not found'})
  }
}

// Update order by Id to be paid, private route GET /api/orders/:id/pay
const updateOrderToBePaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    }  
  } catch (error) {
    res.status(404).json({messae:'Order not found'})
  }
}

// Update order by Id to be delivered, private Admin route GET /api/orders/:id/delivered
const updateOrderToBeDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  }
    
  } catch (error) {
   res.status(404).json({error}) 
  }
}

// Get user logged in orders, private route GET /api/orders/myorders

const getMyOrders = async (req, res) => { 
  try {
    const orders = await Order.find({ user: req.user._id })

    res.json(orders)
    
  } catch (error) {
    res.status(500).json({ err })
    
  }

}

// Get All logged in orders, Private route GET /api/orders
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.json(orders)
}

export {
  createOrder,
  getOrderById,
  updateOrderToBePaid,
  updateOrderToBeDelivered,
  getMyOrders,
  getOrders,
}
