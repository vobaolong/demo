import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/layout/MetaData";

const SearchRooms = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/rooms/${keyword}`);
    } else {
      navigate(`/rooms`);
    }
  };
  return (
    <>
      <div className="h-screen bg-primaryBlue z-10 flex justify-center items-center fixed top-0 left-0 right-0">
        <MetaData title={`Tìm kiếm | G1Hotel`} />
        <form className="  py-24" onSubmit={searchSubmitHandler}>
          <div className="flex  items-center px-8 md:px-20">
            <div className="w-full flex items-center shadow-lg bg-white rounded-lg shadow-cyan-500/40">
              <MdSearch className="text-2xl ml-2 text-slate-500" />
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className="py-2 md:py-3 md:w-96 px-3 w-full outline-none text-base"
                placeholder="Tên phòng ..."
              />
              <input
                className="bg-secondaryDark py-3  md:py-4 px-3 md:px-10 rounded-r-lg outline-none border-primaryBlue text-white opacity-80 hover:opacity-100 cursor-pointer transition-all duration-500"
                type="submit"
                value="Tìm kiếm"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchRooms;
