import React, { useState } from "react";
import profilePng from "../../../assets/profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const [isShowing, setIsShowing] = useState(false);

  const showAllCommentText = () => {
    setIsShowing(!isShowing);
  };

  const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
    value: review.rating,
  };
  return (
    <div
      className="flex-none flex flex-col items-center border-2 border-primaryBlue w-60 md:w-96 py-10 px-5 rounded-xl shadow-lg group transition-all duration-500"
      onClick={showAllCommentText}
      onMouseLeave={() => setIsShowing(false)}
    >
      <div className="flex flex-col md:flex-row gap-3 items-center mb-3">
        <img
          className="w-1/3 md:w-1/5 shadow-lg border-2 border-primaryBlue rounded-full"
          src={profilePng}
          alt="User"
        />
        <div>
          <p className="text-secondaryDark tracking-wide font-medium text-base antialiased">
            {review.name}
          </p>
          <Rating {...options} />
        </div>
      </div>
      <div className="w-full">
        <p
          className={`text-black/50 text-justify line-clamp-2 ${
            isShowing ? "group-hover:line-clamp-none" : ""
          } group-hover:cursor-pointer transition-all duration-500`}
        >
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
