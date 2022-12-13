import React, { Fragment, useEffect } from "react";
import Banner from "../components/home/Banner/Banner";
import OurRoom from "../components/home/OurRoom/OurRoom";
import companydata from "./../data/companydata.json";
import MetaData from "./../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";

import { clearErrors, getRoom } from "../actions/roomAction";
import Loader from "../components/layout/Loader/Loader";
import { useAlert } from "react-alert";

const HomePage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, rooms } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRoom());
  }, [dispatch, error, alert]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="G1Hotel" />

          {/* banner */}
          <Banner jsonData={companydata} />

          {/* our rooms */}
          <OurRoom rooms={rooms.slice(0, 6)} />
        </Fragment>
      )}
    </div>
  );
};

export default HomePage;
