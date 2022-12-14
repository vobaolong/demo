import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getRoomDetails,
  updateRoom,
} from "../../actions/roomAction";
import { useAlert } from "react-alert";
import Button from "../../components/user/Button";
import MetaData from "../../components/layout/MetaData";
import {
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
  Group,
  KingBed,
} from "@material-ui/icons";
import SideBar from "../../components/admin/Sidebar";
import { UPDATE_ROOM_RESET } from "../../constants/roomConstants";
import InputField from "../../components/user/InputField";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { error, room } = useSelector((state) => state.roomDetails);
  const roomId = params.id;

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.room);

  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Phòng Standard (STD)",
    "Phòng Superior (SUP)",
    "Phòng Deluxe (DLX)",
    "Phòng Suite (SUT)",
    "Connecting Room",
  ];
  const maxCountPeople = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    if (room && room._id !== roomId) {
      dispatch(getRoomDetails(roomId));
    } else {
      setRoomName(room.name);
      setPrice(room.price);
      setDescription(room.description);
      setCategory(room.category);
      setStock(room.stock);
      setOldImages(room.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật phòng thành công");
      navigate("/admin/rooms");

      dispatch({ type: UPDATE_ROOM_RESET });
    }
  }, [alert, dispatch, updateError, navigate, isUpdated, error, roomId, room]);

  const updateRoomSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", roomName);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);
    myForm.set("maxcount", maxCount);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateRoom(roomId, myForm));
  };

  const updateRoomImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={`Phòng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>

        <div className="dashboardRightBoxStyle">
          <div className="mb-5">
            <p className="uppercase mplus text-center text-2xl font-bold text-gray-400">
              cập nhật phòng
            </p>
          </div>

          <form
            className="w-[90%]  md:w-[50%] mx-auto shadow-lg bg-white p-10 rounded-md"
            encType="multipart/form-data"
            onSubmit={updateRoomSubmitHandler}
          >
            <div className="w-full mb-2">
              <div className="flex gap-2 justify-evenly flex-col h-full ">
                <InputField
                  type="text"
                  name="roomName"
                  placeholder="Vui lòng nhập tên phòng *"
                  Icon={Spellcheck}
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <InputField
                  type="number"
                  name="price"
                  placeholder="Vui lòng nhập giá phòng *"
                  Icon={AttachMoney}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
                  <KingBed className="text-xl text-white mx-2" />
                  <select
                    value={category}
                    className="px-3 py-2 outline-none border-2 w-full"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Vui lòng chọn loại phòng *</option>
                    {categories?.map((category, index) => {
                      return (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
                  <Group className="text-xl text-white mx-2" />
                  <select
                    className="px-3 py-2 outline-none border-2 w-full"
                    onChange={(e) => setMaxCount(e.target.value)}
                  >
                    <option value="">Vui lòng chọn số khách tối đa *</option>
                    {maxCountPeople.map((maxCount, index) => {
                      return (
                        <option key={index} value={maxCount}>
                          {maxCount}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <InputField
                  type="number"
                  name="stock"
                  placeholder="Vui lòng nhập số lượng phòng *"
                  Icon={Storage}
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  min={0}
                />
                <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
                  <Description className="text-xl text-white mx-2" />

                  <textarea
                    className="px-3 py-2 outline-none border-2 w-full"
                    placeholder="Vui lòng nhập mô tả phòng *"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div className="w-full flex items-center gap-5">
                  <input
                    className="avatarChoose w-full border-2 rounded-lg "
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={updateRoomImagesChange}
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-400 mt-5">
                    Hình ảnh trước đó
                  </p>
                </div>
                <div className="w-full flex justify-center items-center my-5 gap-5 overflow-auto ">
                  {oldImages?.map((image, index) => (
                    <img
                      key={index}
                      className="shadow-lg w-[10vmax] h-[10vmax] tall:w-[5vmax] tall:h-[5vmax]"
                      src={image.url}
                      alt="Room Preview"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="font-medium text-gray-400 mt-5">
                    Cập nhật hình ảnh
                  </p>
                </div>
                <div className="w-full flex justify-center items-center my-5 gap-5 overflow-auto ">
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      className="shadow-lg w-[10vmax] h-[10vmax] tall:w-[5vmax] tall:h-[5vmax]"
                      src={image}
                      alt="Room Preview"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-fit mx-auto">
              <Button disabled={loading ? true : false} label="Cập nhật" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateRoom;
