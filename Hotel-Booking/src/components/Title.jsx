import React from "react";

const Title = ({ title, subTitle, align = "center", font }) => {
  return (
    <div
      className={`flex flex-col justify-center text-center ${
        align === "left" ? "md:items-start md:text-left" : "items-center"
      }`}
    >
      <h1
        className={`text-4xl md:text-[40px] text-gray-900 ${
          font || "font-playfair"
        }`}
      >
        {title}
      </h1>

      <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
