import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  const CreateCard = ({ testimonial }) => {
    return (
      <div className="p-6 rounded-2xl mx-4 bg-white shadow hover:shadow-lg transition-all duration-200 w-80 shrink-0 border border-gray-100">
        <div className="flex gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={testimonial.image}
            alt={testimonial.name}
          />

          <div className="flex flex-col">
            <p className="font-playfair text-lg text-gray-800 font-semibold">
              {testimonial.name}
            </p>
            <span className="text-xs text-slate-500">{testimonial.address}</span>
          </div>
        </div>

        <div className="mt-4">
          <StarRating rating={testimonial.rating} />
        </div>

        <p className="text-sm py-4 text-gray-600 leading-relaxed">
          "{testimonial.review}"
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Animation CSS */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-24">
        <Title
          title="What Our Guests Say"
          subTitle="Discover why discerning travelers choose QuickStay for their luxury accommodations around the world."
        />

        {/* Row 1 */}
        <div className="w-full mx-auto max-w-6xl overflow-hidden relative mt-10">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>

          <div className="marquee-inner flex transform-gpu min-w-[200%] py-6">
            {[...testimonials, ...testimonials].map((t, index) => (
              <CreateCard key={index} testimonial={t} />
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>
        </div>

        {/* Row 2 */}
        <div className="w-full mx-auto max-w-6xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>

          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-6">
            {[...testimonials, ...testimonials].map((t, index) => (
              <CreateCard key={index} testimonial={t} />
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
