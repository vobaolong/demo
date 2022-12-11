import React from "react";

const InputField = ({
  Icon,
  placeholder,
  value,
  type,
  name,
  onKeyPress,
  onChange,
}) => {
  return (
    <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
      <Icon className="text-xl text-white mx-2" />
      <input
        className="px-3 py-2 outline-none border-2 w-full after:content-['*'] after:ml-0.5 after:text-red-500"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyPress}
        required
      />
    </div>
  );
};

export default InputField;
