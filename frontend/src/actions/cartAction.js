import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  RESET_CART_ITEM,
  SAVE_TRANSACTION_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to cart
export const addItemsToCart =
  (id, days, startDate, endDate, totalPrice) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/room/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        room: data.room._id,
        name: data.room.name,
        price: data.room.price,
        image: data.room.images[0].url,
        stock: data.room.stock,
        days,
        startDate,
        endDate,
        totalPrice,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// remove item from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// reset cart
export const resetCart = () => async (dispatch) => {
  dispatch({ type: RESET_CART_ITEM });

  localStorage.setItem("cartItems", JSON.stringify([]));

  // localStorage.removeItem("cartItems");
};

// Save transaction info
export const saveTransactionInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_TRANSACTION_INFO,
    payload: data,
  });

  localStorage.setItem("transactionInfo", JSON.stringify(data));
};
