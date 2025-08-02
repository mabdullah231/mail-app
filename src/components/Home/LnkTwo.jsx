import React from "react";

const LnkTwo = () => {
  return (
    <section
      id="lnk-2"
      className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] ct-02 content-section division"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="img-block text-center left-column wow fadeInRight mr-[30px] lg:mr-[5px] md:mr-0 sm:mx-[3%] xsm:m-[0_2%_35px]">
              <img
                className="img-fluid"
                src="/images/img-03.png"
                alt="content-image"
              />
            </div>
          </div>

          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="txt-block right-column wow fadeInLeft">
              <div className="txt-box mb-[20px] md:mb-[5px] last:mb-0">
                <h5 className="s-24 w-700 text-[1.5rem] lg:text-[1.375rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold mb-[20px] lg:mb-[18px] md:mb-[18px] sm:mb-[18px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                  The smarter way to work
                </h5>

                <p>
                  Sodales tempor sapien quaerat ipsum undo congue laoreet turpis
                  neque auctor turpis vitae dolor luctus placerat magna and
                  ligula cursus purus vitae purus an ipsum suscipit
                </p>
              </div>

              <div className="txt-box mb-0">
                <h5 className="s-24 w-700 text-[1.5rem] lg:text-[1.375rem] md:text-[1.470588rem] sm:text-[1.625rem] xsm:text-[1.4375rem] font-bold mb-[20px] lg:mb-[18px] md:mb-[18px] sm:mb-[18px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">
                  Full access to all features
                </h5>

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

                <a
                  href="#features-2"
                  className="btn btn-sm rounded-[4px] btn--tra-black hover--theme mt-[25px] lg:mt-[22px] md:mt-[15px] sm:!mt-[18px] xsm:!mt-[18px]"
                >
                  What's possible?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LnkTwo;
