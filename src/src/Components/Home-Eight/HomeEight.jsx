import React from "react";
import Img1 from '../../assets/meso-eight-img.svg'
import Img2 from '../../assets/meso-eight-img2.svg'
import Img3 from '../../assets/Frame 112.png'
import Img4 from '../../assets/Group 35624.png'

import { useNavigate } from 'react-router-dom';
const HomeEight = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/ClaimForm');
    };
    return (
        <div>

            <div className="w-full relative bg-[#faf3ec] h-screen items-center justify-center  overflow-hidden text-left text-[20px] text-[#4b2c5e] font-helvetica hidden md:block">
                <div className="w-[1207px] relative h-[645px] text-[96px] font-georgia ml-[100px] mt-[10] 2xl:ml-[33%] 2xl:mt-[10%] max-w-[105rem]"> {/* Added negative margin-left */}
                    <div className="relative w-[1014px] h-[520px] mx-auto mt-32 ">
                        <div className="relative w-[1135px] h-[200px]">
                            <img className="absolute left-[-120px] top-[calc(55%-160px)] w-[255.5px] h-[320px] 2xl:w-[500px] 2xl:h-[700px] 2xl:ml-[-20%]" alt="" src={Img1} />
                            <i className="relative inline-block w-full text-center font-['Georgia'] text-[96px] left-[80px]"> {/* Reduced left value */}
                                <span>{`You've Spent a Lifetime `}</span>
                                <span className="text-[rgba(75,44,94,0.65)] font-['Georgia']">Building a Legacy</span>
                            </i>
                        </div>
                        <div className="relative left-[-80px] top-[100px] mt-8 w-[652px] h-[342px]  text-[20px] font-helvetica mx-auto"> {/* Reduced left value */}
                            <div className="relative rounded-[20px] bg-white w-[523px] h-[228px] overflow-hidden ml-[200px] 2xl:ml-[40%]"> {/* Reduced margin-left */}
                                <i className="absolute top-[24px] left-[100px] text-[32px] underline tracking-[0.01em] font-['Georgia']">{`Let Us Help to Protect It `}</i> {/* Reduced left value */}
                                <div className="absolute top-[76px] left-[100px] font-helvetica">Let's take the next step together </div> {/* Reduced left value */}
                                <div className="absolute top-[calc(50%+19px)] left-[100px] rounded-[20px] bg-[#4b2c5e] h-[71px] overflow-hidden flex flex-row items-center justify-center p-[24px] box-border text-[#f8f2e9]"> {/* Reduced left value */}
                                    <b className="relative" onClick={handleButtonClick}>Call Us Today</b>
                                </div>
                            </div>
                            <img className="absolute top-0 left-[60px] w-[220.6px] h-[242px] object-cover 2xl:ml-[10%]" alt="" src={Img2} /> {/* Reduced left value */}
                        </div>
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
                        <img className="w-full h-full mx-auto mb-[-50px] relative z-10" alt="" src={Img4} />
                        <div className="absolute ml-[35%] z-10 inline-flex rounded-[12.675px] bg-[#2E4A7D] py-[5px] px-[12px] justify-center items-center gap-[10px] text-[#F5E7DA] font-helvetica text-[14px] font-normal leading-normal" onClick={handleButtonClick}>
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