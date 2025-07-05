/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import how from "../../assets/how we help.png"
import how2 from "../../assets/how we help (1).png"
import { useNavigate } from 'react-router-dom';
import frame from "../../assets/c.png"
import home6_1 from "../../assets/home6_1.png"
import home6_2 from "../../assets/home6_2.png"
import home6_3 from "../../assets/home6_3.png"


function HomeSix() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ClaimForm');
  };

  return (
    <>
      {/* Desktop Version */}
      {/* <div className="hidden md:flex flex-col items-center bg-[#FAF3EC] py-12">
        <div className="relative w-[90%] max-w-4xl mx-auto mb-8">
          <img
            src={how}
            className="w-full h-auto block rounded-xl"
            alt="How we help"
          />
          <div className="absolute  left-1/2 -translate-x-1/2 w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[64px] lg:gap-[129px] lg:bottom-[62px] bottom-[48px] px-2">
            <button className="inline-flex h-[40px] md:h-[48px] 2xl:h-[60px] w-full md:w-[140px] 2xl:w-[180px] px-3 md:px-4 2xl:px-6 justify-center items-center gap-2 text-[#FAF3EC] font-helvetica text-base md:text-lg 2xl:text-xl font-bold rounded-xl bg-[#2E4A7D] hover:bg-[#1E3558] transition-colors">
              File Your Claim Now
            </button>
            <button className="inline-flex h-[40px] md:h-[48px] 2xl:h-[60px] w-full md:w-[140px] 2xl:w-[180px] px-3 md:px-4 2xl:px-6 justify-center items-center gap-2 text-[#FAF3EC] font-helvetica text-base md:text-lg 2xl:text-xl font-bold rounded-xl bg-[#F5E7DA] hover:bg-[#3A1D4D] transition-colors" onClick={() => window.scrollBy(0, -4500)}>
              Connect With Us
            </button>
            <button className="inline-flex h-[40px] md:h-[48px] 2xl:h-[60px] w-full md:w-[140px] 2xl:w-[180px] px-3 md:px-4 2xl:px-6 justify-center items-center gap-2 text-[#FAF3EC] font-helvetica text-base md:text-lg 2xl:text-xl font-bold rounded-xl bg-[#F5E7DA] hover:bg-[#B4895B] transition-colors" onClick={handleButtonClick}>
              Call Us Today
            </button>
          </div>
        </div>
        <img
          src={frame}
          className="w-full max-w-5xl h-auto mx-auto"
          alt="Frame"
        />
      </div> */}
      <div className="hidden md:flex flex-col items-center w-full h-auto bg-[#F5E7DA80] py-12">
        <div className='bg-[#FFFFFF] w-[90%] max-w-4xl mx-auto mb-8 rounded-xl p-6  flex-col'>
          <div className='flex justify-center'>
             <h1
            className="text-[#4B2C5E] font-[400] italic font-[Georgia] text-[40px] md:text-[60px] lg:text-[80px] leading-normal"
            style={{ fontFeatureSettings: "'dlig' on" }}
          >
            How can we help
          </h1>
          </div>
        <div className="w-[90%] max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First column */}
          <div className="bg-[#F5E7DA] rounded-xl p-0 flex flex-col items-center justify-center shadow-md h-[320px] sm:h-[360px] w-full overflow-hidden">
            <div className="bg-[#F5E7DA] w-full h-1/3 flex items-center justify-start border-b border-[#e0cdb7] pl-2 sm:pl-4">
              <img src={home6_1} className="w-[32px] h-[36px] sm:w-[40px] sm:h-[48px] md:w-[56px] md:h-[68px] lg:w-[70px] lg:h-[80px] flex-shrink-0 max-w-full max-h-full" alt="Step 1" />
            </div>  
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center border-b border-[#b4895b]">
              <span className="text-[#4B2C5E] font-[400] italic font-georgia text-[28px] lg:text-[36px] md:text-[25px] leading-normal [font-feature-settings:'dlig_on']">
                File Your Legal Case
              </span>
            </div>
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center">
              <button
                className="inline-flex h-[40px] sm:h-[48px] w-[70%] max-w-[180px] min-w-[160px] justify-center items-center gap-2.5 text-[#FAF3EC] font-helvetica text-[16px] font-bold rounded-2xl bg-[#2E4A7D] hover:bg-[#1E3558] transition-colors mx-auto px-8 py-3 sm:px-10 sm:py-4 whitespace-nowrap"
                style={{ fontFeatureSettings: "'dlig' on", fontStyle: 'normal', lineHeight: 'normal' }}
              >
                File Your Claim Now
              </button>
            </div>
          </div>
          {/* Second column */}
          <div className="bg-[#F5E7DA] rounded-xl p-0 flex flex-col items-center justify-center shadow-md h-[320px] sm:h-[360px] w-full overflow-hidden">
            <div className="bg-[#F5E7DA] w-full h-1/3 flex items-center justify-start border-b border-[#b4895b] pl-2 sm:pl-4">
              <img src={home6_2} className="w-[32px] h-[36px] sm:w-[40px] sm:h-[48px] md:w-[56px] md:h-[68px] lg:w-[70px] lg:h-[80px] flex-shrink-0 max-w-full max-h-full" alt="Step 2" />
            </div>
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center border-b border-[#e0cdb7]">
              <span className="text-[#4B2C5E] font-[400] italic font-georgia text-[28px] lg:text-[36px] md:text-[25px] leading-normal [font-feature-settings:'dlig_on']">
                Financial Compensation
              </span>
            </div>
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center">
              <button className="inline-flex h-[40px] sm:h-[48px] w-[70%] md:w-[160px] max-w-[180px] justify-center items-center gap-2.5 text-[#FAF3EC] font-helvetica text-base md:text-lg font-bold rounded-2xl bg-[#4B2C5E] hover:bg-[#3A1D4D] transition-colors mx-auto px-8 py-3 md:px-8 md:py-3 whitespace-nowrap" onClick={() => window.scrollBy(0, -4500)}>
                Connect With Us
              </button>
            </div>
          </div>
          {/* Third column */}
          <div className="bg-[#F5E7DA] rounded-xl p-0 flex flex-col items-center justify-center shadow-md h-[320px] sm:h-[360px] w-full overflow-hidden">
            <div className="bg-[#F5E7DA] w-full h-1/3 flex items-center justify-start border-b border-[#e0cdb7] pl-2 sm:pl-4">
           <img src={home6_3} className="w-[32px] h-[36px] sm:w-[40px] sm:h-[48px] md:w-[56px] md:h-[68px] lg:w-[70px] lg:h-[80px] flex-shrink-0 max-w-full max-h-full" alt="Step 3" />
            </div>
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center border-b border-[#b4895b]">
              <span className="text-[#4B2C5E] font-[400] italic font-georgia text-[28px] lg:text-[36px] md:text-[25px] leading-normal [font-feature-settings:'dlig_on']">
                Expert Legal Advice
              </span>
            </div>
            <div className="bg-[#F5E7DA] w-full h-1/3 flex justify-center items-center">
              <button className="inline-flex h-[40px] sm:h-[48px] w-[70%] max-w-[180px] justify-center items-center gap-2.5 text-[#FAF3EC] font-helvetica text-base sm:text-lg font-bold rounded-2xl bg-[#C49A6C] hover:bg-[#B4895B] transition-colors mx-auto px-8 py-3 sm:px-10 sm:py-4 whitespace-nowrap" onClick={handleButtonClick}>
                Call Us Today
              </button>
            </div>
          </div>
        </div>
        </div>
        
        <img
          src={frame}
          className="w-full max-w-5xl h-auto mx-auto"
          alt="Frame"
        />

        </div>

      
      
      
       {/* Mobile Version */}
      <div className="block md:hidden bg-[#FAF3EC] pb-8">

        <div className="px-4 pt-8">
        <button className="ml-[15%] mt-[162%] absolute flex w-[50%] text-[16px] h-10 justify-center items-center  rounded-[12.675px] bg-[#4B2C5E] hover:bg-[#3A1D4D] text-[#F5E7DA] font-helvetica text-base font-bold leading-none transition-colors [font-feature-settings:'dlig_on']">
              Connect With Us
            </button>
            <button className="mt-[235%] ml-[15%]  absolute w-[50%] text-[16px] h-10 flex justify-center items-center rounded-[12.675px] bg-[#C49A6C] hover:bg-[#C49A6C] text-[#F5E7DA] font-helvetica text-base font-bold leading-none transition-colors">
              Call Us Today
            </button>
          <div className="flex flex-col items-center space-y-2">
            <button className="mt-[85%] ml-[-7%] absolute w-[50%] text-[16px] h-10 flex justify-center items-center rounded-[12.675px] bg-[#2E4A7D] hover:bg-[#1E3558] text-[#F5E7DA] font-helvetica text-base font-bold leading-none transition-colors">
              File Your Claim Now
            </button>
           
          </div>
          <img
            src={how2}
            className="w-full h-auto"
            alt="How we help"
          />
        </div>



        {/* <div className="mt-8 px-4">
          <button className="w-full h-16 flex justify-center items-center text-[#2E4A7D] font-bold text-lg rounded-2xl bg-[#FAF3EC] hover:bg-[#E8D9C8] transition-colors border-2 border-[#2E4A7D]">
            Explore Your Legal Options
          </button>
        </div> */}

        <div className="mt-8 w-full">
          <img
            src={frame}
            className="w-full h-auto"
            alt="Frame"
          />
        </div>
      </div>
    </>
  )
}

export default HomeSix