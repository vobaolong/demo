import React from "react";
import { Link } from "react-router-dom";
import FormatPrice from "../format";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="w-24 md:w-full flex flex-col justify-center  md:justify-start md:flex-row gap-6 py-3 h-auto items-start box-border">
      <img
        className="w-[12vmax] md:w-[6vmax]"
        src={item.image}
        alt="cartitem"
      />
      <div className="flex flex-col mx-[0.3vmax] my-[1vmax]">
        <Link className="font-medium capitalize" to={`/room/${item.room}`}>
          {item.name}
        </Link>
        <span className="text-slate-600">{`Giá phòng: ${FormatPrice(
          item.price
        )}/đêm`}</span>
        <p
          onClick={() => deleteCartItems(item.room)}
          className="bg-red-300 w-[150px] hover:bg-red-400 hover:shadow-lg transition-all duration-500 text-white cursor-pointer py-[0.1em] rounded-md text-center mt-2"
        >
          Xoá
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
