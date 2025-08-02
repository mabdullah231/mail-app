import React from "react";

const Productivity = () => {
  return (
    <section className="pt--100 pt-[100px] lg:pt-[80px] md:pt-[70px] ct-01 content-section division">
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)] items-center">
          <div className="md:w-6/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full order-last order-md-2 md:order-2 lg:order-2 xl:order-2">
            <div className="txt-block left-column wow fadeInRight">
              <span className="section-id block !text-[0.85rem] leading-none font-bold tracking-[0.5px] uppercase mb-[35px] lg:text-[0.85rem] lg:mb-[30px] md:mb-[25px] sm:mb-[25px] font-Jakarta">
                Productivity Focused
              </span>

              <h2 className="s-46 w-700 text-[2.875rem] lg:text-[2.625rem] md:text-[2.35294rem] sm:text-[2.25rem] xsm:text-[1.8125rem] font-bold lg:mb-[20px] md:mb-[15px] sm:mb-[20px] xsm:mb-[15px] mb-[26px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35]">
                Achieve more with better workflows
              </h2>

              <p>
                Sodales tempor sapien quaerat ipsum undo congue laoreet turpis
                neque auctor turpis vitae dolor luctus placerat magna and ligula
                cursus purus vitae purus an ipsum suscipit
              </p>

              <div className="cbox-1 ico-15 flex relative items-stretch justify-start [flex-flow:row_wrap] group">
                <div className="ico-wrap color--theme ml-[8px]">
                  <div className="cbox-1-ico">
                    <span className="flaticon-check relative right-[8px] top-px xsm:right-[6px] xsm:top-[0.5px]"></span>
                  </div>
                </div>
                <div className="cbox-1-txt overflow-hidden flex-1 max-w-full">
                  <p className="mb-[8px] lg:mb-[5px] md:mb-[5px] xsm:mb-[5px]">
                    Magna dolor luctus at egestas sapien
                  </p>
                </div>
              </div>

              <div className="cbox-1 ico-15 flex relative items-stretch justify-start [flex-flow:row_wrap] group">
                <div className="ico-wrap color--theme ml-[8px]">
                  <div className="cbox-1-ico">
                    <span className="flaticon-check relative right-[8px] top-px xsm:right-[6px] xsm:top-[0.5px]"></span>
                  </div>
                </div>
                <div className="cbox-1-txt overflow-hidden flex-1 max-w-full">
                  <p className="mb-[8px] lg:mb-[5px] md:mb-[5px] xsm:mb-[5px]">
                    Cursus purus suscipit vitae cubilia magnis volute egestas
                    vitae sapien turpis ultrice auctor congue varius magnis
                  </p>
                </div>
              </div>

              <div className="cbox-1 ico-15 flex relative items-stretch justify-start [flex-flow:row_wrap] group">
                <div className="ico-wrap color--theme ml-[8px]">
                  <div className="cbox-1-ico">
                    <span className="flaticon-check relative right-[8px] top-px xsm:right-[6px] xsm:top-[0.5px]"></span>
                  </div>
                </div>
                <div className="cbox-1-txt overflow-hidden flex-1 max-w-full">
                  <p className="mb-0">
                    Volute turpis dolores and sagittis congue
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-6/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full order-first order-md-2 md:order-2 lg:order-2 xl:order-2">
            <div className="img-block text-center right-column wow fadeInLeft ml-[30px] lg:ml-[5px] md:ml-0 sm:!mx-[3%] xsm:!m-[0_2%_35px]">
              <img
                className="img-fluid"
                src="/images/img-13.png"
                alt="content-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productivity;
