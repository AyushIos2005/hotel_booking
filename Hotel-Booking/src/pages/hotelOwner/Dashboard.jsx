import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData] = useState(dashboardDummyData);

  return (
    <div className="px-4 md:px-10 py-6">
      {/* Page Title */}
      <Title
        align="left"
        font="font-outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg flex items-center p-4 pr-8 w-full sm:w-auto">
          <img
            src={assets.totalBookingIcon}
            alt="total-bookings"
            className="hidden sm:block h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-600 text-lg">Total Bookings</p>
            <p className="text-neutral-600 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-green-50 border border-green-200 rounded-lg flex items-center p-4 pr-8 w-full sm:w-auto">
          <img
            src={assets.totalRevenueIcon}
            alt="total-revenue"
            className="hidden sm:block h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-green-600 text-lg">Total Revenue</p>
            <p className="text-neutral-600 text-base">
              ₹{dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-4">
        Recent Bookings
      </h2>

      <div className="w-full max-w-4xl border border-gray-300 rounded-lg overflow-hidden">
      
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 font-medium text-gray-800">
                  User Name
                </th>
                <th className="py-3 px-4 font-medium text-gray-800 max-sm:hidden">
                  Room Name
                </th>
                <th className="py-3 px-4 font-medium text-gray-800 text-center">
                  Total Amount
                </th>
                <th className="py-3 px-4 font-medium text-gray-800 text-center">
                  Payment Status
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.bookings.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-gray-700">
                    {item.user.username}
                  </td>

                  <td className="py-3 px-4 text-gray-700 max-sm:hidden">
                    {item.room.roomType}
                  </td>

                  <td className="py-3 px-4 text-gray-700 text-center">
                    ₹{item.totalPrice}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block py-1 px-3 text-xs rounded-full ${
                        item.isPaid
                          ? "bg-green-200 text-green-700"
                          : "bg-amber-200 text-amber-700"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
