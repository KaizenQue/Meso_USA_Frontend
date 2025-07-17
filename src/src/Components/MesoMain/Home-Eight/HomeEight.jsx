import React from "react";
import Img1 from "../../assets/meso-eight-img.svg";
import Img2 from "../../assets/meso-eight-img2.svg";
import Img3 from "../../assets/Frame 112.png";
import Img4 from "../../assets/Group 35624.png";

import { useNavigate } from "react-router-dom";
const HomeEight = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/ClaimForm");
    };
    return (
        <div>
            <div className="w-full relative bg-[#faf3ec]  items-center justify-center  overflow-hidden text-left text-[20px] text-[#4b2c5e] font-helvetica hidden md:block">
                <div className="w-[1207px] relative h-[645px] text-[96px] lg:text-[67px] sm:text-[67px] font-georgia ml-[100px] mt-[10] 2xl:ml-[33%] 2xl:mt-[10%] max-w-[105rem]">
                    {" "}
                    {/* Added negative margin-left */}
                    <div className="relative w-full h-auto flex items-center justify-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 px-2 sm:px-6 md:px-12 xl:px-24 mx-auto">
                        <img
                            className="w-[70px] h-auto sm:w-[120px] md:w-[160px] lg:w-[200px] 2xl:w-[260px] 4xl:w-[320px] max-w-[30vw] object-contain flex-shrink-0 transition-all duration-300"
                            alt=""
                            src={Img1}
                        />
                        <i className="block font-['Georgia'] text-[#4b2c5e] text-[1.2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.2rem] 2xl:text-[4.2rem] 4xl:text-[5rem] leading-tight transition-all duration-300 px-2 sm:px-4 md:px-6 w-full break-words">
                            <span>You've Spent a Lifetime</span>
                            <br />
                            <span className="text-[rgba(75,44,94,0.65)] font-['Georgia']">
                                Building a Legacy
                            </span>
                        </i>
                    </div>

                    <div className="relative left-[-80px] w-[652px] h-[342px] text-[20px] font-helvetica mx-auto  lg:mx-auto xl:left-[-80px] xl:mx-0">
                        <div className="relative rounded-[20px] bg-white w-[523px] h-[228px] ml-[200px] sm:w-[458px] sm:h-[176px] sm:left-[-31px] sm:ml-0 lg:w-[523px] lg:h-[228px] lg:ml-[171px] lg:left-0 xl:left-0 xl:ml-[200px] overflow-hidden 2xl:ml-[40%]">
                            <i className="absolute top-[24px] left-[100px] text-[32px] underline tracking-[0.01em] font-['Georgia']">
                                {`Let Us Help to Protect It `}
                            </i>
                            <div className="absolute top-[76px] left-[100px] font-helvetica">
                                Let's take the next step together
                            </div>
                            <div className="absolute top-[calc(50%+19px)] left-[100px] rounded-[20px] bg-[#4b2c5e] h-[71px] overflow-hidden flex flex-row items-center justify-center p-[24px] box-border text-[#f8f2e9]">
                                <b className="relative" onClick={handleButtonClick}>
                                    Call Us Today
                                </b>
                            </div>
                        </div>
                        <img
                            className="absolute top-0 left-[60px] w-[220.6px] h-[242px] object-cover 2xl:ml-[10%] sm:w-[162.6px] sm:h-[180px] sm:left-[-119px] sm:ml-0 lg:left-[30px] lg:w-[220.6px] lg:h-[242px] lg:ml-0 xl:left-[60px] xl:w-[220.6px] xl:h-[242px] xl:ml-0"
                            alt=""
                            src={Img2}
                        />
                    </div>
                
                
                </div>
            </div>

            <div className="block md:hidden w-full relative bg-[#faf3ec] py-16 px-4 text-[#4b2c5e] font-helvetica">
                <div className="flex flex-col items-center">
                    {/* First row with image and text inline */}
                    <div className="flex flex-row items-center justify-center mb-8 w-full max-w-[400px] gap-4">
                        <img className="w-full h-full object-contain" alt="" src={Img3} />
                        {/* <i className="text-[28px] font-['Georgia'] leading-tight text-left flex-shrink">
                            <span>{`You've Spent a Lifetime `}</span>
                            <span className="text-[rgba(75,44,94,0.65)] font-['Georgia'] block">Building a Legacy</span>
                        </i> */}
                    </div>

                    {/* Second row with image overlapping card */}
                    <div className="relative w-full max-w-[400px]">
                        <img
                            className="w-full h-full mx-auto mb-[-50px] relative z-10"
                            alt=""
                            src={Img4}
                        />
                        <div
                            className="absolute ml-[35%] z-10 inline-flex rounded-[12.675px] bg-[#2E4A7D] py-[5px] px-[12px] justify-center items-center gap-[10px] text-[#F5E7DA] font-helvetica text-[14px] font-normal leading-normal"
                            onClick={handleButtonClick}
                        >
                            <b>Call Us Today</b>
                        </div>
                        {/* <div className="rounded-[20px] bg-white w-full p-6 pt-16">
                            <i className="text-[20px] underline tracking-[0.01em] font-['Georgia'] block mb-4">
                                {`Let Us Help to Protect It`}
                            </i>
                            <div className="font-helvetica mb-6">Let's take the next step together</div>
                            <div className="rounded-[20px] bg-[#4b2c5e] h-[50px] flex items-center justify-center text-[#f8f2e9]">
                                <b>Call Us Today</b>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEight;
