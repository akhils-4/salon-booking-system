import React from "react";
import SalonCard from "./SalonCard";

const SalonList = ({ salons }) => {
  if (!salons || salons.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No salons available at the moment.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {salons.map((item) => (
        <SalonCard key={item.id} salon={item} />
      ))}
    </div>
  );
};

export default SalonList;
