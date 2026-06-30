import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={"/room/" + room._id}
      onClick={() => window.scrollTo(0, 0)}
      className="relative block max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      {/* Image */}
      <img
        src={room.images[0]}
        alt={room.hotel?.name}
        className="w-full h-52 object-cover"
      />

      {/* Badge */}
      {index % 2 === 0 && (
        <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}

      {/* Content */}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel?.name}
          </p>

          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" className="w-4" />
            <p className="text-sm text-gray-700">{room.rating || "4.5"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <img src={assets.locationIcon} alt="location-icon" className="w-4" />
          <span className="text-sm">{room.hotel?.address}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm">
            <span className="text-xl text-gray-800 font-semibold">
              ₹{room.pricePerNight}
            </span>
            <span className="text-gray-500"> /night</span>
          </p>

          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
