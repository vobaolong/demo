import React from "react";
import { CgMouse } from "react-icons/cg";
import CustomIcon from "../../Icons/CustomIcon";

const Banner = ({ jsonData }) => {
  const data = jsonData[0];

  return (
    <div className="w-[100%] h-screen flex justify-center items-center bg-primaryBlue customBanner">
      <div className="flex justify-center flex-col items-center px-8 md:px-0">
        <h1 className="mplus text-2xl font-bold text-lightGray text-center">
          Chào mừng đến với {"  "}
          <span className="text-primaryBlue">{data.companyName}</span>
        </h1>

        <p className="mplus text-4xl md:text-5xl uppercase mt-10 text-primaryBlue text-center leading-relaxed font-bold">
          TÌM PHÒNG{" "}
          <span className="text-lightGray border-b-4 border-primaryBlue">
            TUYỆT VỜI
          </span>{" "}
          Ở BÊN DƯỚI
        </p>

        {/* scroll button */}
        <a
          href="#ourroom"
          className="transition-all duration-500 animate-bounce mt-36"
        >
          <button className="py-3 px-7 bg-primaryDarkBlue  rounded-lg border-2 border-borderGlowBlue text-primaryBlue hover:bg-transparent transition-all duration-500 flex justify-center items-center gap-3">
            Đặt phòng ngay!
            <CustomIcon Icon={CgMouse} />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner;
