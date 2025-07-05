import React from "react";
import Img1 from "../../assets/meso-eight-img.svg";
import Img2 from "../../assets/meso-eight-img2.svg";

import { useNavigate } from "react-router-dom";
const AboutUs7 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ClaimForm");
  };
  return (
    <div
      className="w-full relative bg-[#faf3ec] min-h-screen 
      px-4 sm:px-6 md:px-8 lg:px-4 xl:px-0 
      py-8 sm:py-10 md:py-12 lg:py-16 xl:py-0 
      flex items-center justify-center overflow-hidden text-left 
      text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 
      text-[#4b2c5e] font-helvetica"
    >
      <div
        className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1207px] 
        relative h-auto xl:h-[545px] 
        text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[96px] 
        font-georgia"
      >
        <div className="relative w-full h-auto xl:h-[520px] mx-auto">
          <div className="relative w-full h-auto xl:h-[200px] flex flex-col xl:block items-center">
            {/* Image - Responsive sizing and positioning */}
            <img
              className="relative xl:absolute 
                w-[120px] h-auto
                sm:w-[150px] 
                md:w-[180px] 
                lg:w-[155.48px] 
                xl:w-[155.48px] xl:h-[320px] xl:left-[  -33px] xl:top-[calc(55%-160px)]
                2xl:w-[500px] 
                mb-4 sm:mb-6 xl:mb-0"
              alt=""
              src={Img1}
            />

            {/* Title - Responsive text sizing and positioning */}
            <i
              className="relative text-center xl:text-left 
              xl:top-[110px] xl:left-[100px] xl:ml-10 
              text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[96px]
              2xl:ml-[25%] 2xl:text-[98px]"
            >
              <span className="font-['Georgia'] italic">{`Let's Act Together!`}</span>
            </i>
          </div>

          {/* Content section - Responsive positioning and sizing */}
          <div
            className="relative w-full 
            xl:w-[796px] xl:left-[300px] xl:top-[100px] 
            mt-6 sm:mt-8 xl:mt-0 
            text-center xl:text-left font-helvetica 
            text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]
            text-[#4b2c5e] 
            2xl:text-[26px] 2xl:ml-[10%]"
          >
            <span>{`If you or a family member has been diagnosed with mesothelioma, we are here to support you. Whether you seek legal guidance or vital prevention resources, `}</span>
            <b>Fight for Mesothelioma</b>
            <span>
              {" "}
              is dedicated to advocating for your rights and making a meaningful
              impact.
            </span>

            {/* Button - Responsive sizing */}
            <div className="flex justify-center xl:justify-start">
              <button
                className="relative 
                mt-6 sm:mt-8 xl:mt-[20px] 
                w-full sm:w-[280px] md:w-[320px] lg:w-[280px] xl:w-[250px] 
                rounded-[12px] sm:rounded-[16px] xl:rounded-[20px] 
                bg-[#4b2c5e] overflow-hidden flex flex-row items-center justify-center 
                p-[16px_24px] sm:p-[18px_28px] md:p-[20px_32px] xl:p-[24px_40px] 
                box-border text-center 
                text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[29px] 
                text-[#f8f2e9] font-helvetica
                hover:bg-[#3d2347] transition-colors duration-200"
              >
                <b className="relative" onClick={handleButtonClick}>
                  Claim Now
                </b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs7;
