import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

// ✅ FIXED: Proper CheckBox component with state handling
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input 
        type="checkbox" 
        checked={selected} 
        onChange={(e) => onChange(e.target.checked, label)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

// ✅ FIXED: Proper RadioButton component with state handling
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input 
        type="radio" 
        name="sortOption" 
        checked={selected} 
        onChange={() => onChange(label)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  // ✅ FIXED: Filter states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Price Low to High");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  // Data fallback
  const rooms = roomsDummyData || [];

  // Filter handlers
  const handleRoomTypeChange = (checked, roomType) => {
    if (checked) {
      setSelectedRoomTypes([...selectedRoomTypes, roomType]);
    } else {
      setSelectedRoomTypes(selectedRoomTypes.filter(type => type !== roomType));
    }
  };

  const handlePriceRangeChange = (checked, priceRange) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, priceRange]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter(range => range !== priceRange));
    }
  };

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
  };

  // Simple StarRating
  const StarRating = () => (
    <span className="text-yellow-400 text-xl">★★★★☆</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="font-playfair text-4xl md:text-[40px] text-gray-800">
            Hotel Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-[700px] mx-auto lg:mx-0">
            Take advantage of our limited-time offers and special packages
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Rooms List */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            {rooms.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">No Rooms Available</h2>
                <p className="text-gray-400">Check back later for amazing hotel deals!</p>
              </div>
            ) : (
              rooms.map((room, index) => (
                <div key={room._id || index} className="flex flex-col md:flex-row gap-6 mb-10 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  {/* Image */}
                  <div className="md:w-1/2">
                    <img
                      onClick={() => navigate(`/rooms/${room._id}`)}
                      src={room.images?.[0] || "https://via.placeholder.com/500x300/eee/666?text=No+Image"}
                      alt="hotel room"
                      className="w-full h-64 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 flex flex-col gap-4">
                    <p className="text-gray-500 text-sm uppercase tracking-wide">
                      {room.hotel?.city || "Unknown City"}
                    </p>

                    <h2
                      onClick={() => navigate(`/rooms/${room._id}`)}
                      className="text-3xl font-playfair font-bold text-gray-800 cursor-pointer hover:text-black transition-colors"
                    >
                      {room.hotel?.name || "Unnamed Hotel"}
                    </h2>

                    <div className="flex items-center gap-2">
                      <StarRating />
                      <span className="text-gray-600 text-sm">200+ reviews</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                      <span>{room.hotel?.address || "Address not available"}</span>
                    </div>

                    <p className="mt-auto text-2xl font-bold text-indigo-600">
                      ₹{room.pricePerNight?.toLocaleString() || 0} / night
                    </p>
                  </div>

                  {/* ✅ FIXED: Safe amenities rendering */}
                  {room.amenities && Array.isArray(room.amenities) && room.amenities.length > 0 && (
                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-2 w-full md:w-auto md:ml-auto">
                      {room.amenities.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                          <img 
                            src={facilityIcons[item] || "https://via.placeholder.com/20x20/ccc/666?text=?"}
                            alt={item} 
                            className="w-5 h-5"
                          />
                          <p className="text-xs font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* ✅ FIXED: Filters Sidebar */}
          <div className="lg:w-1/4 order-1 lg:order-2 w-full lg:w-80 bg-white border border-gray-200 rounded-2xl shadow-lg max-lg:mb-8 lg:sticky lg:top-32 h-fit">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <p className="text-lg font-semibold text-gray-800">FILTERS</p>
              <div className="flex items-center gap-4">
                <span 
                  onClick={() => setOpenFilters(!openFilters)} 
                  className="text-sm font-medium text-blue-600 cursor-pointer lg:hidden"
                >
                  {openFilters ? 'HIDE' : 'SHOW'}
                </span>
                <button 
                  onClick={() => {
                    setSelectedRoomTypes([]);
                    setSelectedPriceRanges([]);
                    setSelectedSortOption("Price Low to High");
                  }}
                  className="hidden lg:block text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  CLEAR ALL
                </button>
              </div>
            </div>

            <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-500`}>
              {/* Room Types */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <p className="font-semibold text-gray-800 mb-4">Room Types</p>
                {roomTypes.map((room, index) => (
                  <CheckBox 
                    key={index} 
                    label={room}
                    selected={selectedRoomTypes.includes(room)}
                    onChange={handleRoomTypeChange}
                  />
                ))}
              </div>

              {/* Price Range */}
              <div className="px-6 pt-4 pb-4 border-b border-gray-100">
                <p className="font-semibold text-gray-800 mb-4">Price Range</p>
                {priceRanges.map((range, index) => (
                  <CheckBox 
                    key={index} 
                    label={`₹ ${range}`}
                    selected={selectedPriceRanges.includes(range)}
                    onChange={handlePriceRangeChange}
                  />
                ))}
              </div>

              {/* Sort Options */}
              <div className="px-6 pt-4 pb-6">
                <p className="font-semibold text-gray-800 mb-4">Sort By</p>
                {sortOptions.map((option, index) => (
                  <RadioButton 
                    key={index} 
                    label={option}
                    selected={selectedSortOption === option}
                    onChange={handleSortChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
