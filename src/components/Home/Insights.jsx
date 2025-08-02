import React from "react";

const Insights = () => {
  return (
    <section className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] ct-08 content-section division">
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] justify-center">
          <div className="md:w-10/12 lg:w-9/12 xl:w-9/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="section-title mb--70 mb-[70px] lg:mb-[60px] md:mb-[50px] text-center">
              <h2 className="s-50 w-700 text-[3.125rem] lg:text-[2.875rem] md:text-[2.64705rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] xsm:tracking-[-0.5px]">
                Discover insights across all your data with Martex
              </h2>

              <p className="s-21 text-[1.3125rem] mt-[18px] mb-0 lg:mt-[15px] lg:text-[1.18755rem] md:text-[1.32352rem] md:mt-[12px] sm:text-[1.21875rem] sm:mt-[12px] xsm:text-[1.1875rem] xsm:mt-[12px] xsm:px-[3%] xsm:py-0">
                Ligula risus auctor tempus magna feugiat lacinia.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">
          <div className="flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
            <div className="img-block text-center wow fadeInUp">
              <img
                className="img-fluid inline-block"
                src="/images/img-19.png"
                alt="video-preview"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">
          <div className="flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
            <div className="img-block-btn text-center wow fadeInUp">
              <a
                href="#integrations-2"
                className="btn !rounded-[4px] btn--tra-black hover--theme"
              >
                Monitor your activity
              </a>

              <ul className="advantages ico-15 clearfix mt-[20px] lg:mt-[15px] md:mt-[15px] sm:mt-[15px] xsm:mt-[15px]">
                <li className="w-auto inline-block align-top clear-none xsm:!block xsm:mt-[4px]">
                  <p className="inline-block float-left mb-0 xsm:block xsm:float-none">
                    Free 14 days trial
                  </p>
                </li>
                <li className="advantages-links-divider w-auto inline-block align-top clear-none xsm:!hidden">
                  <p className="inline-block float-left mb-0 xsm:block xsm:float-none">
                    <span className="flaticon-minus"></span>
                  </p>
                </li>
                <li className="w-auto inline-block align-top clear-none xsm:!block xsm:mt-[4px]">
                  <p className="inline-block float-left mb-0 xsm:block xsm:float-none">
                    Exclusive Support
                  </p>
                </li>
                <li className="advantages-links-divider w-auto inline-block align-top clear-none xsm:!hidden">
                  <p className="inline-block float-left mb-0 xsm:block xsm:float-none">
                    <span className="flaticon-minus"></span>
                  </p>
                </li>
                <li className="w-auto inline-block align-top clear-none xsm:!block xsm:mt-[4px]">
                  <p className="inline-block float-left mb-0 xsm:block xsm:float-none">
                    No Fees
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
