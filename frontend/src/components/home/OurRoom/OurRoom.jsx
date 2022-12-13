import React from "react";
import RoomCard from "./RoomCard";

const OurRoom = ({ rooms }) => {
  return (
    <div className="w-[100%] h-auto py-14 mt-16" id="ourroom">
      <div className="">
        <h1 className="headingStyle mplus uppercase">Phòng tiêu biểu</h1>

        <div className="w-[90%] mx-auto">
          <div className="productsLayoutStyle">
            {rooms?.map((room, index) => {
              return <RoomCard key={index} room={room} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRoom;
