import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Button from "../../components/user/Button";
import MetaData from "../../components/layout/MetaData";
import { VerifiedUser, Person, MailOutline } from "@material-ui/icons";
import SideBar from "../../components/admin/Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import InputField from "../../components/user/InputField";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();

  const userId = params.id;

  const { error, user, loading } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
      alert.success("Cập nhật người dùng thành công");
      navigate("/admin/users");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [alert, dispatch, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title={`Cập nhật người dùng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>

        <div className="dashboardRightBoxStyle">
          <div className="mb-5">
            <p className="upper text-center text-2xl font-bold text-gray-400">
              Cập nhật vai trò người dùng
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <form
              className="w-[90%]  md:w-[50%] mx-auto shadow-lg bg-white p-10 rounded-md"
              onSubmit={updateUserSubmitHandler}
            >
              <div className="w-full mb-2">
                <div className="flex gap-5 justify-evenly flex-col h-full ">
                  <InputField
                    type="text"
                    name="username"
                    Icon={Person}
                    value={name}
                  />
                  <InputField
                    type="email"
                    name="email"
                    Icon={MailOutline}
                    value={email}
                  />
                  <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
                    <VerifiedUser className="text-xl text-white mx-2" />
                    <select
                      value={role}
                      className="px-3 py-2 outline-none border-2 w-full cursor-pointer"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option disabled value="">
                        Chọn Vai trò
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-fit mx-auto mt-5">
                <Button
                  disabled={updateLoading ? true : false}
                  label="Cập nhật vai trò"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
