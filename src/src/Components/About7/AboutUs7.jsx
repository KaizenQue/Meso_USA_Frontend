import React from "react";
import Img1 from '../../assets/meso-eight-img.svg'
import Img2 from '../../assets/meso-eight-img2.svg'

import { useNavigate } from 'react-router-dom';
const AboutUs7 = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/ClaimForm');
    };
    return (
        <div className="w-full relative bg-[#faf3ec] min-h-screen px-4 md:px-0 py-12 md:py-0 flex items-center justify-center overflow-hidden text-left text-[16px] md:text-[20px] text-[#4b2c5e] font-helvetica">
            <div className="w-full md:w-[1207px] relative md:h-[545px] text-[48px] md:text-[96px] font-georgia">
                <div className="relative w-full md:w-[1014px] h-auto md:h-[520px] mx-auto">
                    <div className="relative w-full md:w-[1135px] h-auto md:h-[200px] flex flex-col md:block items-center">
                        <img 
                            className="relative md:absolute w-[200px] md:w-[255.5px] h-auto md:h-[320px] md:left-[-130px] md:top-[calc(55%-160px)] 2xl:w-[500px] xl:w-[300px]" 
                            alt="" 
                            src={Img1} 
                        />
                        <i className="relative text-center md:text-left mt-6 md:mt-0 md:top-[110px] text-[48px] md:text-[96px] md:left-[100px] ml-10 2xl:ml-[25%] 2xl:text-[98px] xl:ml-[17%]">
                            <span className="font-['Georgia'] italic">{`Let's Act Together!`}</span>
                        </i>
                    </div>
                    <div className="relative w-full md:w-[796px] h-auto md:h-[200px] md:left-[300px] md:top-[100px] mt-8 md:mt-0 justify-center item-center text-left font-helvetica text-[18px] md:text-[24px] text-[#4b2c5e]  md:text-left 2xl:text-[26px] 2xl:ml-[10%]">
                        <span>{`If you or a family member has been diagnosed with mesothelioma, we are here to support you. Whether you seek legal guidance or vital prevention resources, `}</span>
                        <b>Fight for Mesothelioma</b>
                        <span> is dedicated to advocating for your rights and making a meaningful impact.</span>
                        <div className="flex justify-center md:justify-start">
                            <button className="relative mt-8 md:mt-[20px] w-full md:w-[250px] rounded-[20px] bg-[#4b2c5e] overflow-hidden flex flex-row items-center justify-center p-[20px_32px] md:p-[24px_40px] box-border text-center text-[24px] md:text-[32px] text-[#f8f2e9] font-helvetica">
                                <b className="relative" onClick={handleButtonClick}>Claim Now</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs7;