import React from "react";

const FeaturesFive = () => {
  return (
    <section
      id="features-5"
      className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] features-section division"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] justify-center">
          <div className="md:w-10/12 lg:w-9/12 xl:w-9/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="section-title mb--70 mb-[70px] lg:mb-[60px] md:mb-[50px] text-center">
              <h2 className="s-50 w-700 text-[3.125rem] lg:text-[2.875rem] md:text-[2.64705rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] xsm:tracking-[-0.5px]">
                Reach your audience through social media marketing
              </h2>

              <p className="s-21 color--grey text-[1.3125rem] mt-[18px] mb-0 lg:mt-[15px] lg:text-[1.18755rem] md:text-[1.32352rem] md:mt-[12px] sm:text-[1.21875rem] sm:mt-[12px] xsm:text-[1.1875rem] xsm:mt-[12px] xsm:px-[3%] xsm:py-0">
                Ligula risus auctor tempus magna feugiat lacinia.
              </p>
            </div>
          </div>
        </div>

        <div className="fbox-wrapper text-center">
          <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
            <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
              <div className="fbox-5 fb-1 gr--smoke rounded-[16px] wow fadeInUp p-[60px] md:px-[25px] md:py-[35px] sm:pt-[50px] sm:pb-[45px] sm:px-[50px] xsm:pt-[45px] xsm:pb-[40px] xsm:px-[25px]">
                <div className="fbox-txt order-last order-md-2">
                  <h5 className="s-26 w-700 text-[1.625rem] lg:text-[1.5rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                    Marketing Integrations
                  </h5>
                  <p className="mb-0">
                    Aliquam a augue suscipit luctus diam neque purus ipsum neque
                    and dolor primis libero
                  </p>
                </div>

                <div className="fbox-5-img order-first order-md-2 mt--40 mt-[40px] mb-0 mx-[5%] lg:mt-[35px] lg:mb-0 lg:mx-[6%] md:mt-[30px] md:mb-0 md:mx-[6%] sm:mt-0 sm:mb-[30px] sm:mx-[10%] xsm:mt-0 xsm:mb-[30px] xsm:mx-[9%]">
                  <img
                    className="img-fluid light-theme-img"
                    src="/images/f_06.png"
                    alt="feature-image"
                  />
                  <img
                    className="img-fluid dark-theme-img hidden absolute"
                    src="/images/f_06_dark.png"
                    alt="feature-image"
                  />
                </div>
              </div>
            </div>

            <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
              <div className="fbox-5 fb-2 gr--smoke rounded-[16px] wow fadeInUp p-[60px] md:px-[25px] md:py-[35px] sm:pt-[50px] sm:pb-[45px] sm:px-[50px] xsm:pt-[45px] xsm:pb-[40px] xsm:px-[25px]">
                <div className="fbox-5-img mt-0 mb-[40px] mx-[5%] lg:mt-0 lg:mb-[30px] lg:mx-[6%] md:mt-0 md:mb-[25px] md:mx-[6%] sm:mt-0 sm:mb-[30px] sm:mx-[10%] xsm:mt-0 xsm:mb-[30px] xsm:mx-[9%]">
                  <img
                    className="img-fluid light-theme-img"
                    src="/images/f_04.png"
                    alt="feature-image"
                  />
                  <img
                    className="img-fluid dark-theme-img hidden absolute"
                    src="/images/f_04_dark.png"
                    alt="feature-image"
                  />
                </div>

                <div className="fbox-txt">
                  <h5 className="s-26 w-700 text-[1.625rem] lg:text-[1.5rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                    Productivity Focused
                  </h5>
                  <p className="mb-0">
                    Aliquam a augue suscipit luctus diam neque purus ipsum neque
                    and dolor primis libero
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

export default FeaturesFive;
