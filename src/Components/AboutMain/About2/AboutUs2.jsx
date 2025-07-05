import React from 'react';
import Vector1 from '../../assets/aboutus2(1).svg';
import Vector2 from '../../assets/aboutus2(1).svg';

const AboutUs2 = () => {
  return (
    <div className="min-h-[200px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[380px] xl:min-h-[420px] 2xl:min-h-[480px] px-2 sm:px-4 md:px-8 overflow-hidden relative flex flex-col justify-center items-center bg-[#faf3ec]">
      <img 
        className="absolute h-[60%] sm:h-[50%] md:h-[50%] lg:h-[55%] xl:h-[60%] w-[60%] sm:w-[40%] md:w-[32%] lg:w-[28%] xl:w-[25%] object-contain z-10 opacity-30 left-[40%] sm:left-[35%] md:left-[40%] lg:left-[42%] xl:left-[44%]" 
        alt="" 
        src={Vector1} 
      />
      <img 
        className="absolute h-[60%] sm:h-[50%] md:h-[50%] lg:h-[55%] xl:h-[60%] w-[60%] sm:w-[40%] md:w-[32%] lg:w-[28%] xl:w-[25%] object-contain z-10 opacity-30 left-[5%] sm:left-[20%] md:left-[27%] lg:left-[29%] xl:left-[31%]" 
        alt="" 
        src={Vector2} 
      />
      <i className="z-20 text-center font-bold w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] leading-tight md:leading-snug lg:leading-normal text-[#2e4a7d]">
        Together, we fight for justice, awareness, and a future free from asbestos dangers.
      </i>
    </div>
  );
};

export default AboutUs2;