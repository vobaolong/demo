import React from "react";

const PaymentInputField = ({ Icon, InputField }) => {
  return (
    <div className="bg-primaryBlue rounded-lg  w-full flex justify-start items-center">
      <Icon className="text-xl text-white mx-2" />
      <InputField className="bg-white  px-3 py-2 outline-none border-2 w-full" />
    </div>
  );
};

export default PaymentInputField;
