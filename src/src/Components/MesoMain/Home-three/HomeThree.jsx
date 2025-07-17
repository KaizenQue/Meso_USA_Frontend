import React from 'react';
import SeniorImage from '../../assets/Vector (1).png';
import heart from '../../assets/Frame 84.png';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'

function HomeThree() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ClaimForm');
  };

  return (

    <>
      {/* Desktop Version */}
      <section className="hidden md:block w-full bg-[#FAF3EC] font-helvetica text-[#4B2C5E] overflow-hidden">
        <div className="relative w-full py-[10px]">
          <div className="relative max-w-[1200px] 2xl:max-w-[1600px] mx-auto px-[40px]">
            {/* <h2 className="font-georgia text-[80px] font-normal mb-[40px] leading-[1.14] text-[#4B2C5E] mt-32 ml-[-16%]">
              <img
                src={heart}
                alt="Heart"
                className="w-[750px] h-full ml-[13px] top-[19px] left-[-59%]"
              />
            </h2> */}
            <h3 className="font-georgia text-[80px] 2xl:text-[120px] font-normal italic leading-[1.14] text-[#4B2C5E] text-left mt-[30%] ml-[4%]">
              <div className=" text-left ml-[-8%]">YOU GAVE EVERYTHING, </div>
              <div className="text-[#4B2C5E]/60 ml-[-8%]">BUT NO ONE WARNED YOU ABOUT ASBESTOS</div>
            </h3>

            <div className="flex mt-10">
              <div className="w-1/2 max-w-[690px] flex-shrink-0">
                <p className="text-[24px] 2xl:text-[32px] leading-[1.5] mt-[21px] text-[#4B2C5E]">
                  You gave your all-for your family, your future, even your country. But no one warned you that a single invisible fiber could change everything.
                </p>
                <p className="text-[24px] 2xl:text-[32px] leading-[1.5] mb-[20px] text-[#4B2C5E]">
                  Asbestos was everywhere-on job sites, in homes, even in uniforms. Decades later, mesothelioma now reveals the danger no one saw coming.
                </p>
                <p className="text-[24px] 2xl:text-[32px] leading-[1.5] mb-[20px] text-[#4B2C5E]">
                  Nearly two-thirds of those diagnosed are over 65. The disease can stay hidden for decades, making the journey especially difficult for seniors. But you don’t have to face it alone.
                </p>
                <p className="text-[24px] 2xl:text-[32px] leading-[1.5] mb-[20px] text-[#4B2C5E]">
                  With the right medical support, legal guidance, and compassionate care-there’s a way forward.
                </p>
                <p className="text-[24px] 2xl:text-[32px] leading-[1.5] mb-[20px] text-[#4B2C5E]">
                  Our experienced legal experts don’t just support you-they &nbsp;
                  <NavLink
                    to="/ClaimForm"
                    className={({ isActive }) =>
                      `font-helvetica font-normal text-[24px] 2xl:text-[32px] italic  cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                      }`
                    }
                  >
                    <span><b>fight for you with compassion and clarity</b></span>.
                  </NavLink>
                </p>

                {/* <p className="text-[24px] leading-[1.15] mb-[20px] text-[#4B2C5E] font-bold" onClick={handleImageClick}>
                  Download our free eBook. Know more about mesothelioma
                </p> */}
              </div>
              <div className="w-1/2 flex justify-center items-center min-w-[180px] min-h-[180px] md:min-w-[220px] md:min-h-[220px] md:overflow-x-auto">
                <img
                  src={SeniorImage}
                  alt="Senior patient"
                  className="object-cover md:object-fill lg:object-contain rounded-[8px] w-full h-full min-w-[180px] min-h-[180px] md:min-w-[340px] md:min-h-[340px] max-w-full max-h-[690px] aspect-square"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* Mobile Version */}
      <section className="block md:hidden w-full bg-[#FAF3EC] font-helvetica text-[#4B2C5E] py-10 px-5">
        <div className="flex flex-col items-center">
          {/* Heart Image - adjusted for mobile */}
          {/* <div className="w-full flex justify-center mb-6">
            <img
              src={heart}
              alt="Heart"
              className="w-[90%] max-w-[400px]"
            />
          </div> */}
          {/* Content - image first on mobile */}
          <div className="w-full flex justify-center mb-8">
            <img
              src={SeniorImage}
              alt="Senior patient"
              className="w-full max-w-[400px] rounded-[8px]"
            />
          </div>

          {/* Headings - stacked and centered */}
          <h3 className="font-georgia text-[32px] md:text-[40px] font-normal italic leading-[1.2] text-[#4B2C5E] mb-8 text-left ml-16">
            <div className="text-[#4B2C5E] font-feature-dlig font-georgia text-[24px] italic font-normal leading-none w-[398px]">
              YOU GAVE EVERYTHING,
            </div>
            <div className="text-[#4B2C5E]/70 font-feature-dlig font-georgia text-[24px] italic font-normal leading-none mt-2 ">
              BUT NO ONE WARNED YOU ABOUT ASBESTOS
            </div>
          </h3>

          {/* Text content - full width on mobile */}
          <div className="w-full">
            <p className="text-[16px] md:text-[18px] leading-[1.5] text-[#4B2C5E] mb-6">
              You gave your all-for your family, your future, even your country. But no one warned you that a single invisible fiber could change everything.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.5] text-[#4B2C5E] mb-6">
              Asbestos was everywhere—on job sites, in homes, even in uniforms. Decades later, mesothelioma now reveals the danger no one saw coming.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.5] text-[#4B2C5E] mb-6">
              With the right medical support, legal guidance, and compassionate care-there’s a way forward.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.5] text-[#4B2C5E] mb-6">
              Our experienced legal experts don’t just support you-they &nbsp;
              <NavLink
                to="/ClaimForm"
                className={({ isActive }) =>
                  `font-helvetica font-normal text-[16px] cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                  }`
                }
              >
                <span >fight for you with compassion and clarity</span>.
              </NavLink>
            </p>

          </div>
        </div>
      </section>
    </>
  );
}

export default HomeThree;