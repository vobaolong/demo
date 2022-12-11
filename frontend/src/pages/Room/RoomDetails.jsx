import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getRoomDetails,
  newReview,
} from "../../actions/roomAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import ReviewCard from "../../components/home/ReviewCard/ReviewCard";
import MetaData from "../../components/layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import Loader from "../../components/layout/Loader/Loader";
import QuantityCardInput from "../../components/Cart/QuantityCardInput";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/roomConstants";
import MgSlider from "../../components/Rooms/MgSlider";

const RoomDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // getting id from the url
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { room, loading, error } = useSelector((state) => state.roomDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);

  const options = {
    size: "large",
    value: room.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đánh giá thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getRoomDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const increaseQuantity = () => {
    if (room.stock <= quantity) return;

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Thêm vào danh sách thành công");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("roomId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full py-24 px-8 sm:15 md:px-24 flex flex-col md:flex-row justify-center bg-secColor">
          <MetaData title={`${room.name} | G1Hotel`} />
          <div className="w-full flex justify-center md:w-1/2 md:p-10 overflow-hidden ">
            <MgSlider
              width="400px"
              height="400px"
              slides={room.images && room.images}
            />
          </div>

          <div className="md:p-10 md:w-1/2 ">
            <div>
              <h2 className="text-primaryDarkBlue font-bold text-xl text-center mt-5 md:mt-0 md:text-left capitalize">
                {room.name}
              </h2>
              {/* <p className="text-slate-400 font-light text-xm text-center md:text-left">
                Room # {room._id}
              </p> */}
            </div>

            <div
              className="flex gap-3 my-5
            justify-center md:justify-start items-center border-t-2 border-b-2 py-3 border-slate-300"
            >
              <Rating {...options} />
              <span className="text-slate-500">
                ({room.numOfReviews} Đánh giá)
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-primaryDarkBlue text-center md:text-left">{`$${room.price}/đêm`}</h1>

              <div className="flex gap-5 my-5 flex-col md:flex-row justify-center md:justify-start">
                Chọn số đêm
                <QuantityCardInput
                  quantity={quantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
                <span>
                  Ngày nhận phòng
                  <input type="date" id="date" />
                </span>
                <button
                  disabled={room.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                  className="commonBtnStyle mx-auto md:mx-0 py-2 px-5 w-full sm:w-1/2 md:w-[170px] bg-primaryBlue"
                >
                  Thêm vào danh sách
                </button>
                <button></button>
              </div>

              <p className="border-t-2 border-b-2 py-3 border-slate-300 text-slate-600 font-semibold text-center md:text-left">
                Trạng thái:{" "}
                <b
                  className={`${
                    room.stock < 1 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {room.stock < 1 ? "Hết phòng" : `Còn ${room.stock} phòng`}
                </b>
              </p>
            </div>
            <div className="py-5 font-semibold text-center md:text-left">
              Mô tả:
              <p className="font-normal text-slate-500 text-sm text-justify">
                {room.description}
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={submitReviewToggle}
                className="commonBtnStyle w-full sm:w-1/2 md:w-[190px] py-2 px-10 bg-secondaryDark hover:scale-105 outline-none"
              >
                Thêm đánh giá
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-5">
        <h1 className="headingStyle uppercase">
          <div className="headingStylesDiv" />
          Đánh giá
        </h1>

        <Dialog
          aria-label="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Thêm đánh giá</DialogTitle>
          <DialogContent>
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
              name="hover-feedback"
            />
            <textarea
              className="w-full border-2 p-1 rounded-lg max-h-max"
              cols="30"
              placeholder="Thêm đánh giá"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Hủy
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Gửi
            </Button>
          </DialogActions>
        </Dialog>

        {room.reviews && room.reviews[0] ? (
          <div className="flex gap-5 px-10 my-10 no-scrollbar overflow-x-auto">
            {room.reviews &&
              room.reviews.map((review, id) => {
                return <ReviewCard key={id} review={review} />;
              })}
          </div>
        ) : (
          <p className="text-center py-24 text-2xl text-slate-400">
            Chưa có đánh giá
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default RoomDetails;
