import React from "react";

const FeaturesTwo = () => {
  return (
    <section
      id="features-2"
      className="py--100 py-[100px] lg:py-[80px] md:py-[70px] features-section division"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] justify-center">
          <div className="md:w-10/12 lg:w-9/12 xl:w-9/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="section-title mb--80 mb-[80px] lg:mb-[60px] md:mb-[50px] text-center">
              <h2 className="s-50 w-700 text-[3.125rem] lg:text-[2.875rem] md:text-[2.64705rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] xsm:tracking-[-0.5px]">
                The Complete Solutions
              </h2>

              <p className="s-21 color--grey text-[1.3125rem] mt-[18px] mb-0 lg:mt-[15px] lg:text-[1.18755rem] md:text-[1.32352rem] md:mt-[12px] sm:text-[1.21875rem] sm:mt-[12px] xsm:text-[1.1875rem] xsm:mt-[12px] xsm:px-[3%] xsm:py-0">
                Ligula risus auctor tempus magna feugiat lacinia.
              </p>
            </div>
          </div>
        </div>

        <div className="fbox-wrapper text-center">
          <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] row-cols-1 row-cols-md-3">
            <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
              <div className="fbox-2 fb-1 wow fadeInUp">
                <div className="fbox-img gr--whitesmoke h-175 m-[0_8px_60px] pt-[42px] lg:mt-0 lg:mb-[50px] lg:mx-0 lg:pt-[35px] md:mt-0 md:mb-[45px] md:mx-0 md:pt-[30px] sm:mt-0 sm:mb-[50px] sm:mx-[10%] sm:pt-[46px] xsm:mt-0 xsm:mb-[50px] xsm:mx-3 xsm:pt-[40px] rounded-[12px_12px_0_0]">
                  <img
                    className="img-fluid light-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] inline-block"
                    src="/images/f_01.png"
                    alt="feature-image"
                  />
                  <img
                    className="img-fluid dark-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] hidden absolute"
                    src="/images/f_01_dark.png"
                    alt="feature-image"
                  />
                </div>

                <div className="fbox-txt">
                  <h6 className="s-22 w-700 text-[1.375rem] lg:text-[1.25rem] md:text-[1.397058rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4] font-bold mb-[15px]">
                    Intuitive Dashboard
                  </h6>
                  <p>
                    Luctus egestas augue undo ultrice aliquam in lacus congue
                    dapibus
                  </p>
                </div>
              </div>
            </div>

            <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
              <div className="fbox-2 fb-2 wow fadeInUp">
                <div className="fbox-img gr--whitesmoke h-175 m-[0_8px_60px] pt-[42px] lg:mt-0 lg:mb-[50px] lg:mx-0 lg:pt-[35px] md:mt-0 md:mb-[45px] md:mx-0 md:pt-[30px] sm:mt-0 sm:mb-[50px] sm:mx-[10%] sm:pt-[46px] xsm:mt-0 xsm:mb-[50px] xsm:mx-3 xsm:pt-[40px] rounded-[12px_12px_0_0]">
                  <img
                    className="img-fluid light-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] inline-block"
                    src="/images/f_05.png"
                    alt="feature-image"
                  />
                  <img
                    className="img-fluid dark-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] hidden absolute"
                    src="/images/f_05_dark.png"
                    alt="feature-image"
                  />
                </div>

                <div className="fbox-txt">
                  <h6 className="s-22 w-700 text-[1.375rem] lg:text-[1.25rem] md:text-[1.397058rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4] font-bold mb-[15px]">
                    Effortless Integration
                  </h6>
                  <p>
                    Tempor laoreet augue undo ultrice aliquam in lacusq luctus
                    feugiat
                  </p>
                </div>
              </div>
            </div>

            <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
              <div className="fbox-2 fb-3 wow fadeInUp">
                <div className="fbox-img gr--whitesmoke h-175 m-[0_8px_60px] pt-[42px] lg:mt-0 lg:mb-[50px] lg:mx-0 lg:pt-[35px] md:mt-0 md:mb-[45px] md:mx-0 md:pt-[30px] sm:mt-0 sm:mb-[50px] sm:mx-[10%] sm:pt-[46px] xsm:mt-0 xsm:mb-[50px] xsm:mx-3 xsm:pt-[40px] rounded-[12px_12px_0_0]">
                  <img
                    className="img-fluid light-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] inline-block"
                    src="/images/f_02.png"
                    alt="feature-image"
                  />
                  <img
                    className="img-fluid dark-theme-img mb-[-25px] max-h-[175px] md:max-h-32 sm:max-h-[220px] xsm:max-h-[185px] lg:max-h-40 w-auto max-w-[inherit] hidden absolute"
                    src="/images/f_02_dark.png"
                    alt="feature-image"
                  />
                </div>

                <div className="fbox-txt">
                  <h6 className="s-22 w-700 text-[1.375rem] lg:text-[1.25rem] md:text-[1.397058rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4] font-bold mb-[15px]">
                    Engagement Analysis
                  </h6>
                  <p>
                    Egestas luctus augue undo ultrice aliquam in lacus feugiat
                    cursus
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

export default FeaturesTwo;
