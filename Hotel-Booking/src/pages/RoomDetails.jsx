import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const selectedRoom = roomsDummyData.find(
      (item) => item._id === id
    );

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images?.[0] || "");
    }
  }, [id]);

  if (!room) return null;

  return (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name}
          <span className="font-inter text-sm ml-2">
            ({room.roomType})
          </span>
        </h1>

        <span className="text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2 text-gray-600">200+ Reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel?.address}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="Room"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Room thumbnail"
              onClick={() => setMainImage(image)}
              className={`w-full h-40 rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image ? "outline outline-2 outline-orange-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Room Highlights */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 mt-12">

        {/* Amenities */}
        <div>
          <h2 className="text-3xl font-playfair mb-4">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap gap-3">
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100"
              >
                <img
                  src={facilityIcons[item] || assets.defaultIcon}
                  alt={item}
                  className="w-5 h-5"
                />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <p className="text-3xl font-semibold text-gray-800">
            ₹{room.pricePerNight}
            <span className="text-sm text-gray-500"> / night</span>
          </p>
        </div>
      </div>

      {/* Checkin checkout form */}
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">

          <div className="flex flex-col">
            <label className="font-medium">Check-In</label>
            <input type="date" className="rounded border px-3 py-2 mt-1.5 outline-none" required />
          </div>

          <div className="w-px h-10 bg-gray-300/70 max-md:hidden"></div>

          <div className="flex flex-col">
            <label className="font-medium">Check-Out</label>
            <input type="date" className="rounded border px-3 py-2 mt-1.5 outline-none" required />
          </div>

          <div className="w-px h-10 bg-gray-300/70 max-md:hidden"></div>

          <div className="flex flex-col">
            <label className="font-medium">Guests</label>
            <input type="number" className="max-w-20 rounded border px-3 py-2 mt-1.5 outline-none" required />
          </div>

        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md w-full md:w-auto max-md:mt-6 px-24 py-3 md:py-4"
        >
          Check Availability
        </button>
      </form>

      {/* Common Specification */}
      <div className="mt-24 space-y-5">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img src={spec.icon} alt={spec.title} className="w-6" />
            <div>
              <p>{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hosted by */}
      <div className="flex flex-col items-start gap-4 mt-16">
        <div className="flex gap-4 items-center">
          <img
            src={room.hotel?.owner?.image || assets.defaultAvatar}
            alt="Host"
            className="h-14 w-14 rounded-full"
          />
          <div>
            <p>Hosted by {room.hotel?.name}</p>
            <div className="flex items-center">
              <StarRating />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>

        <button className="px-6 py-2 rounded text-white bg-primary hover:bg-primary-dull">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
