import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  RESET_CART_ITEM,
  SAVE_TRANSACTION_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], transactionInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.room === item.room);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => {
            return i.room === isItemExist.room ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.room !== action.payload),
      };

    case RESET_CART_ITEM:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_TRANSACTION_INFO:
      return {
        ...state,
        transactionInfo: action.payload,
      };
    default:
      return state;
  }
};
