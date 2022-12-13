import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getRoom } from "../../actions/roomAction";
import Loader from "../../components/layout/Loader/Loader";
import RoomCard from "../../components/home/OurRoom/RoomCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { AiOutlineFrown } from "react-icons/ai";
import FilterSlide from "../../components/Rooms/FilterSlide";
import MetaData from "../../components/layout/MetaData";

const categories = [
  "Phòng Standard (STD)",
  "Phòng Superior (SUP)",
  "Phòng Deluxe (DLX)",
  "Phòng Suite (SUT)",
  "Connecting Room",
];

const Rooms = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const { loading, error, rooms, roomsCount, resultPerPage } = useSelector(
    (state) => state.rooms
  );

  const [price, setPrice] = useState([0, 5000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRoom(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Phòng | G1Hotel`} />
          <div className="h-auto w-[100%] py-24 md:px-10 ">
            <h1 className="headingStyle mplus uppercase">Phòng</h1>

            <div className="flex flex-row-reverse justify-center">
              <div className="productsLayoutStyle">
                {rooms?.length > 0 ? (
                  rooms?.map((room, index) => {
                    return <RoomCard key={index} room={room} />;
                  })
                ) : (
                  <h1 className="items-center text-center text-xl flex uppercase text-red-600">
                    Không tìm thấy phòng <AiOutlineFrown className="mx-1" />!
                  </h1>
                )}
              </div>
              <FilterSlide
                price={price}
                priceHandler={priceHandler}
                categories={categories}
                setCategory={setCategory}
                ratings={ratings}
                setRatings={setRatings}
              />
            </div>
          </div>
          {resultPerPage < roomsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={roomsCount}
                onChange={setCurrentPageNo}
                nextPageText=">"
                prevPageText="<"
                firstPageText="<<"
                lastPageText=">>"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Rooms;
