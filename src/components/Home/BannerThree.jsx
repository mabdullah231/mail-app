import React from "react";

const BannerThree = () => {
  return (
    <section
      id="banner-3"
      className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] banner-section"
    >
      <div className="container">
        <div className="banner-3-wrapper bg--03 bg--scroll rounded-[16px] relative overflow-hidden text-center sm:mr-[-15px] sm:ml-[-15px] sm:my-0 sm:rounded-[0_0] xsm:mr-[-15px] xsm:ml-[-15px] xsm:my-0 xsm:rounded-[0_0] bg-no-repeat bg-[center_center] bg-cover !bg-fixed bg-[url(./images/bg-03.jpg)]">
          <div className="banner-overlay pt-[75px] pb-[85px] px-[20%] md:pt-[45px] md:pb-[55px] md:px-[20%] lg:pt-[60px] lg:pb-[70px] lg:px-[22%] sm:pt-[55px] sm:pb-[65px] sm:px-[60px] xsm:pt-[60px] xsm:pb-[70px] xsm:px-[30px] w-full h-full">
            <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">
              <div className="col flex-[1_0_0%] w-full max-w-full px-[calc(0.5*_1.5rem)]">
                <div className="banner-3-txt color--white">
                  <h2 className="s-48 w-700 text-[3rem] lg:text-[2.75rem] md:text-[2.5rem] sm:text-[2.25rem] xsm:text-[1.9375rem] font-bold leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35]">
                    Starting with Martex is easy, fast and free
                  </h2>

                  <p className="p-xl mt-[20px] lg:mt-[15px] md:mt-[10px] sm:mt-3 xsm:mt-3 xsm:text-[1.125rem] mb-[25px] lg:mb-[25px] md:mb-[20px] sm:mb-[20px] xsm:mb-[20px]">
                    It only takes a few clicks to get started
                  </p>

                  <a
                    href="#"
                    className="btn !rounded-[4px] btn--theme hover--tra-white"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-3"
                  >
                    Get started - it's free
                  </a>

                  <p className="p-sm btn-txt ico-15 !m-[20px_0_0_0] lg:mt-[15px] lg:mb-0 lg:mx-0 md:mt-[13px] md:mb-0 md:mx-0 xsm:mt-[18px] xsm:mb-0 sm:mt-[15px] sm:mb-0 sm:mx-0">
                    <span className="flaticon-check relative right-[2px] top-[0.5px]"></span>
                    Free for 14 days, no credit card required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerThree;
