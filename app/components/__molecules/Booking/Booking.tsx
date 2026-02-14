import React from "react";

const Booking = () => {
  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-[1280px] mx-auto flex text-gray-800 items-start justify-start flex-col">
        <h1 className="text-[57px] font-Oswald font-medium text-[#060002]">
          Book A Consultation
        </h1>
        <div className="flex justify-start items-start flex-wrap xs:gap-5 lg:gap-0">
          <div>
            <p className="text-[20px] font-extralight font-Oswald max-w-[780px] text-gray-800">
              We can discuss your needs in detail and analyse them together. Our
              program, designed for art house enthusiasts, interior designers,
              hotels, and architectural firms, offers tailored outlines that
              meet your specific requirements.
            </p>
          </div>
          <div className="text-left">
            <p className="text-[22px] font-normal whitespace-nowrap">
              <span className="text-[#060002] text-[22px] font-medium font-Oswald">
                Email:
              </span>{" "}
              kacharava.tamari12@gmail.com
            </p>
            <p className="text-[22px] font-normal">
              {" "}
              <span className="text-[#060002] text-[22px] font-medium font-Oswald">
                WhatsApp:
              </span>{" "}
              +000-00-00-00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
