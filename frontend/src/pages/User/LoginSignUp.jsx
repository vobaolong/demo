import React, { useState, useRef, useEffect } from "react";
import { MdMailOutline, MdLockOpen, MdPerson } from "react-icons/md";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/user/Button";
import InputField from "../../components/user/InputField";
import Loader from "../../components/layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import preAvt from "../../assets/profile.png";
const LoginSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [show, setShow] = useState(false);

  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState(preAvt);

  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const path = user?.role === "admin" ? "/admin/dashboard" : "/account";
  const redirect = location.search ? location.search.split("=")[1] : path;

  const handleShowHide = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [error, alert, dispatch, redirect, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", registerName);
    myForm.set("email", registerEmail);
    myForm.set("password", registerPassword);
    myForm.set("avatar", avatar);

    if (registerPassword !== cpassword) {
      alert.error("Password doesn't match");
    } else {
      dispatch(register(myForm));
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const lowerCase = document.getElementById("lower");
  const upperCase = document.getElementById("upper");
  const digit = document.getElementById("number");
  const specialChar = document.getElementById("special");
  const minLength = document.getElementById("length");

  const iconNotCheckLower = document.getElementById("iconNotCheckLower");
  const iconNotCheckUpper = document.getElementById("iconNotCheckUpper");
  const iconNotCheckNumber = document.getElementById("iconNotCheckNumber");
  const iconNotCheckSpecial = document.getElementById("iconNotCheckSpecial");
  const iconNotCheckLength = document.getElementById("iconNotCheckLength");

  const iconCheckLower = document.getElementById("iconCheckLower");
  const iconCheckUpper = document.getElementById("iconCheckUpper");
  const iconCheckNumber = document.getElementById("iconCheckNumber");
  const iconCheckSpecial = document.getElementById("iconCheckSpecial");
  const iconCheckLength = document.getElementById("iconCheckLength");
  const btnSignUp = document.getElementById("btn-signup");

  const checkPassword = (data) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");
    //Lower Case validation check
    if (lower.test(data)) {
      lowerCase.classList.add("text-zinc-400");
      iconNotCheckLower.classList.remove("inline");
      iconNotCheckLower.classList.add("hidden");
      iconCheckLower.classList.remove("hidden");
      iconCheckLower.classList.add("inline");
    } else {
      lowerCase.classList.remove("text-zinc-400");
      iconNotCheckLower.classList.add("inline");
      iconNotCheckLower.classList.remove("hidden");
      iconCheckLower.classList.add("hidden");
      iconCheckLower.classList.remove("inline");
    }

    if (upper.test(data)) {
      upperCase.classList.add("text-zinc-400");
      iconNotCheckUpper.classList.remove("inline");
      iconNotCheckUpper.classList.add("hidden");
      iconCheckUpper.classList.remove("hidden");
      iconCheckUpper.classList.add("inline");
    } else {
      upperCase.classList.remove("text-zinc-400");
      iconNotCheckUpper.classList.add("inline");
      iconNotCheckUpper.classList.remove("hidden");
      iconCheckUpper.classList.add("hidden");
      iconCheckUpper.classList.remove("inline");
    }

    if (number.test(data)) {
      digit.classList.add("text-zinc-400");
      iconNotCheckNumber.classList.remove("inline");
      iconNotCheckNumber.classList.add("hidden");
      iconCheckNumber.classList.remove("hidden");
      iconCheckNumber.classList.add("inline");
    } else {
      digit.classList.remove("text-zinc-400");
      iconNotCheckNumber.classList.add("inline");
      iconNotCheckNumber.classList.remove("hidden");
      iconCheckNumber.classList.add("hidden");
      iconCheckNumber.classList.remove("inline");
    }

    if (special.test(data)) {
      specialChar.classList.add("text-zinc-400");
      iconNotCheckSpecial.classList.remove("inline");
      iconNotCheckSpecial.classList.add("hidden");
      iconCheckSpecial.classList.remove("hidden");
      iconCheckSpecial.classList.add("inline");
    } else {
      specialChar.classList.remove("text-zinc-400");
      iconNotCheckSpecial.classList.add("inline");
      iconNotCheckSpecial.classList.remove("hidden");
      iconCheckSpecial.classList.add("hidden");
      iconCheckSpecial.classList.remove("inline");
    }

    if (length.test(data)) {
      minLength.classList.add("text-zinc-400");
      iconNotCheckLength.classList.remove("inline");
      iconNotCheckLength.classList.add("hidden");
      iconCheckLength.classList.remove("hidden");
      iconCheckLength.classList.add("inline");
    } else {
      minLength.classList.remove("text-zinc-400");
      iconNotCheckLength.classList.add("inline");
      iconNotCheckLength.classList.remove("hidden");
      iconCheckLength.classList.add("hidden");
      iconCheckLength.classList.remove("inline");
    }

    if (
      lower.test(data) &&
      upper.test(data) &&
      number.test(data) &&
      special.test(data) &&
      length.test(data)
    ) {
      btnSignUp.disabled = false;
    } else {
      btnSignUp.disabled = true;
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" px-8 py-24 bg-slate-200 md:px-24">
          <div className="bg-white shadow-lg w-full lg:w-1/3 md:w-2/3 h-[90vh] rounded-lg mx-auto py-5 overflow-hidden">
            <div>
              <div className="flex justify-evenly">
                <p
                  className="grid place-items-center cursor-pointer hover:text-secondaryDark"
                  onClick={(e) => switchTabs(e, "login")}
                >
                  Đăng nhập
                </p>
                <p
                  className="grid place-items-center cursor-pointer hover:text-secondaryDark"
                  onClick={(e) => switchTabs(e, "register")}
                >
                  Đăng ký
                </p>
              </div>
              <button
                className="h-[3px] bg-primaryBlue w-1/2 transition-all duration-500"
                ref={switcherTab}
              ></button>
            </div>

            {/* Login form */}
            <form
              className="flex flex-col justify-evenly items-center h-[80%] transition-transform duration-500 "
              ref={loginTab}
              onSubmit={loginSubmit}
            >
              <div className="flex justify-evenly flex-col w-full h-[40%] px-3">
                <InputField
                  type="text"
                  name="email"
                  placeholder="Vui lòng nhập Email của bạn *"
                  Icon={MdMailOutline}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <div className="flex">
                  <InputField
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Vui lòng nhập mật khẩu *"
                    Icon={MdLockOpen}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {show ? (
                    <AiFillEye
                      id="show_hide"
                      className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                      onClick={handleShowHide}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      id="show_hide"
                      className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                      onClick={handleShowHide}
                    />
                  )}
                </div>
              </div>

              <Link
                to="/password/forgot"
                className="text-secondaryDark hover:text-primaryBlue transition-all duration-500"
              >
                Quên mật khẩu
              </Link>
              <Button label="Đăng nhập" />
            </form>

            {/* Register form */}
            <form
              className="signUpForm h-[70%] transition-transform duration-500 flex flex-col px-5 py-2  justify-evenly items-center "
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="w-full mb-2">
                <div className="flex gap-2 justify-evenly flex-col h-full ">
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Vui lòng nhập tên *"
                    Icon={MdPerson}
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />

                  <InputField
                    type="email"
                    name="email"
                    placeholder="Vui lòng nhập Email của bạn *"
                    Icon={MdMailOutline}
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <div className="flex">
                    <InputField
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Vui lòng nhập mật khẩu *"
                      Icon={MdLockOpen}
                      value={registerPassword}
                      onKeyPress={(e) => checkPassword(e.target.value)}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    {show ? (
                      <AiFillEye
                        id="show_hide"
                        className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                        onClick={handleShowHide}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        id="show_hide"
                        className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                        onClick={handleShowHide}
                      />
                    )}
                  </div>
                  <div className="flex">
                    <InputField
                      type={show ? "text" : "password"}
                      name="cpassword"
                      placeholder="Xác nhận lại mật khẩu *"
                      Icon={MdLockOpen}
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                    {show ? (
                      <AiFillEye
                        id="show_hide"
                        className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                        onClick={handleShowHide}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        id="show_hide"
                        className="cursor-pointer justify-center mt-3 -ml-8 text-xl"
                        onClick={handleShowHide}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <img
                      src={avatarPreview}
                      className="w-10 h-10 rounded-full"
                      alt="ảnh đại diện"
                    />
                    <input
                      className="avatarChoose border-2 rounded-lg "
                      type="file"
                      name="avatar"
                      accept="image/*"
                      placeholder="chọn ảnh"
                      onChange={registerDataChange}
                      required
                    />
                  </div>
                  <div className="bg-primaryBlue mt-2 p-5 rounded-xl text-sm">
                    <ul className="flex flex-col gap-2 text-white">
                      <li id="lower" className="ease-in-out">
                        <AiOutlineCloseCircle
                          id="iconNotCheckLower"
                          className="inline mr-1 text-red-500"
                        />
                        <AiOutlineCheckCircle
                          id="iconCheckLower"
                          className="hidden text-green-600 mr-1"
                        />
                        Ít nhất có một ký tự viết thường
                      </li>
                      <li id="upper" className="ease-in-out">
                        <AiOutlineCloseCircle
                          id="iconNotCheckUpper"
                          className="inline mr-1 text-red-500"
                        />
                        <AiOutlineCheckCircle
                          id="iconCheckUpper"
                          className="hidden text-green-600 mr-1"
                        />
                        Ít nhất có một ký tự viết hoa
                      </li>
                      <li id="number" className="ease-in-out">
                        <AiOutlineCloseCircle
                          id="iconNotCheckNumber"
                          className="inline mr-1 text-red-500"
                        />
                        <AiOutlineCheckCircle
                          id="iconCheckNumber"
                          className="hidden text-green-600 mr-1"
                        />
                        Ít nhất có một ký tự số
                      </li>
                      <li id="special" className="ease-in-out">
                        <AiOutlineCloseCircle
                          id="iconNotCheckSpecial"
                          className="inline mr-1 text-red-500"
                        />
                        <AiOutlineCheckCircle
                          id="iconCheckSpecial"
                          className="hidden text-green-600 mr-1"
                        />
                        Ít nhất có một ký tự đặc biệt
                      </li>
                      <li id="length" className="ease-in-out">
                        <AiOutlineCloseCircle
                          id="iconNotCheckLength"
                          className="inline mr-1 text-red-500"
                        />
                        <AiOutlineCheckCircle
                          id="iconCheckLength"
                          className="hidden text-green-600 mr-1"
                        />
                        Độ dài ngắn nhất là 8 ký tự
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Button id="btn-signup" label="Đăng ký" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
