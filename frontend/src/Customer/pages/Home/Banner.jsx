import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="relative w-full h-[82vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

      {/* Content */}
      <div
        className={[
          "relative z-20 flex flex-col items-center text-center px-5",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-md">
          Be Yourself
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-2xl font-medium text-gray-200">
          Discover and book beauty & wellness near you
        </p>

        {/* Click-to-search bar */}
        <div className="mt-8 w-[92%] sm:w-[28rem]">
          <div
            role="button"
            aria-label="Open search"
            onClick={() => navigate("/search")}
            className="group flex items-center gap-3 w-full rounded-xl px-5 py-4 cursor-pointer
                       bg-white/90 backdrop-blur-md shadow-md ring-1 ring-white/30
                       hover:shadow-xl hover:ring-white/60 transition-all duration-300 ease-out"
          >
            <svg
              className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300 ease-out"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-gray-700 group-hover:text-gray-900 select-none">
              Search salons by city...
            </span>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 via-transparent to-transparent z-20" />
    </div>
  );
};

export default Banner;
