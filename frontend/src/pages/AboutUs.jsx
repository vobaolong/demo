import React from "react";
import aboutUsImg from "../assets/aboutus.jpg";
import MetaData from "../components/layout/MetaData";
const AboutUs = () => {
  return (
    <>
      <MetaData title={`Về chúng tôi | G1Hotel`} />
      <div className="h-full flex md:flex-row sm:flex-col mt-28 m-10 bg-primaryBlue rounded-3xl py-5">
        <div class="md:w-[50%] sm:w-[100%] px-5">
          <h1 className="mplus headingStyle text-primaryBlue text-center font-semibold uppercase tracking-widest my-5 text-3xl">
            Vai trò và xứ mệnh
          </h1>
          <p class="mt-5 text-lightGray mx-10 text-justify leading-6">
            <strong>G1 Hotel</strong> là hệ thống quản lý khách sạn trực tuyến,
            tại đây khách hàng có thể đặt phòng online mà không cần đến tận quầy
            lễ tân!
            <br />
            <br />
            Là sản phẩm đầu tay cũng như là đứa con tinh thần của cả nhóm
            <br />
            <br />
            Các thành viên sáng lập:
            <ul className="list-disc pl-4">
              <li>Đoàn Phan Nguyên</li>
              <li>Võ Bảo Long</li>
            </ul>
            <br />
            Sứ mệnh của G1 Hotel là sẽ cũng cố hơn nữa về mặt kỹ thuật để có thể
            đưa hệ thống vào hoạt động chính thức
          </p>
        </div>
        <div className="md:w-[50%] sm:w-[100%] p-5 my-auto">
          <img
            src={aboutUsImg}
            alt="aboutusImg"
            className="rounded-xl w-[100%] "
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
