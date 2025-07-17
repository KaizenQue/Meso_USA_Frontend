
import React from 'react';
import MainImg from '../../assets/Frame 113.png';
import MainImgmobile from '../../assets/Frame 113.png';
import BackgroundImg from '../../assets/aboutusImg4.svg';

const AboutUsPage = () => {
    return (
        <div>
        {/* mobile view */}
            <div className="block md:hidden w-full relative bg-[#faf3ec] min-h-screen overflow-hidden text-left text-[#4b2c5e] font-georgia ">
                {/* Main Content Container */}
                <div className="container mx-auto px-4 py-8 md:py-16 relative">
                    {/* Title Section */}
                    <div className="w-full text-left mb-8 md:mb-16">
                        <i className="text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-georgia italic block mb-4">
                            Who we are 
                        </i>
                        <p className="text-base md:text-lg lg:text-xl xl:text-[20px] font-helvetica text-left">
                            <span>At Fight for Mesothelioma, we are committed to standing with individuals and families affected by </span>
                            <b>asbestos exposure.</b>
                        </p>
                    </div>
                       <div className="w-full lg:w-1/2 order-2 ">
                            <img
                                className="w-full h-auto mt-5 max-h-[50vh] object-contain"
                                alt="About us visual"
                                src={MainImgmobile}
                            />
                        </div>

                    {/* Image and Text Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">

                        {/* <div className="w-[719px] h-[302px] flex-shrink-0 border-[2.4px] border-[#F3E2C8]"></div> */}
                        {/* <div className="w-[2.4px] h-[173px] bg-[#F3E2C8] absolute z-10 mt-12 ml-[-60%]"></div> */}

                        <div className='mt-[4%] w-[280px] ml-[27%] 2xl:mt-16'>
                            <p className="mb-4 md:mb-6 text-[12px] leading-[16px] font-helvetica font-normal not-italic text-[#4B2C5E] [font-feature-settings:'dlig']">
                                <span>{`Our aim is to provide `}</span>
                                <b className="font-bold">expert legal guidance, advocate for victims' rights,</b>
                                <span>{` and `}</span>
                                <b>raise awareness</b>
                                <span> about the devastating impact of mesothelioma.</span>
                            </p>

                            <p className="mb-4 md:mb-6 text-[12px] leading-[16px] font-helvetica font-normal not-italic text-[#4B2C5E] [font-feature-settings:'dlig'] w-[239.027px]">
                                <b className="font-bold">{`We believe that no one should face this battle alone. `}</b>
                                <span>{`Through dedicated legal support, we help victims pursue the compensation they deserve while working to hold negligent parties accountable. `}</span>
                            </p>

                            <p className="text-[12px] leading-[16px] font-helvetica font-normal not-italic text-[#4B2C5E] [font-feature-settings:'dlig']">
                                <span>{`Beyond legal assistance, we strive to `}</span>
                                <b className="font-bold">educate the public</b>
                                <span>{`, `}</span>
                                <b className="font-bold">promote safety</b>
                                <span>{`, and `}</span>
                                <b className="font-bold">prevent future asbestos-related harm.</b>
                            </p>
                        </div>

                     
                    </div>
                </div>
            </div>

            {/* desktop view */}
            <div className="hidden md:block w-full relative bg-[#faf3ec] h-screen overflow-hidden text-left text-[20px] text-[#4b2c5e] font-georgia">
                <div className="w-full relative bg-[#faf3ec] h-screen overflow-hidden text-left text-[20px] text-[#4b2c5e] font-georgia ">
                    {/* <div className="relative top-[300px] -left-[23px] border-[5px] border-[#f3e2c8] box-border w-[101vw] h-[400px] overflow-hidden font-helvetica"> */}
                        <div className="absolute top-[40px] translate-x-[9px] inline-block w-[600px] left-[850px] text-[20px] xl:mt-[19%] xl:ml-[-3%] 2xl:ml-[26%] 2xl:text-[26px] 2xl:mt-[17%]">
                            <p className="m-0">
                                <span className="font-helvetica text-[18px] 2xl:text-[26px]">{`Our aim is to provide `}</span>
                                <b>expert legal guidance, advocate for victims' rights,</b>
                                <span className="font-helvetica">{` and `}</span>
                                <b className="font-helvetica">raise awareness</b>
                                <span className="font-helvetica"> about the devastating impact of mesothelioma.</span>
                            </p>
                            <p className="m-0">&nbsp;</p>
                            <p className="m-0">
                                <b className="font-helvetica">{`We believe that no one should face this battle alone. `}</b>
                                <span>{`Through dedicated legal support, we help victims pursue the compensation they deserve while working to hold negligent parties accountable. `}</span>
                            </p>
                            <p className="m-0">&nbsp;</p>
                            <p className="m-0">
                                <span>{`Beyond legal assistance, we strive to `}</span>
                                <b className="font-helvetica">educate the public</b>
                                <span className="font-helvetica">{`, `}</span>
                                <b className="font-helvetica">promote safety</b>
                                <span className="font-helvetica">{`, and `}</span>
                                <b className="font-helvetica">prevent future asbestos-related harm.</b>
                            </p>
                        </div>
                        {/* <div className="absolute top-1/2 -translate-y-[130.5px] right-[723.5px] border-r-[5px] border-[#f3e2c8] box-border w-[5px] h-[260px]" /> */}
                    {/* </div> */}



                    <img
                        className="absolute top-[30px] left-[10vw]  h-auto max-h-[85vh] 2xl:h-[60vh] 2xl:ml-[10%] mt-10"
                        alt=""
                        src={MainImg}
                    />

                    <div className="absolute top-[10vh] left-[623px] rounded-[20px] w-[840px] h-[209px] overflow-hidden text-[80px] xl:ml-[4%] 2xl:ml-[30%] 2xl:h-[400px]">
                        <i className="absolute top-[24px] left-1/2 -translate-x-[288px] w-[543px] font-['Georgia'] italic 2xl:text-[100px]">Who we are </i>
                        <div className="absolute top-[139px] left-1/2 -translate-x-[288px] text-[20px] 2xl:text-[28px] 2xl:mt-16 inline-block w-[580px] font-helvetica">
                            <span>{`At Fight for Mesothelioma, we are committed to standing with individuals and families affected by `}</span>
                            <b>asbestos exposure.</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;




