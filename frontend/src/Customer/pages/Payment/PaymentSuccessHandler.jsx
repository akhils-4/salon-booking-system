import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentScuccess } from "../../../Redux/Payment/action";
import { motion } from "framer-motion";

const PaymentSuccessHandler = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getQueryParam = (key) => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  const paymentId = getQueryParam("razorpay_payment_id");
  const paymentLinkId = getQueryParam("razorpay_payment_link_id");

  useEffect(() => {
    if (paymentId) {
      dispatch(
        paymentScuccess({
          paymentId,
          paymentLinkId: paymentLinkId || "",
          jwt: localStorage.getItem("jwt") || "",
        })
      );
      // simulate loading for UI
      setTimeout(() => setLoading(false), 1000);
    }
  }, [paymentId, paymentLinkId, dispatch]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gray-900 text-gray-200 px-5">
      {loading ? (
        <Backdrop
          sx={{ color: "#ff0000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 text-gray-200 p-8 w-full sm:w-[80%] md:w-[40%] lg:w-[30%] border border-red-500 rounded-2xl h-[40vh] flex flex-col gap-6 items-center justify-center shadow-lg shadow-red-900/50"
        >
          <h1 className="text-3xl font-bold text-red-500 animate-bounce">
            🎉 Congratulations!
          </h1>
          <h2 className="text-2xl font-semibold text-gray-200 text-center">
            Your Booking Was Successful!
          </h2>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              backgroundColor: "#ff0000",
              "&:hover": { backgroundColor: "#e60000" },
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Go To Home
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentSuccessHandler;
