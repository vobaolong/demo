import React from "react";

const QuantityCardInput = ({
  decreaseQuantity,
  increaseQuantity,
  quantity,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center md:justify-start">
        <button onClick={decreaseQuantity} className="quantityBtn rounded-l-md">
          -
        </button>
        <input
          readOnly
          className="w-6 md:w-10 text-center p-1 outline-none"
          value={quantity}
          type="number"
        />
        <button onClick={increaseQuantity} className="quantityBtn rounded-r-md">
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityCardInput;
