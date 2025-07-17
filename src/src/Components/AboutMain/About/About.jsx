import React from "react";
import MainImg from "../../assets/Frame 113.png";
import MainImgmobile from "../../assets/Frame 113.png";
import BackgroundImg from "../../assets/aboutusImg4.svg";

const AboutUsPage = () => {
  return (
    <div>
      {/* mobile view */}
      <div className="md:hidden block w-full relative bg-[#faf3ec] min-h-screen overflow-x-hidden text-left text-base sm:text-lg md:text-xl text-[#4b2c5e] font-georgia">
        <div className="w-full relative bg-[#faf3ec] min-h-screen overflow-x-hidden px-4 md:px-8">
          <div className="w-full md:w-[600px] mx-auto md:mx-0 md:absolute md:top-[40px] md:right-[5%] lg:right-[10%] xl:right-[15%] 2xl:right-[20%] text-center md:text-left space-y-4 pt-8 md:pt-0">
            <p className="m-0">
              <span className="font-helvetica text-base sm:text-lg 2xl:text-[26px]">{`Our aim is to provide `}</span>
              <b>expert legal guidance, advocate for victims' rights,</b>
              <span className="font-helvetica">{` and `}</span>
              <b className="font-helvetica">raise awareness</b>
              <span className="font-helvetica">
                {" "}
                about the devastating impact of mesothelioma.
              </span>
            </p>
            <p className="m-0">
              <b className="font-helvetica">{`We believe that no one should face this battle alone. `}</b>
              <span>{`Through dedicated legal support, we help victims pursue the compensation they deserve while working to hold negligent parties accountable. `}</span>
            </p>
            <p className="m-0">
              <span>{`Beyond legal assistance, we strive to `}</span>
              <b className="font-helvetica">educate the public</b>
              <span className="font-helvetica">{`, `}</span>
              <b className="font-helvetica">promote safety</b>
              <span className="font-helvetica">{`, and `}</span>
              <b className="font-helvetica">
                prevent future asbestos-related harm.
              </b>
            </p>
          </div>

          <img
            className="w-full md:w-auto mx-auto md:mx-0 max-w-[90%] md:max-w-[45%] h-auto md:absolute md:top-[30px] md:left-[5%] lg:left-[10%] mt-8 md:mt-10"
            alt=""
            src={MainImg}
          />

          <div className="w-full md:w-[840px] mx-auto md:mx-0 text-center md:text-left md:absolute md:top-[10vh] md:left-[40%] lg:left-[45%] xl:left-[50%] rounded-[20px] pt-8 md:pt-0">
            <i className="block text-4xl md:text-6xl lg:text-7xl 2xl:text-[100px] font-['Georgia'] italic mb-4">
              Who we are
            </i>
            <div className="text-base sm:text-lg md:text-xl 2xl:text-[28px] max-w-[580px] mx-auto md:mx-0 font-helvetica">
              <span>{`At Fight for Mesothelioma, we are committed to standing with individuals and families affected by `}</span>
              <b>asbestos exposure.</b>
            </div>
          </div>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden md:flex w-full h-screen bg-[#faf3ec] font-georgia text-[#4b2c5e] overflow-hidden md:flex-row md:items-center md:justify-center lg:h-[90vh] lg:px-12 xl:h-screen xl:px-12 2xl:h-screen 2xl:px-20">
        {/* === Left Side: Image === */}
        <div className="w-1/2 h-full flex items-center justify-center md:w-[48%] lg:w-[50%] md:justify-center lg:justify-end md:pr-6 lg:pr-12 xl:w-1/2 xl:justify-center xl:pr-0 2xl:w-1/2 2xl:justify-center 2xl:pr-0">
          <img
            src={MainImg}
            alt="Who we are"
            className="h-[70%] w-auto object-contain md:h-[60%] md:ml-0 lg:h-[70%] lg:ml-0 xl:h-[85%] xl:ml-0 2xl:h-[90%] 2xl:ml-[10%]"
          />
        </div>

        {/* === Right Side: Text Section === */}
        <div className="w-1/2 h-full flex flex-col justify-center py-10 px-6 md:w-[52%] lg:w-[50%] md:px-8 lg:px-12 md:pl-6 lg:pl-12 xl:w-1/2 xl:px-12 xl:pl-12 2xl:w-1/2 2xl:px-20 2xl:pl-20">
          {/* Top Half: Title + Intro */}
          <div className="mt-8">
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[100px] italic mb-4 leading-tight text-center md:text-left">
              Who we are
            </h2>
            <p className="text-[16px] md:text-[20px] lg:text-[22px] xl:text-[28px] 2xl:text-[28px] font-helvetica text-center md:text-left">
              At Fight for Mesothelioma, we are committed to standing with
              individuals and families affected by <b>asbestos exposure.</b>
            </p>
          </div>

          {/* Bottom Half: Paragraphs */}
          <div className=" text-[15px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[26px] font-helvetica space-y-4 pr-2 md:pr-4 lg:pr-8 xl:pr-12 2xl:pr-20 text-center md:text-left max-h-[40vh] md:max-h-[45vh] lg:max-h-[50vh] xl:max-h-[60vh] 2xl:max-h-[70vh]">
            <p>
              Our aim is to provide <b>expert legal guidance</b>,{" "}
              <b>advocate</b> for victims' rights, and <b>raise awareness</b>{" "}
              about the devastating impact of mesothelioma.
            </p>
            <p>
              <b>We believe that no one should face this battle alone.</b>{" "}
              Through dedicated legal support, we help victims pursue the
              compensation they deserve while working to hold negligent parties
              accountable.
            </p>
            <p>
              Beyond legal assistance, we strive to <b>educate the public</b>,{" "}
              <b>promote safety</b>, and{" "}
              <b>prevent future asbestos-related harm.</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
