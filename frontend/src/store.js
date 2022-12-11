import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newRoomReducer,
  newReviewReducer,
  roomDetailsReducer,
  roomReducer,
  roomReviewsReducer,
  roomsReducer,
  reviewReducer,
} from "./reducers/roomReducer";
import {
  profileReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

// for multiple reducer
const reducer = combineReducers({
  rooms: roomsReducer,
  roomDetails: roomDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

// initialstate
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    transactionInfo: localStorage.getItem("transactionInfo")
      ? JSON.parse(localStorage.getItem("transactionInfo"))
      : {},
  },
};

// middle ware
const middleware = [thunk];

// Create a store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
