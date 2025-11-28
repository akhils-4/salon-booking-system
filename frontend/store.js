// store.js
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./Booking/reducer";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    // add other reducers here
  },
});
