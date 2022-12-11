import React, { useState, useEffect } from "react";
import { MdLockOpen, MdLock } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/user/Button";
import InputField from "../../components/user/InputField";
import Loader from "../../components/layout/Loader/Loader";
import MetaData from "../../components/layout/MetaData";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

const ResetPassword = () => {
  // for navigation
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const btnResetPassword = document.getElementById("btn-resetPassword");
  //btnResetPassword.disabled = true;
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
      btnResetPassword.disabled = false;
    } else {
      btnResetPassword.disabled = true;
    }
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reset mật khẩu thành công");

      navigate("/login", { replace: true });
    }
  }, [error, alert, dispatch, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen px-8 py-24 bg-slate-200 md:px-24">
          <MetaData title={`Đặt lại mật khẩu`} />
          <div className="bg-white shadow-lg w-full md:w-1/2 lg:w-1/3 h-[70vh] rounded-lg  mx-auto py-5 overflow-hidden">
            <h1 className="text-center text-xl text-slate-600 py-3 border-b-2 border-secondaryDark w-fit mx-auto">
              Đặt lại mật khẩu{" "}
            </h1>
            <form
              className="h-[80%] transition-transform duration-500 flex flex-col px-5 py-2  justify-evenly items-center "
              onSubmit={updatePasswordSubmit}
            >
              <div className="w-full mb-2">
                <div className="flex gap-5 justify-evenly flex-col h-full ">
                  <InputField
                    type="password"
                    name="password"
                    placeholder="Mật khẩu mới"
                    Icon={MdLockOpen}
                    value={password}
                    onKeyPress={(e) => checkPassword(e.target.value)}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    Icon={MdLock}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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
              <Button id="btn-resetPassword" label="Đặt lại mật khẩu" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
