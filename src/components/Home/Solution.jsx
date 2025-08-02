import React from "react";

const Solution = () => {
  return (
    <div>
      <section className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] ct-01 content-section division">
        <div className="container">
          <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
            <div className="md:w-6/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full order-last order-md-2 md:order-2 lg:order-2 xl:order-2">
              <div className="txt-block left-column wow fadeInRight">
                <div className="txt-box mb-[20px] md:mb-[5px] last:mb-0">
                  <h5 className="s-24 w-700 text-[1.5rem] lg:text-[1.375rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold mb-[20px] lg:mb-[18px] md:mb-[18px] sm:mb-[18px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                    Solution that grows with you
                  </h5>

                  <p>
                    Sodales tempor sapien quaerat ipsum undo congue laoreet
                    turpis neque auctor turpis vitae dolor luctus placerat magna
                    and ligula cursus purus vitae purus an ipsum suscipit
                  </p>
                </div>

                <div className="txt-box mb-0">
                  <h5 className="s-24 w-700 text-[1.5rem] lg:text-[1.375rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold mb-[20px] lg:mb-[18px] md:mb-[18px] sm:mb-[18px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                    Connect your data sources
                  </h5>

                  <p>
                    Tempor sapien sodales quaerat ipsum undo congue laoreet
                    turpis neque auctor turpis vitae dolor luctus placerat magna
                    and ligula cursus purus an ipsum vitae suscipit purus
                  </p>

                  <ul className="simple-list">
                    <li className="list-item">
                      <p>
                        Tempor sapien quaerat an ipsum laoreet purus and sapien
                        dolor an ultrice ipsum aliquam undo congue dolor cursus
                      </p>
                    </li>
                    <li className="list-item">
                      <p className="mb-0">
                        Cursus purus suscipit vitae cubilia magnis volute
                        egestas vitae sapien turpis ultrice auctor congue magna
                        placerat
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:w-6/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full order-first order-md-2 md:order-2 lg:order-2 xl:order-2">
              <div className="img-block text-center right-column wow fadeInLeft ml-[30px] lg:ml-[5px] md:ml-0 sm:!mx-[3%] xsm:!m-[0_2%_35px]">
                <img
                  className="img-fluid"
                  src="/images/img-06.png"
                  alt="content-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solution;
