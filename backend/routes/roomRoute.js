const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getAdminRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomDetails,
  createRoomReview,
  getRoomReviews,
  deleteReview,
} = require("../controllers/roomController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/rooms").get(getAllRooms);
router
  .route("/admin/rooms")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminRooms);

router
  .route("/admin/room/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createRoom);

router
  .route("/admin/room/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateRoom)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteRoom);

router.route("/room/:id").get(getRoomDetails);
router.route("/review").put(isAuthenticatedUser, createRoomReview);
router
  .route("/reviews")
  .get(getRoomReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
