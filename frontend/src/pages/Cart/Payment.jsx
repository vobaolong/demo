import React, { useEffect, useState, useRef, Fragment } from "react";
import CheckoutSteps from "../../components/transaction/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreditCard, Event, VpnKey } from "@material-ui/icons";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { resetCart } from "../../actions/cartAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { cartItems, transactionInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const alert = useAlert();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    transactionInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    transactionPrice: orderInfo.transactionCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    payBtn.current.disable = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: transactionInfo.address,
              city: transactionInfo.city,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // creating order when payment is success
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success", { replace: true });
          dispatch(resetCart());
          setLoading(false);
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (err) {
      payBtn.current.disable = false;
      alert.error(err.response.data.message);
    }
  };

  // const paymentHandler = async () => {
  //   await dispatch(resetCart());
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <div className="h-auto py-24 px-8 md:px-0">
        <MetaData title={`Thanh toán`} />

        <CheckoutSteps activeStep={2} />
        <div className="w-full md:w-[30%] mx-auto">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => submitHandler(e)}
          >
            <p className="w-fit mx-auto text-xl font-bold py-5 border-b-2 border-secondaryDark">
              Thông tin thẻ
            </p>
            <div className="paymentInputFieldDivStyle">
              <CreditCard className="paymentInputFieldIconStyle" />
              <CardNumberElement className="paymentInputFieldStyle" />
            </div>
            <div className="paymentInputFieldDivStyle">
              <Event className="paymentInputFieldIconStyle" />
              <CardExpiryElement className="paymentInputFieldStyle" />
            </div>
            <div className="paymentInputFieldDivStyle">
              <VpnKey className="paymentInputFieldIconStyle" />
              <CardCvcElement className="paymentInputFieldStyle" />
            </div>

            <input
              // onClick={dispatch(resetCart())}
              className="slideableBtnStyles cursor-pointer"
              ref={payBtn}
              type="submit"
              disabled={loading ? true : false}
              value={loading ? `Đang xử lý...` : `Thanh toán`}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
