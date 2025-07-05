import React from 'react';
import whyus1 from '../../assets//whyUs1.jpg';
import whyus1png from '../../assets/whyus1svg.png';
import whyus2 from '../../assets/whyus2.png';
import whyus3 from '../../assets/whyus3.png';

const AboutUs5 = () => {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 bg-[#faf3ec]">
    <div className="flex flex-col items-center justify-center pt-[100px] md:pt-[200px] relative -top-[100px] md:-top-[150px] px-4 md:px-8">

      {/* Header */}
      <div className="mb-8 md:mb-12 mt-5">
        <h1 className="text-[48px] md:text-[96px] text-[#2e4a7d] 2xl:text-[120px] text-center font-georgia italic inline-block">
          Why Us?
        </h1>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full 2xl:max-w-9xl">
        
        {/* Card 1 */}
        <div className="bg-[#F3E2C88F] rounded-2xl overflow-hidden p-6 md:p-8 text-left transition transform hover:scale-105">
          <img src={whyus1png} alt="Legal Support" className="w-full h-[120px] md:h-[150px] object-contain mb-4" />
          <h2 className="text-2xl md:text-3xl text-[#2e4a7d] mb-3 md:mb-4 font-['Georgia'] italic">
            Top-Tier Legal Support
          </h2>
          <p className="text-base md:text-lg text-[#4b2c5e] font-helvetica">
            Our partnered mesothelioma attorneys specialize in asbestos-related lawsuits and have a proven track record of success.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F3E2C88F] rounded-2xl overflow-hidden p-6 md:p-8 text-left transition transform hover:scale-105">
          <img src={whyus2} alt="No Upfront Costs" className="w-full h-[120px] md:h-[150px] object-contain mb-4" />
          <h2 className="text-2xl md:text-3xl text-[#2e4a7d] mb-3 md:mb-4 font-['Georgia'] italic">
            No Upfront Costs
          </h2>
          <p className="text-base md:text-lg text-[#4b2c5e] font-helvetica">
            You pay nothing unless we win your case.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F3E2C88F] rounded-2xl overflow-hidden p-6 md:p-8 text-left transition transform hover:scale-105">
          <img src={whyus3} alt="Comprehensive Resources" className="w-full h-[120px] md:h-[150px] object-contain mb-4" />
          <h2 className="text-2xl md:text-3xl text-[#2e4a7d] mb-3 md:mb-4 font-['Georgia'] italic">
            Comprehensive Resources
          </h2>
          <p className="text-base md:text-lg text-[#4b2c5e] font-helvetica">
            Get access to the latest information on legal rights, compensation, and asbestos exposure.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs5;
