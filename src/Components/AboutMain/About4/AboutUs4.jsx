import React from 'react';

const AboutUs4 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20 3xl:p-28 4xl:p-32 font-georgia bg-[#F3E2C88F]">
      <i className="text-[32px] sm:text-[40px] md:text-[96px] lg:text-[110px] xl:text-[120px] 2xl:text-[100px] 3xl:text-[120px] 4xl:text-[140px] text-center w-full md:w-[70%] block mb-4 md:mb-6 lg:mb-8 font-['Georgia'] italic text-[#4B2C5E]">
        How We Make a Difference?
      </i>
      
      <div className="text-[16px] sm:text-[18px] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[30px] 3xl:text-[36px] 4xl:text-[40px] font-helvetica text-center mb-6 md:mb-10 lg:mb-12 xl:mb-14 text-[#4B2C5E] max-w-[900px]">
        <p className="m-0">
          At Fight for Mesothelioma, our commitment extends beyond legal assistance.
        </p>
        <p className="m-0">
          We advocate, educate, and work toward a future free from asbestos related harm.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12 3xl:space-x-16 4xl:space-x-20 relative z-10 w-full max-w-[1400px] px-0 sm:px-2 md:px-0">
        {/* Card 1: Legal Advocacy & Compensation */}
        <div className="w-full sm:w-[90%] md:w-[411px] lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[650px] 4xl:w-[700px] h-auto md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] 4xl:h-[700px] bg-white rounded-[20px] shadow-[0px_4px_25px_rgba(39,29,46,0.25)] overflow-hidden p-4 md:p-5 lg:p-8 box-border flex flex-col">
          <i className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[48px] xl:text-[56px] 2xl:text-[60px] 3xl:text-[64px] 4xl:text-[72px] text-[#2e4a7d] block text-center mb-4 md:mb-5 lg:mb-8 font-['Georgia'] italic">
            Legal Advocacy & Compensation
          </i>
          <div className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] 3xl:text-[28px] 4xl:text-[32px] font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center">
            Our legal partners have successfully recovered millions in compensation, helping families cover medical expenses, lost wages, and other financial burdens.
          </div>
        </div>
        
        {/* Card 2: Awareness & Education */}
        <div className="w-full sm:w-[90%] md:w-[411px] lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[650px] 4xl:w-[700px] h-auto md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] 4xl:h-[700px] bg-white rounded-[20px] shadow-[0px_4px_25px_rgba(39,29,46,0.25)] overflow-hidden p-4 md:p-5 lg:p-8 box-border flex flex-col">
          <i className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[48px] xl:text-[56px] 2xl:text-[60px] 3xl:text-[64px] 4xl:text-[72px] text-[#2e4a7d] block text-center mb-4 md:mb-5 lg:mb-8 font-['Georgia'] italic">
            Awareness & Education
          </i>
          <div className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] 3xl:text-[28px] 4xl:text-[32px] font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center">
            We provide crucial information about asbestos exposure risks, workplace safety regulations, and legal rights, empowering individuals to protect themselves and their loved ones.
          </div>
        </div>
        
        {/* Card 3: Prevention Strategies */}
        <div className="w-full sm:w-[90%] md:w-[411px] lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[650px] 4xl:w-[700px] h-auto md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] 4xl:h-[700px] bg-white rounded-[20px] shadow-[0px_4px_25px_rgba(39,29,46,0.25)] overflow-hidden p-4 md:p-5 lg:p-8 box-border flex flex-col">
          <i className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[48px] xl:text-[56px] 2xl:text-[60px] 3xl:text-[64px] 4xl:text-[72px] text-[#2e4a7d] block text-center mb-4 md:mb-5 lg:mb-8 font-['Georgia'] italic">
            Prevention Strategies
          </i>
          <div className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] 3xl:text-[28px] 4xl:text-[32px] font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center">
            We educate workers, homeowners, and businesses to reduce asbestos risks. Our guidance helps identify and handle asbestos safely to prevent future cases.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs4;