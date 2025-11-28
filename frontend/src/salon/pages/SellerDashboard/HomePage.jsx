import React, { useEffect, useState } from "react";

import ReportCard from "./Report/ReportCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"; // Removed SelectChangeEvent
import EarningCharts from "./Chart/EarningCharts";
import BookingCharts from "./Chart/BookingChart";
import { useSelector } from "react-redux";

const Chart = [
  { name: "Today", value: "today" },
  { name: "Last 7 days", value: "daily" },
  { name: "Last 12 Month", value: "monthly" },
];

const HomePage = () => {
  const [chartType, setChartType] = useState(Chart[0].value); // useState from React
  const booking = useSelector((store) => store.booking);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setChartType(event.target.value); // event.target.value works fine in JS
  };

  return (
    <div className="space-y-5">
      <div className="lg:flex gap-5">
        <div className="space-y-10 rounded-md w-full lg:w-[70%]">
          <div className="border rounded-lg p-5 w-full">
            <h1 className="text-lg font-bold pb-5 text-[#067c06]">
              Total Revenue
            </h1>
            <EarningCharts />
          </div>
        </div>

        <section className="space-y-5 w-full lg:w-[30%]">
          <ReportCard
            icon={<AccountBalanceIcon />}
            value={"₹" + (booking.report?.totalEarnings || 0)}
            title="Total Earnings"
          />

          <ReportCard
            icon={<AccountBalanceIcon />}
            value={booking.report?.totalBookings || 0}
            title="Total Bookings"
          />

          <ReportCard
            icon={<AccountBalanceIcon />}
            value={"₹" + (booking.report?.totalRefund || 0)}
            title="Total Refund"
          />

          <ReportCard
            icon={<AccountBalanceIcon />}
            value={booking.report?.cancelledBookings || 0}
            title="Cancel Bookings"
          />
        </section>
      </div>

      <div className="space-y-10 rounded-md w-full">
        <div className="border rounded-lg p-5 w-full">
          <h1 className="text-lg font-bold pb-5 text-[#067c06]">
            Booking Chart
          </h1>
          <BookingCharts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
