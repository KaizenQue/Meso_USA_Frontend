import React from 'react';
import Vector1 from '../../assets/aboutus2(1).svg';
import Vector2 from '../../assets/aboutus2(1).svg';

const AboutUs2 = () => {
  return (
    <div className="min-h-[250px] sm:h-[300px] md:h-[376px] px-4 overflow-hidden relative flex flex-col justify-center items-center bg-[#faf3ec]">
      <img 
        className="absolute h-[70%] sm:h-[50%] md:h-[60%] w-[60%] sm:w-[35%] md:w-[28.82%] object-contain z-10 opacity-30 left-[40%] sm:left-[35%] md:left-[40%]" 
        alt="" 
        src={Vector1} 
      />
      <img 
        className="absolute h-[70%] sm:h-[50%] md:h-[60%] w-[60%] sm:w-[35%] md:w-[28.82%] object-contain z-10 opacity-30 left-[5%] sm:left-[25%] md:left-[29%]" 
        alt="" 
        src={Vector2} 
      />
      <i className="z-20 text-center font-bold w-full px-4 sm:w-[90%] md:w-[1117px] text-[24px] sm:text-[32px] md:text-[40px] text-[#2e4a7d]">
        Together, we fight for justice, awareness, and a future free from asbestos dangers.
      </i>
    </div>
  );
};

export default AboutUs2;