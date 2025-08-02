import React from "react";

const Loader = () => {
  return (
    <div
      id="loading"
      className="loading--theme  h-full w-full fixed z-[99999999] mt--0 top-0 bg-[#f5f5f9]"
    >
      <div
        id="loading-center"
        className="absolute h-[100px] w-[100px] mt-[-50px] ml-[-50px] animate-[loading-center-absolute_1s_infinite] left-2/4 top-2/4 lg:h-[90px] lg:w-[90px] lg:mt-[-45px] lg:ml-[-45px] md:h-[90px] md:w-[90px] md:mt-[-45px] md:ml-[-45px]"
      >
        <span className="loader w-[100px] h-[100px] inline-block relative box-border animate-[rotation_1s_linear_infinite] rounded-[50%] border-2 border-solid border-[transparent_#888] after:content-[''] after:box-border after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:rounded-[50%] after:border-[50px] after:border-solid after:border-[transparent_rgba(30,30,30,0.15)] after:left-2/4 after:top-2/4 lg:w-[90px] lg:h-[90px] lg:after:border-[45px] lg:after:border-solid md:w-[90px] md:h-[90px] md:after:border-[45px] md:after:border-solid sm:w-[80px] sm:h-[80px] sm:after:border-[40px] sm:after:border-solid"></span>
      </div>
    </div>
  );
};

export default Loader;
