import React from 'react'

function MesothThree() {
  return (
    <>
      {/* Mobile Version */}
      <div className="md:hidden" style={{ backgroundColor: "#FAF3EC" }}>
        <div className="w-full px-4 py-8 relative">
          <hr className="w-full h-[1px] bg-[rgba(75,44,94,0.55)] mx-auto"></hr>
          <p className="text-[#4B2C5E] text-center font-georgia italic text-3xl font-normal leading-normal underline decoration-solid decoration-[rgba(75,44,94,0.55)] underline-offset-4 my-6">
            Common Causes
          </p>
          
          <div className="flex flex-col items-center w-full">
            {/* Common Causes Tags - Mobile */}
            <div className="w-full flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex px-4 py-2 justify-center items-center rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] font-helvetica text-base font-normal">
                Asbestos Exposure
              </div>
              <div className="flex px-4 py-2 justify-center items-center rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] font-helvetica text-base font-normal">
                Environmental Exposure from Air or Soil
              </div>
              <div className="flex px-4 py-2 justify-center items-center rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] font-helvetica text-base font-normal">
                Contaminated clothing
              </div>
              <div className="flex px-4 py-2 justify-center items-center rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] font-helvetica text-base font-normal">
                Contaminated talc products
              </div>
            </div>

            {/* Important Box - Mobile */}
            <div className="w-full bg-white rounded-[20px] overflow-hidden p-6 mb-8">
              <div className="text-blue-900 text-2xl italic font-bold font-serif mb-4">Important:</div>
              <div className="text-blue-900 text-base font-normal font-helvetica">
                If you have been exposed to asbestos or experience any of these symptoms, please consult a medical professional immediately for proper diagnosis and treatment.
              </div>
            </div>

            {/* Diagnosis Box - Mobile */}
            <div className="w-full rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-amber-100 overflow-hidden p-6 relative">
              <div>
                <span className="text-blue-900 text-xl font-normal font-serif">A mesothelioma diagnosis</span>
                <span className="text-gray-700 text-base font-normal font-helvetica">
                  {" "}comes with overwhelming financial burdens. The costs associated with hospital visits, surgeries, chemotherapy, and other treatments can quickly add up. Many victims are also unable to work due to their illness, leading to lost wages that further strain their families.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block" style={{ backgroundColor: "#FAF3EC" }}>
        <div className="w-full px-8 lg:px-16 py-12 relative">
          {/* <hr className="w-full max-w-[845px] 2xl:max-w-[1245px] h-[1px] bg-[rgba(75,44,94,0.55)] mx-auto"></hr> */}
          <p className="text-[#4B2C5E] text-center font-georgia italic text-4xl 2xl:text-[120px] lg:text-5xl xl:text-[64px] font-normal leading-normal underline decoration-solid decoration-[rgba(75,44,94,0.55)] decoration-[3%] underline-offset-[14%] underline-from-font [text-decoration-skip-ink:none] [font-feature-settings:'dlig'on] decoration-opacity-70 my-8 lg:my-10">
            Common Causes
          </p>
          
          <div className="flex flex-col items-center w-full">
            {/* Common Causes Tags - Desktop */}
            <div className="w-full max-w-[1014px] flex flex-wrap justify-center gap-3 mb-16 lg:mb-24 xl:mb-32">
              <div className="flex px-6 py-3 justify-center items-center gap-[10px] 2xl:gap-[20px] rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] [font-feature-settings:'dlig'on] font-helvetica text-xl lg:text-2xl 2xl:text-3xl font-normal leading-normal">
                Asbestos Exposure
              </div>
              <div className="flex px-6 py-3 justify-center items-center gap-[10px] rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] [font-feature-settings:'dlig'on] font-helvetica text-xl lg:text-2xl 2xl:text-3xl font-normal leading-normal">
                Environmental Exposure from Air or Soil
              </div>
              <div className="flex px-6 py-3 justify-center items-center gap-[10px] rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] [font-feature-settings:'dlig'on] font-helvetica text-xl lg:text-2xl 2xl:text-3xl font-normal leading-normal">
                Contaminated clothing
              </div>
              <div className="flex px-6 py-3 justify-center items-center gap-[10px] rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] [font-feature-settings:'dlig'on] font-helvetica text-xl lg:text-2xl 2xl:text-3xl font-normal leading-normal">
                Contaminated talc products
              </div>
            </div>

            {/* Important Box - Desktop */}
            <div className="w-full max-w-[1280px] bg-white rounded-[20px] overflow-hidden p-10 mb-16 lg:mb-24 xl:mb-32">
              <div className="text-blue-900 text-4xl lg:text-5xl xl:text-6xl italic font-bold font-serif mb-10">Important:</div>
              <div className="text-blue-900 text-2xl lg:text-3xl font-normal font-helvetica">
                If you have been exposed to asbestos or experience any of these symptoms, please consult a medical professional immediately for proper diagnosis and treatment.
              </div>
            </div>

            {/* Diagnosis Box - Desktop */}
            <div className="w-full max-w-[1377px] rounded-[20px] outline outline-[5px] outline-offset-[-5px] outline-amber-100 overflow-hidden p-10 relative">
              <div className="w-20 lg:w-32 h-0 absolute left-6 lg:left-[50px] top-[53px] origin-top-left rotate-90 outline outline-[5px] outline-offset-[-2.5px] outline-amber-100"></div>
              <div className="ml-12">
                <span className="text-blue-900 text-3xl lg:text-4xl font-normal font-serif">A mesothelioma diagnosis</span>
                <span className="text-gray-700 text-xl lg:text-2xl xl:text-3xl font-normal font-helvetica">
                  {" "}comes with overwhelming financial burdens. The costs associated with hospital visits, surgeries, chemotherapy, and other treatments can quickly add up. Many victims are also unable to work due to their illness, leading to lost wages that further strain their families.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MesothThree