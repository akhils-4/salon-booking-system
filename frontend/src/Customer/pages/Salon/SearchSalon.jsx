import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSalon } from "../../../Redux/Salon/action";
import SalonList from "./SalonList";

const SearchSalon = () => {
  const { salon } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    dispatch(searchSalon({ jwt: localStorage.getItem("jwt"), city: query }));
  };

  return (
    <div className="lg:px-20 px-5 py-10 bg-gray-900 min-h-screen">
      {/* Search Input */}
      <div className="flex flex-col justify-center items-center pb-10 space-y-3">
        <input
          onChange={handleSearch}
          className="border bg-white rounded-md py-3 md:py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5 shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
          placeholder="Search salon by city..."
        />
      </div>

      {/* Salon List */}
      <div>
        {salon.searchSalons && salon.searchSalons.length > 0 ? (
          <SalonList salons={salon.searchSalons} />
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No salons found. Try another city.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchSalon;
