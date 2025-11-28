import React, { useEffect } from "react";
import BookingCard from "./BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerBookings } from "../../../Redux/Booking/action";

const Bookings = () => {
  const dispatch = useDispatch();
  const { booking } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchCustomerBookings(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="px-5 md:px-10 lg:px-20 mt-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold py-5 text-center md:text-left">
        My Bookings
      </h1>

      {booking.bookings && booking.bookings.length > 0 ? (
        <div className="flex flex-col items-center md:items-start space-y-4 md:w-full lg:w-[40rem]">
          {booking.bookings.map((item) => (
            <BookingCard key={item.id} booking={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          You have no bookings yet.
        </p>
      )}
    </div>
  );
};

export default Bookings;
