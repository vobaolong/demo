import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { MdClose, MdArrowForward } from "react-icons/md";

const FilterSlide = ({
  price,
  priceHandler,
  categories,
  setCategory,
  ratings,
  setRatings,
}) => {
  const [showIcon, setShowIcon] = useState(true);
  const [toggleFilterSlider, setToggleFilterSlider] = useState(false);

  const filterSliderHandler = () => {
    setToggleFilterSlider(true);
  };

  const showFilterBtnHandler = () => {
    setShowIcon(false);
  };

  return (
    <div>
      {!toggleFilterSlider && (
        <div
          className="cursor-pointer group rounded-r-lg z-10 text-white transition-all duration-500 bg-secondaryDark px-2 py-2 hover:px-5 left-0 fixed top-1/4"
          onClick={filterSliderHandler}
          onMouseEnter={showFilterBtnHandler}
          onMouseLeave={() => setShowIcon(true)}
        >
          {showIcon ? (
            <MdArrowForward className="text-white text-xl " />
          ) : (
            <p>Sử dụng bộ lọc</p>
          )}
        </div>
      )}
      <div
        className={`w-full h-auto lg:w-1/5 md:w-1/3 sm:w-1/2 left-0 top-1/4 shadow-xl border-r-2 py-5 rounded-r-lg px-5 z-20 transition-all fixed duration-500 bg-primaryBlue ${
          toggleFilterSlider
            ? "animate-slide-in"
            : "-left-[100%] -translate-x-96"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="py-2 w-full border-b-2 border-primaryBlue/50 text-primaryBlue">
            Bộ lọc
          </p>
          <MdClose
            onClick={() => setToggleFilterSlider(false)}
            className="text-xl cursor-pointer text-slate-500 hover:text-secondaryDark"
          />
        </div>
        <div className="pt-5">
          <p className="filterHeadingStyle">Giá phòng/đêm</p>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={5000000}
          />

          <div>
            <p className="filterHeadingStyle pt-5 pb-3 border-b-2 border-primaryBlue/50">
              Loại phòng
            </p>
            <ul>
              {categories.map((category, index) => {
                return (
                  <li
                    className="py-1 cursor-pointer text-slate-500 hover:text-neutral-300"
                    key={index}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <fieldset>
              <p className="filterHeadingStyle pt-3">Đánh giá</p>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => setRatings(newRatings)}
                arial-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSlide;
