import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
const FeaturedDestination = () => {

    const navigate = useNavigate('/rooms')
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      
      {/* <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-800">
        Featured H
      </h2>
      <p className="text-gray-500 mt-2 text-center max-w-xl">
        Explore our top-rated stays and best-selling rooms.
      </p> */}
        
        <Title title='Featured Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'/>


      <div onClick={()=>{
                navigate('/rooms');scrollTo(0,0)
        }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
        <button onClick={()=>{
                navigate('/rooms');scrollTo(0,0)
        }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer' >
            View All Hotels
        </button>
    </div>
  );
};

export default FeaturedDestination;
