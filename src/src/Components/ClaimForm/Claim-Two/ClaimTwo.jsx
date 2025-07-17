import React from "react";
import Img1 from '../meso-eight-img.svg'
import Img2 from '../meso-eight-img2.svg'

const CLAIMFORMPage2 = () => {
    return (
        <div className="w-full relative bg-[#faf3ec] h-screen flex items-center justify-center overflow-hidden text-left text-[20px] text-[#4b2c5e] font-helvetica">
            <div className="w-[1207px] relative h-[545px] text-[96px] font-georgia">
                <div className="relative w-[1014px] h-[520px] mx-auto">
                    <div className="relative w-[1135px] h-[200px]">
                    <img className="absolute left-[-130px] top-[calc(55%-160px)] left-0 w-[255.5px] h-[320px]" alt="" src={Img1} />
                        <i className="relative inline-block w-full text-center font-['Georgia'] text-[96px] left-[100px]">
                            <span>{`You've Spent a Lifetime `}</span>
                            <span className="text-[rgba(75,44,94,0.65)] font-['Georgia']">Building a Legacy</span>
                        </i>
                    </div>
                    <div className="relative left-[-100px] top-[100px] mt-8 w-[652px] h-[342px] text-[20px] font-helvetica mx-auto">
                        <div className="relative rounded-[20px] bg-white w-[523px] h-[228px] overflow-hidden ml-[220px]">
                            <i className="absolute top-[24px] left-[112px] text-[32px] underline tracking-[0.01em] font-['Georgia']">{`Let Us Help to Protect It `}</i>
                            <div className="absolute top-[76px] left-[112px] font-helvetica">Let's take the next step together </div>
                            <div className="absolute top-[calc(50%+19px)] left-[112px] rounded-[20px] bg-[#4b2c5e] h-[71px] overflow-hidden flex flex-row items-center justify-center p-[24px] box-border text-[#f8f2e9]">
                                <b className="relative">Call Us Today</b>
                            </div>
                        </div>
                        <img className="absolute top-0 left-[80px] w-[220.6px] h-[242px] object-cover" alt="" src={Img2} />
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default CLAIMFORMPage2;