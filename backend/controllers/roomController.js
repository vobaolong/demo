const Room = require("../models/roomModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create room -- by Admin
exports.createRoom = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "rooms",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    message: "posting",
    room,
  });
});

// update rooms -- Admin
exports.updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Không tìm thấy phòng", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Delete Images From Cloudinary
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "rooms",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

exports.deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Không tìm thấy phòng", 404));
  }

  // delete images from cloudinary
  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  }

  await room.remove();
  res.status(200).json({
    success: true,
    message: "Xoá phòng thành công",
  });
});

// Get Room Details
exports.getRoomDetails = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Không tìm thấy phòng!", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

// Get all rooms
exports.getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 9;
  const roomsCount = await Room.countDocuments();
  const apiFeature = new ApiFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeature.query;
  let filteredRoomsCount = rooms.length;

  apiFeature.pagination(resultPerPage);

  rooms = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    rooms,
    roomsCount,
    resultPerPage,
    filteredRoomsCount,
  });
});

// Get all rooms -- admin
exports.getAdminRooms = catchAsyncErrors(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({ success: true, rooms });
});

// tạo mới review hoặc cập nhật review
exports.createRoomReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  // calculating rating of reviews
  let avg = 0;
  room.ratings = room.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  room.ratings = avg / room.reviews.length;

  await room.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a room
exports.getRoomReviews = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Không tìm thấy phòng!", 404));
  }

  res.status(200).json({
    success: true,
    reviews: room.reviews,
  });
});

// delete reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.roomId);

  if (!room) {
    return next(new ErrorHandler("Không tìm thấy phòng!", 404));
  }

  const reviews = room.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
