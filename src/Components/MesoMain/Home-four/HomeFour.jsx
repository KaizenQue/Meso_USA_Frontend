import React from 'react';
import leftSvg from "../../assets/images/left.svg";
import rightSvg from "../../assets/images/left.svg";
import Frame from "../../assets/Frame 87.png";

function HomeFour() {
    return (
        <>
    {/* Desktop Version */}
<div className="hidden md:block">
    <div className="flex justify-center items-center h-[50vh] bg-[#FAF3EC]">
        <div className="flex items-center text-center max-w-[1400px] 2xl:max-w-[1900px] p-10 md:p-6 lg:p-10 relative">
            <img src={leftSvg} alt="left" className="w-full h-full absolute z-10 ml-[-10%] md:ml-[-5%] lg:ml-[-10%]" />
            <p className="text-[#2E4A7D] text-center font-georgia italic font-bold text-[32px] md:text-[20px] lg:text-[32px] leading-normal [font-feature-settings:'dlig'_on] px-10 md:px-6 lg:px-10 2xl:text-[50px]">
                Decades ago, asbestos was everywhere on job sites, in homes, even in
                military uniforms. No one knew the dangers. No one said it could
                remain in the body for years, silently causing harm.
            </p>
            <img src={rightSvg} alt="right" className="w-full h-full absolute z-10 ml-16 md:ml-8 lg:ml-16" />
        </div>
    </div>
    <div className='bg-[#FAF3EC] py-16 md:py-8 lg:py-16'>
        <div className="flex items-center max-w-[105rem] mx-auto md:flex-col lg:flex-row md:max-w-[90%] lg:max-w-[105rem]">
            <div className="w-1/2 md:w-full lg:w-1/2 md:flex md:justify-center">
                <img src={Frame} alt="right" className="w-[393px] h-[563px] md:w-[280px] md:h-[400px] lg:w-[393px] lg:h-[563px] object-cover 2xl:w-[560px] 2xl:h-[800px]" />
            </div>
            <div className="w-2/3 md:w-full lg:w-2/3 pl-12 md:pl-0 lg:pl-4 xl:pl-4 mt-64 md:mt-8 lg:mt-64 md:text-center lg:text-left">
                <h1 className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-georgia italic font-normal text-[80px] md:text-[48px] lg:text-[80px] 2xl:text-[140px] leading-none">
                    <div>What is</div>
                    <div>Mesothelioma?</div>
                </h1>
                <p className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-helvetica text-[24px] md:text-[18px] lg:text-[24px] 2xl:text-[39px] leading-normal mt-6 max-w-[900px] md:max-w-full lg:max-w-[900px]">
                    <span className="font-bold">Mesothelioma </span> is a rare and aggressive cancer caused by <span className="font-bold">asbestos exposure</span>,
                    affecting the lungs, abdomen, or heart. It can take decades to develop, but once diagnosed,
                    it progresses quickly. Legal options may help secure compensation.
                </p>
            </div>
        </div>
    </div>
</div>

            {/* Mobile Version */}
            <div className="block md:hidden bg-[#FAF3EC] mt-[-20%]">
                {/* Quote Section */}
                <div className="flex justify-center items-center h-[50vh] bg-[#FAF3EC]">
                    <div className="flex items-center text-center max-w-[1400px] p-10 relative">
                        <img src={leftSvg} alt="left" className="w-[153px] h-[224px] absolute z-10 ml-[14%]" />
                        <p className="text-[#2E4A7D] text-center font-georgia italic font-bold text-[17px] p-5 leading-normal [font-feature-settings:'dlig'_on] px-10 w-[478px]">
                            Decades ago, asbestos was everywhere on job sites, in homes, even in
                            military uniforms. No one knew the dangers. No one said it could
                            remain in the body for years, silently causing harm.
                        </p>
                        <img src={rightSvg} alt="right" className="w-[153px] h-[224px] absolute z-10 ml-[45%]" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-12">
                    <div className="flex flex-col ">
                        <img
                            src={Frame}
                            alt="Mesothelioma"
                            className="w-full max-w-[300px] h-auto mb-8"
                        />
                        <div className="text-center">
                            <h1 className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-georgia italic font-normal text-4xl leading-tight mb-4 text-left">
                                What is<br />Mesothelioma?
                            </h1>
                            <p className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-helvetica text-base leading-normal text-left">
                                <span className="font-bold">Mesothelioma </span> is a rare and aggressive cancer caused by <span className="font-bold">asbestos exposure</span>,
                                affecting the lungs, abdomen, or heart. It can take decades to develop, but once diagnosed,
                                it progresses quickly. Legal options may help secure compensation.
 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeFour;