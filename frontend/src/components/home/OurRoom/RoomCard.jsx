import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import FormatPrice from "../../format";

const RoomCard = ({ room }) => {
  const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
    value: room.ratings,
  };

  return (
    <Link
      to={`/room/${room._id}`}
      className="flex flex-col justify-between w-80 h-[370px] m-auto rounded-lg shadow-xl bg-secColor overflow-hidden md:hover:shadow-xl transition-all duration-300 md:hover:scale-105 group decoration-transparent"
      title={`
      Tên phòng: ${room.name} \nGiá: ${FormatPrice(
        room.price
      )}/đêm \nĐánh giá: ${room.ratings} ★`}
    >
      <div className="h-fit overflow-hidden p-2 h-3/5">
        <img
          className="object-contain rounded-lg"
          src={room.images[0].url}
          alt={room.name}
        />
      </div>

      <div className="px-3 py-2 text-center bg-white h-2/5">
        <div className="w-full flex justify-center items-center flex-col pb-1">
          <Rating {...options} />
          <span className="text-gray-500">({room.numOfReviews} đánh giá)</span>
        </div>

        <p className="text-secondaryDark font-bold text-md! capitalize line-clamp-2">
          {room.name}
        </p>

        <span className="text-red-600 font-semibold bottom-1">
          {FormatPrice(room.price)}/đêm
        </span>
      </div>
    </Link>
  );
};

export default RoomCard;
