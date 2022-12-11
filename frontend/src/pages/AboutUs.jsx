import React from "react";
import aboutUsImg from "../assets/about.png";
const AboutUs = () => {
  return (
    <div className="">
      <div className="h-full flex md:flex-row sm:flex-col mt-28 m-10 bg-primaryBlue rounded-3xl py-5">
        <div class="md:w-[50%] sm:w-[100%] px-5">
          <h1 class="text-primaryBlue text-3xl text-center font-semibold uppercase tracking-widest my-5">
            Vai trò và sứ mệnh
          </h1>
          <p class="mt-5 text-lightGray mx-10 text-justify leading-6">
            <strong>G1 Hotel</strong> là công ty chuyên cung cấp các phòng về
            công nghệ như Laptop, PC, phụ kiện PC hàng đầu hiện nay.
            <br />
            <br />
            Là sản phẩm đầu tay cũng như là đứa con tinh thần của cả nhóm 10
            <br />
            <br />
            Các thành viên sáng lập:
            <ul className="list-disc pl-4">
              <li>Đoàn Phan Nguyên</li>
              <li>Võ Bảo Long</li>
            </ul>
            <br />
            Sứ mệnh của G1 Hotel là sẽ cũng cố hơn nữa về mặt kỹ thuật để có thể
            đưa nào hoạt động rộng rãi và chính thức
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
    </div>
  );
};

export default AboutUs;
