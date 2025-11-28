import React, { useEffect, useState, useMemo } from "react";
import { services } from "../../../data/Services";
import HomeServiceCard from "./HomeServiceCard";
import SalonList from "../Salon/SalonList";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalons } from "../../../Redux/Salon/action";

const Home = () => {
  const { salon } = useSelector((store) => store);
  const dispatch = useDispatch();

  // Mount animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    dispatch(fetchSalons());
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [dispatch]);

  // Staggered delays for the image tiles
  const delays = useMemo(() => ["0ms", "80ms", "160ms", "240ms"], []);

  return (
    <div className="flex flex-col space-y-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero/Banner Section */}
      <section>
        <Banner />
      </section>

      {/* Services + Mosaic */}
      <section className="px-6 md:px-12 xl:px-24">
        <div
          className={[
            "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center",
            "transition-all duration-700 ease-out",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {/* Left: Services */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              What are you looking for, Bestie? 👀
            </h1>
            <p className="mt-3 text-gray-600">
              Explore trending salon services near you — tailored for comfort
              and confidence.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
              {services.map((item) => (
                <HomeServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right: Image Grid with aspect ratios + hover + load-in */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                src: "https://images.pexels.com/photos/3998415/pexels-photo-3998415.jpeg?auto=compress&cs=tinysrgb&w=800",
                alt: "Hair stylist working with client in salon",
                aspect: "aspect-[4/5] md:aspect-[5/6]",
              },
              {
                src: "https://images.pexels.com/photos/3331488/pexels-photo-3331488.jpeg?auto=compress&cs=tinysrgb&w=800",
                alt: "Beauty treatment setup on a tray",
                aspect: "aspect-[3/4] md:aspect-[4/5]",
              },
              {
                src: "https://images.pexels.com/photos/5069455/pexels-photo-5069455.jpeg?auto=compress&cs=tinysrgb&w=1200",
                alt: "Modern salon interior with natural light",
                aspect: "aspect-[4/5] md:aspect-[5/6]",
              },
              {
                src: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800",
                alt: "Client receiving spa treatment",
                aspect: "aspect-[3/4] md:aspect-[4/5]",
              },
            ].map((img, i) => (
              <div
                key={i}
                className={[
                  "relative overflow-hidden rounded-xl group",
                  img.aspect,
                  "transition-all duration-700 ease-out",
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3",
                ].join(" ")}
                style={{ transitionDelay: delays[i] }}
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salon List */}
      <section className="px-6 md:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pb-4">
            Book Your Favorite Salon
          </h2>
          <p className="text-gray-600 mb-8">
            Discover top-rated salons for beauty, grooming, and spa services
            near you.
          </p>

          {!salon?.salons?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <SalonList salons={salon.salons} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
