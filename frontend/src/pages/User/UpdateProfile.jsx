import React, { useState, useEffect } from "react";
import { MdMailOutline, MdFace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../components/user/Button";
import InputField from "../../components/user/InputField";
import Loader from "../../components/layout/Loader/Loader";
import MetaData from "../../components/layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  // for navigation
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const alert = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật thông tin thành công");
      dispatch(loadUser());

      navigate("/account", { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, alert, dispatch, isUpdated, navigate, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen px-8 py-24 bg-slate-200 md:px-24">
          <MetaData title={`Cập nhật thông tin`} />
          <div className="bg-white shadow-lg w-full md:w-1/2 lg:w-1/3 h-[70vh] rounded-lg  mx-auto py-5 overflow-hidden">
            <h1 className="text-center text-xl text-slate-600 py-3 border-b-2 border-secondaryDark w-fit mx-auto">
              Cập nhật thông tin
            </h1>
            <form
              className="h-[80%] transition-transform duration-500 flex flex-col px-5 py-2  justify-evenly items-center "
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="w-full mb-2">
                <div className="flex gap-5 justify-evenly flex-col h-full ">
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Vui lòng nhập tên của bạn *"
                    Icon={MdFace}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <InputField
                    type="text"
                    name="email"
                    placeholder="Vui lòng nhập Email của bạn *"
                    Icon={MdMailOutline}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="flex items-center gap-5">
                    <img
                      src={avatarPreview}
                      className="w-10 h-10 rounded-full"
                      alt="avatar preview"
                    />
                    <input
                      className="avatarChoose border-2 rounded-lg w-full "
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                </div>
              </div>
              <Button label="Cập nhật" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
