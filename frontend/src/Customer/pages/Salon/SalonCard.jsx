import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SalonCard = ({ salon }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/salon/${salon.id}`)}
      className="cursor-pointer"
    >
      <div className="w-56 md:w-80 rounded-md bg-slate-100 shadow-md overflow-hidden">
        <img
          className="w-full h-60 md:h-64 object-cover"
          src={
            salon.images[0] ||
            "https://images.pexels.com/photos/4625615/pexels-photo-4625615.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt={salon.name}
        />
        <div className="p-4 md:p-5 space-y-2">
          <h1 className="font-bold text-lg md:text-xl">{salon.name}</h1>

          {/* Rating */}
          <div className="inline-flex items-center bg-green-700 text-white text-sm px-2 py-1 rounded-full gap-1">
            {salon.rating || 4.5} <StarIcon sx={{ fontSize: "16px" }} />
          </div>

          {/* Short Description */}
          <p className="text-gray-700 text-sm">
            {(
              salon.description ||
              "Professional haircut and styling tailored to your preferences."
            ).substring(0, 60) + "..."}
          </p>

          {/* Address */}
          <p className="text-gray-500 text-sm">
            {salon.address}, {salon.city}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SalonCard;
