import React from "react";

const Integration = () => {
  return (
    <section className="py--100 py-[100px] lg:py-[80px] md:py-[70px] ct-02 content-section division">
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="img-block text-center left-column wow fadeInRight mr-[30px] lg:mr-[5px] md:mr-0 sm:mx-[3%] xsm:m-[0_2%_35px]">
              <img
                className="img-fluid"
                src="/images/img-02.png"
                alt="content-image"
              />
            </div>
          </div>

          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="txt-block right-column wow fadeInLeft">
              <span className="section-id block !text-[0.85rem] leading-none font-bold tracking-[0.5px] uppercase mb-[35px] lg:text-[0.85rem] lg:mb-[30px] md:mb-[25px] sm:mb-[25px] font-Jakarta">
                Easy Integration
              </span>

              <h2 className="s-46 w-700 text-[2.875rem] lg:text-[2.625rem] md:text-[2.35294rem] sm:text-[2.25rem] xsm:text-[1.8125rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35]">
                Plug your essential tools in few clicks
              </h2>

              <ul className="simple-list">
                <li className="list-item">
                  <p>
                    Cursus purus suscipit vitae cubilia magnis volute egestas
                    vitae sapien turpis sodales magna undo aoreet primis
                  </p>
                </li>
                <li className="list-item">
                  <p className="mb-0">
                    Tempor sapien quaerat an ipsum laoreet purus and sapien
                    dolor an ultrice ipsum aliquam undo congue dolor cursus
                    purus congue and ipsum purus sapien a blandit
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

export default Integration;
