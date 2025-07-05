import React from 'react';
import VectorSvg from '../../assets/au3(3).svg';
import VectorPng from '../../assets/au3(2).svg';
import GroupSvg from '../../assets/au3(1).svg';

const AboutUs3 = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#faf3ec] flex items-center justify-center py-6 md:py-8 lg:py-12 xl:py-8">
      <div className="relative w-full max-w-[1280px] min-h-[900px] md:min-h-[1100px] lg:min-h-[1200px] xl:min-h-[1200px] mx-auto overflow-hidden bg-white text-base md:text-[20px] lg:text-[24px] xl:text-[24px] font-helvetica px-4 md:px-8 lg:px-16 xl:px-4 shadow-lg rounded-lg">
        {/* Mission Section */}
        <div className="relative md:absolute mt-8 md:mt-0 md:top-[180px] left-0 md:left-[calc(50%-400px)] lg:left-[calc(34%-320px)] xl:left-[calc(50%-560px)] w-full md:w-[800px] lg:w-[640px] xl:w-[556px] h-auto md:h-[220px] lg:h-[205px] xl:h-[205px] text-3xl md:text-5xl lg:text-6xl xl:text-[96px] text-[#4b2c5e] font-georgia">
          <i className="block md:inline-block italic font-['Georgia'] mb-4 md:mb-0 md:px-6">
            Our Mission
          </i>
          <div className="text-base md:text-lg lg:text-2xl xl:text-[24px] font-helvetica text-black w-full md:w-[500px] lg:w-[640px] xl:w-[556px] md:px-6">
            At Fight for Mesothelioma, our mission is to provide essential resources, legal guidance, and advocacy.
          </div>
          
          {/* Mobile image - visible only on mobile */}
          <div className="block md:hidden mt-6 w-full">
            <img 
              src={GroupSvg} 
              alt="Mesothelioma mission illustration" 
              className="w-full max-w-[320px] mx-auto object-cover " 
            />
          </div>
        </div>
        
        {/* Graphic Elements - Hidden on mobile, shown on desktop */}
        <img 
          src={VectorPng} 
          alt="" 
          className="hidden md:block absolute top-[calc(17%-231px)] left-[calc(50%+119px)] w-[340px] md:w-[420px] lg:w-[540px] xl:w-[540px] object-cover" 
        />
        
        <img 
          src={GroupSvg} 
          alt="" 
          className="hidden md:block absolute h-[37.5%] w-[60.08%] top-[-13.18%] right-[-25%] bottom-[60.68%] left-[48%] max-w-full max-h-full overflow-hidden top-[185px] z-[30]" 
        />
        
        {/* Cards Section */}
        <div className="relative md:absolute top-auto md:top-[520px] lg:top-[602px] xl:top-[602px] left-0 w-full h-auto md:h-[480px] mt-8 md:mt-0">
          {/* Card 1 */}
          <div className="relative w-full h-[180px] sm:h-[200px] md:h-[200px] lg:h-[220px] xl:h-[220px] bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.32)] overflow-hidden mb-4 md:mb-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[25px] left-[70%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px]" 
            />
            <div className="block w-[3px] h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10" >
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Connecting victims with leading mesothelioma attorneys who specialize in asbestos-related claims, ensuring they receive the compensation they deserve.
              </b>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative w-full h-[140px] sm:h-[160px] md:h-[160px] lg:h-[180px] xl:h-[160px] bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.19)] overflow-hidden mb-4 md:mb-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0 mt-4 md:mt-0">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[-120px] left-[71%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px]" 
            />
            <div className="block w-[3px] h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10">
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Raising awareness about the dangers of asbestos exposure, workplace safety, and the legal rights of those affected.
              </b>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="relative w-full h-[140px] sm:h-[160px] md:h-[160px] lg:h-[180px] xl:h-[160px] bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.19)] overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0 mt-4 md:mt-0 mb-8">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[-240px] left-[72%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px]" 
            />
            <div className="block w-[3px] h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10">
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Preventing future cases by sharing vital information on how to recognize and minimize asbestos exposure risks.
              </b>
            </div>
          </div>
        </div>
      
      
      </div>
    </div>
  );
};

export default AboutUs3;