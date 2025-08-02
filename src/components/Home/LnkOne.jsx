import React from "react";

const LnkOne = () => {
  return (
    <section
      id="lnk-1"
      className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] ct-02 content-section division"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="img-block text-center left-column wow fadeInRight mr-[30px] lg:mr-[5px] md:mr-0 sm:mx-[3%] xsm:m-[0_2%_35px]">
              <img
                className="img-fluid"
                src="/images/img-10.png"
                alt="content-image"
              />
            </div>
          </div>

          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="txt-block right-column wow fadeInLeft">
              <span className="section-id block !text-[0.85rem] leading-none font-bold tracking-[0.5px] uppercase mb-[35px] lg:text-[0.85rem] lg:mb-[30px] md:mb-[25px] sm:mb-[25px] font-Jakarta">
                Enhance Engagement
              </span>

              <h2 className="s-46 w-700 text-[2.875rem] lg:text-[2.625rem] md:text-[2.35294rem] sm:text-[2.25rem] xsm:text-[1.8125rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35]">
                Engage your most valuable visitors
              </h2>

              <p>
                Sodales tempor sapien quaerat ipsum undo congue laoreet turpis
                neque auctor turpis vitae dolor luctus placerat magna and ligula
                cursus purus vitae purus an ipsum suscipit
              </p>

              <h5 className="s-24 w-700 text-[1.5rem] lg:text-[1.375rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold mb-[20px] lg:mb-[18px] md:mb-[18px] sm:mb-[18px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                Digits that define growth
              </h5>

              <ul className="simple-list">
                <li className="list-item">
                  <p>
                    Sapien quaerat tempor an ipsum laoreet purus and sapien
                    dolor an ultrice ipsum aliquam undo congue cursus dolor
                  </p>
                </li>
                <li className="list-item">
                  <p className="mb-0">
                    Purus suscipit cursus vitae cubilia magnis volute egestas
                    vitae sapien turpis ultrice auctor congue magna placerat
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

export default LnkOne;
