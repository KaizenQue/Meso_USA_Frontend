import React from "react";
import image1 from "../../assets/Group 35579 (1).png";
import image2 from "../../assets/Group 35579.png";
import image3 from "../../assets/Group 35636.png";
import image4 from "../../assets/Group 35.png";


function MesoOne() {
  return (
    <div
      style={{ backgroundColor: "#FAF3EC" }}
      className="flex justify-center p-1 lg:w-[100%] xl:w-[100%] "
    >
      <div className="max-w-[105rem] w-full px-10 sm:px-6 lg:w-[110%]">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center py-8">
          <h1 className="text-[#4B2C5E] font-georgia text-4xl md:text-5xl italic font-normal leading-tight text-left">
            Compassion in every moment, support when you need it most!
          </h1>
          {/* <p className="text-lg text-[#4B2C5E] my-6 leading-relaxed text-left">
            We connect individuals and families impacted by mesothelioma or asbestos exposure with the <b>nation's most trusted legal services.</b> ensuring you secure the <b>justice and support you rightfully deserve</b> .
          </p> */}

          <div className="relative w-[395px] h-[200px] max-w-lg mt-4 p-2">
            <img src={image3} className="w-full" alt="Support illustration" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center ml-[30%]">
              {/* <p className="text-[#4B2C5E] font-georgia text-xl italic font-normal underline mb-2">
                We're Here for You!
              </p>
              <p className="text-[#4B2C5E] font-helvetica text-sm mb-4 leading-none">
                Let's discuss your legal options. We'll support you every step of the way.
              </p> */}
              <button className="px-3 py-2 rounded-2xl bg-[#2E4A7D] text-[#F5E7DA] font-helvetica text-lg font-semibold mt-10 ml-[-10%]">
                Reach Out Today
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <img
              src={image1}
              className="w-full max-w-md"
              alt="Mesothelioma illustration"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between py-12 2xl:w-[100%] 2xl:mt-[0%] xl:w-[100%]">
          {/* Left column - text content */}
          <div className="w-full lg:w-[69%] 2xl:w-[100%]">
            {" "}
            {/* Added lg:pr-16 for right padding */}
            <h1 className="text-[#4B2C5E] font-georgia text-[80px] italic font-normal leading-tight">
              Compassion in every moment, support when you need it most!
            </h1>
            
            {/* <p className="text-xl text-[#4B2C5E] mb-8 mt-6 leading-relaxed">
              We connect individuals and families impacted by mesothelioma or asbestos exposure with the <b>nation's most trusted legal services.</b> ensuring you secure the <b>justice and support you rightfully deserve</b> .
            </p> */}


             <div className="relative w-full max-w-[799px] h-[238px] flex justify-end ml-auto 2xl:max-w-[799px] 2xl:h-[338px] 2xl:ml-[5%] 2xl:mt-[5%]">
              <img
                src={image4}
                className="w-full h-full object-contain"
                alt="Mesothelioma illustration"
              />
              <button
                className="
                  absolute z-10
                  top-[65%] left-[60%]
                  sm:top-[65%] sm:left-[60%]
                  md:top-[70%] md:left-[55%]
                  lg:top-[75%] lg:left-[50%]
                  xl:top-[70%] xl:left-[55%]
                  2xl:top-[71%] 2xl:left-[50%]
                  -translate-x-1/2 -translate-y-1/2
                  px-4 py-2
                  rounded-[20px] bg-[#2E4A7D] text-[#F5E7DA]
                  font-helvetica text-base sm:text-lg md:text-xl font-semibold
                  shadow-lg
                  transition-all
                "
                onClick={() => window.scrollBy(0, 1300)}
              >
                Reach Out Today
              </button>
            </div>  
            
              
          </div>

          <div className="w-full lg:w-[45%] 2xl:w-[60%] flex justify-center lg:justify-end">
            <img
              src={image1}
              className="max-w-full h-auto lg:max-w-[90%] xl:max-w-full "
              alt="Mesothelioma illustration"
            />
          </div>
        </div>  
      </div>

      
    </div>
  );
}

export default MesoOne;
