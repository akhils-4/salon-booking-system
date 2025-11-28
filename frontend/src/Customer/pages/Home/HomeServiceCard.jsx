import React from "react";

const HomeServiceCard = ({ item, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full rounded-2xl bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-md ring-1 ring-gray-200
                 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-gray-400 transition-all duration-300
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/30"
      aria-label={item?.name || "Service"}
    >
      <div className="mx-auto flex flex-col items-center gap-3">
        {/* Avatar */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-white/70 shadow">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 rounded-full bg-gray-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Label */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors">
          {item.name}
        </h3>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200
                      opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"
      />
    </button>
  );
};

export default HomeServiceCard;
