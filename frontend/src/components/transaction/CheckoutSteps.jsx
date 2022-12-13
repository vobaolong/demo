import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import {
  PaymentOutlined,
  LibraryAddCheck,
  PermDeviceInformationRounded,
} from "@material-ui/icons";
import React from "react";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin người đặt</Typography>,
      icon: <PermDeviceInformationRounded />,
    },
    {
      label: <Typography>Xác nhận đơn đặt phòng</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <PaymentOutlined />,
    },
  ];

  const stepStyle = {
    boxSizing: "bordre-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "#0e8f99" : "raba(0,0,0,0.648)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
