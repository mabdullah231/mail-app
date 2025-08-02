import React from "react";

const LnkThree = () => {
  return (
    <section
      id="lnk-3"
      className="bg--04 ct-10 content-section division bg-no-repeat bg-[center_center] bg-cover bg-[url(./images/bg-04.jpg)]"
    >
      <div className="section-overlay pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] mb-[100px] lg:mb-[80px] md:mb-[80px] sm:mb-[50px] xsm:mb-[40px] w-full h-full">
        <div className="container">
          <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] justify-center">
            <div className="md:w-10/12 lg:w-9/12 xl:w-9/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
              <div className="section-title mb--70 mb-[70px] lg:mb-[60px] md:mb-[50px] text-center">
                <h2 className="s-50 w-700 text-[3.125rem] lg:text-[2.875rem] md:text-[2.64705rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold mb-0 xsm:px-[1%] xsm:py-0 leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] tracking-[-0.5px]">
                  Track the progress towards objectives with key results
                </h2>

                <p className="s-21 color--grey text-[1.3125rem] mt-[18px] mb-0 lg:mt-[15px] lg:text-[1.18755rem] md:text-[1.32352rem] md:mt-3 sm:text-[1.21875rem] sm:mt-3 xsm:text-[1.1875rem] xsm:mt-3 xsm:px-[3%] xsm:py-0">
                  Ligula risus auctor tempus magna feugiat lacinia.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">
            <div className="col flex-[1_0_0%] w-full max-w-full px-[calc(0.5*_1.5rem)]">
              <div className="img-block text-center video-preview wow fadeInUp mb-[-100px] lg:-mb-[80px] md:-mb-[80px] sm:mb-[-50px] xsm:-mb-[40px] relative">
                <a
                  className="video-popup2"
                  href="https://www.youtube.com/watch?v=7e90gBu4pas"
                >
                  <div className="video-btn video-btn-xl bg--theme w-[6.25rem] h-[6.25rem] mt-[-3.125rem] ml-[-3.125rem] hover:before:opacity-75 md:w-28 md:h-28 md:mt-[-3.5rem] md:ml-[-3.5rem] absolute inline-block text-center text-white rounded-[100%] left-2/4 top-2/4 before:content-[''] before:absolute before:left-[-5px] before:right-[-5px] before:top-[-5px] before:bottom-[-5px] before:opacity-0 before:[transition:all_400ms_ease-in-out] before:rounded-[50%] before:bg-[rgba(255,255,255,0.2)] group">
                    <div className="video-block-wrapper [transition:all_400ms_ease-in-out] group-hover:scale-95">
                      <span className="flaticon-play-button"></span>
                    </div>
                  </div>
                </a>

                <img
                  className="img-fluid inline-block"
                  src="/images/dashboard-01.png"
                  alt="video-preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LnkThree;
