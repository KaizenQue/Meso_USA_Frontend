import React from 'react';
import image1 from "../../../assets/Frame 96.png";
import image2 from "../../../assets/Frame 96 (2).png";

function MesthOne() {
    return (
        <div className='mb-10'>
            <div style={{ backgroundColor: "#F8F2E9" }} className="flex justify-center">
                <div className="mx-auto w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between mt-10">
                        {/* <div className='w-[140%]'> */}
                        {/* <div className="lg:w-[60%] mt-32 mb-16 ml-16 w-[90%] sm:w-[80%]"> */}
                        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[60%] mt-14 sm:mt-16 ml-0 sm:ml-16 mb-16 2xl:ml-[15%]">

                            <h1 className="text-[#4B2C5E] font-georgia text-[32px] sm:text-[36px] md:text-[44px] lg:text-[56px] xl:text-[80px] 2xl:text-[120px] italic font-normal leading-tight">

                                Mesothelioma <br /> Resources and Support
                            </h1>
                                                                                                                                                                                                                                
                            <div className="flex relative mt-4 w-full sm:w-[100%] md:w-[90%] lg:w-[95%] xl:w-[700px] 2xl:w-[970px]">
                                <div className="w-full relative rounded-[20px] bg-white h-[260px] md:h-[320px] lg:h-[370px] xl:h-[420px] 2xl:h-[450px] md:w-[95%] lg:w-[98%] xl:w-[700px] 2xl:w-[970px] 2xl:mt-[9%] xl:text-[40px] overflow-hidden text-left text-[16px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[40px] 2xl:text-[32px] text-[#4b2c5e] font-helvetica">
                                    <i className="absolute top-[20px] md:top-[28px] left-[50%] transform -translate-x-[50%] underline font-georgia text-left w-[90%] md:text-[22px] lg:text-[28px] xl:text-[40px] 2xl:text-[42px] ">
                                        Get the Facts You Need
                                    </i> 
                                    <div className="absolute top-[70px] md:top-[90px] left-[50%] transform -translate-x-[50%] text-[12px] md:text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[26px] inline-block w-[90%] lg:w-[90%] xl:w-[90%]">
                                        <span>{`Mesothelioma is a `}</span>
                                        <b>rare but aggressive form of cancer</b>
                                        <span>
                                            {" "}
                                            linked to prolonged exposure to asbestos, a toxic mineral once widely
                                            used in construction and manufacturing. Often diagnosed decades after
                                            initial exposure, mesothelioma is a rare cancer that affects the
                                        </span>
                                        <b> protective linings of the lungs, abdomen, or heart.</b>
                                    </div>
                                    <div className="md:block hidden absolute  md:top-[240px] lg:top-[270px] xl:top-[250px]  left-[20px] xl:left-[40px] 2xl:left-[60px] rounded-[20px] bg-[#2e4a7d] flex-row items-center justify-start 2xl:mt-16 xl:mt-10 w-[220px] md:w-[240px] lg:w-[260px] xl:w-[300px] text-[12px] md:text-[14px] lg:text-[18px] xl:text-[24px] sm:w-[50%]">
                                        <button
                                            className="w-full min-h-[44px] md:h-[48px] lg:h-[56px] xl:h-[64px] relative focus:outline-none 2xl:p-3 px-4 xl:pl-8 pl-6 py-2 bg-transparent border-none text-[#F5E7DA] font-Helvetica left-[20px] xl:left-[40px] 2xl:left-[60px] text-left"
                                            onClick={() => window.location.href = '/ClaimForm'}
                                        >
                                            <b className="relative">Get a Free Case Evaluation</b>
                                        </button>
                                    </div>

                                    <div className="md:hidden absolute top-[200px] sm:top-[calc(50%+59px)] left-1/2 -translate-x-1/2 rounded-[16px] bg-[#2e4a7d] flex items-center justify-center w-[140px] sm:w-[160px] xl:w-[180px] text-[12px] sm:text-[14px] p-1 sm:p-2 text-[#f5e7da] z-20">
                                        <button
                                            className="w-full h-[32px] sm:h-[36px] relative focus:outline-none bg-transparent border-none text-[#F5E7DA] font-Helvetica text-center text-[12px] sm:text-[13px] px-2"
                                            onClick={() => window.location.href = '/ClaimForm'}
                                        >
                                            <b className="relative w-full block text-center">Get a Free Case Evaluation</b>
                                        </button>
                                    </div>

                                </div>
                            </div>
                       
                       
                       
                        </div>

                        <div className="w-full lg:w-[32%] flex justify-end pr-0 ">
                            {/* <img
                                src={image1}
                                className="max-w-full h-auto object-cover lg:object-contain lg:mr-0"
                                alt="Mesothelioma illustration"
                            /> */}
                            <img
                                src={image1}
                                className="max-w-full h-auto object-cover lg:object-contain lg:mr-0 relative lg:left-0 lg:pb-0 sm:left-[37px] sm:pb-[40px] xl:max-w-[420px] 2xl:max-w-[520px]"
                                alt="Mesothelioma illustration"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MesthOne;