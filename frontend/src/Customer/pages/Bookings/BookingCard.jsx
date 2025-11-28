import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBookingStatus } from "../../../Redux/Booking/action";
import { motion } from "framer-motion";

const BookingCard = ({ booking }) => {
  const dispatch = useDispatch();

  const handleCancelBooking = () => {
    if (booking.status !== "CANCELLED") {
      dispatch(
        updateBookingStatus({
          bookingId: booking.id,
          status: "CANCELLED",
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-5 rounded-md bg-slate-100 md:flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Left Section */}
      <div className="space-y-3 md:flex-1">
        <h1 className="text-2xl font-bold">{booking.salon.name}</h1>

        {/* Services */}
        <ul className="list-disc list-inside text-gray-700">
          {booking.services.map((service) => (
            <li key={service.id}>{service.name}</li>
          ))}
        </ul>

        {/* Time & Date */}
        <div className="mt-2">
          <p className="font-semibold flex items-center gap-1">
            Time & Date <ArrowRightAltIcon fontSize="small" />{" "}
            {booking.startTime?.split("T")[0]}
          </p>
          <p className="text-gray-600">
            {booking.startTime?.split("T")[1]} To{" "}
            {booking.endTime?.split("T")[1]}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-2 mt-4 md:mt-0 md:ml-5 flex-shrink-0 flex flex-col items-center">
        <img
          className="h-28 w-28 object-cover rounded-md"
          src={
            booking.salon.images[0] ||
            "https://images.pexels.com/photos/4625615/pexels-photo-4625615.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt={booking.salon.name}
        />
        <p className="text-lg font-semibold">₹{booking.totalPrice}</p>
        <Button
          onClick={handleCancelBooking}
          color="error"
          fullWidth
          variant={booking.status === "CANCELLED" ? "contained" : "outlined"}
        >
          {booking.status === "CANCELLED" ? "CANCELLED" : "Cancel"}
        </Button>
      </div>
    </motion.div>
  );
};

export default BookingCard;
