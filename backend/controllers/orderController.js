const Order = require("../models/orderModel");
const Room = require("../models/roomModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    transactionInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    transactionInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(
        "Không tìm thấy đơn đặt phòng với mã đơn đặt phòng này!",
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// nhận đơn đặt phòng của người dùng đã đăng nhập bằng id
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all order -- admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status -- admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(
        "Không tìm thấy đơn đặt phòng với mã đơn đặt phòng này!",
        404
      )
    );
  }

  if (order.orderStatus === "Confirm") {
    return next(new ErrorHandler("Đơn đặt phòng đã được xác nhận", 400));
  }

  if (req.body.status === "Confirm") {
    order.orderItems.forEach(async (order_) => {
      await updateStock(order_.room);
    });
  }

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id) {
  const room = await Room.findById(id);

  room.stock--;
  await room.save({ validateBeforeSave: false });
}

// delete order -- admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(
        "Không tìm thấy đơn đặt phòng với mã đơn đặt phòng này!",
        404
      )
    );
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Xoá đơn đặt phòng thành cống",
  });
});
