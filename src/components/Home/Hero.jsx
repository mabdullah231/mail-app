import React from "react";

const Hero = () => {
  return (
    <section
      id="hero-1"
      className="bg--scroll hero-section relative md:mt-[80px] z-[3] w-full bg-no-repeat bg-[center_center] bg-cover bg-fixed sm:w-auto sm:bg-scroll xsm:w-auto xsm:bg-scroll bg-[url(./images/hero-1.jpg)] pt-[130px] pb--100 pb-[100px] lg:pt-[120px] lg:pb-[80px] md:py-[70px]"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  items-center">
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full ">
            <div className="hero-1-txt color--white wow fadeInRight sm:px-[3%] sm:py-0">
              <h2 className="s-58 w-700 text-[3.625rem] lg:text-[3.375rem] md:text-[3.08823rem] sm:text-[2.5rem] xsm:text-[2.0625rem] font-bold leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] mb-[28px] lg:mb-[24px] md:mb-[18px] sm:mb-[15px] xsm:mb-[18px]">
                Content is the key to building an audience
              </h2>

              <p className="p-xl pr-[2%] md:pr-0 mb-[32px] lg:mb-[28px] md:mb-[24px] sm:mb-[25px] xsm:mb-[25px]">
                Mauris donec turpis suscipit sapien ociis sagittis sapien tempor
                a volute ligula and aliquet tortor
              </p>

              <a
                href="#banner-3"
                className="btn  !rounded-[4px]  btn--theme hover--tra-white"
              >
                Get started for free
              </a>
              <p className="p-sm btn-txt ico-15 !p-0 m-[20px_0_0_0] lg:mt-[15px] lg:mb-0 lg:mx-0 md:mt-[13px] md:mb-0 md:mx-0 xsm:mt-[18px] xsm:mb-0 sm:mt-[15px] sm:mb-0 sm:mx-0">
                <span className="flaticon-check relative right-[2px] top-[0.5px]"></span>{" "}
                No credit card needed, free 14-day trial
              </p>
            </div>
          </div>

          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full ">
            <div className="hero-1-img wow fadeInLeft">
              <img
                className="img-fluid"
                src="/images/hero-1-img.png"
                alt="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
