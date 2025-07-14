import React, { useRef, useEffect } from 'react';
// import image1 from "../../assets/images/cardImg1.svg";
import image2 from "../../assets/Frame 112 (4).png";
import image3 from "../../assets/Frame 103.png";
import image4 from "../../assets/Frame 42.png";
import image5 from "../../assets/Frame 42 (1).png";
import image6 from "../../assets/Frame 42 (2).png";
import image7 from "../../assets/Frame 41.png";
import image8 from "../../assets/Frame 9.png";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
// Custom CSS for carousel
const carouselStyles = {
    carousel: {
        width: '100%',
        minHeight: '300px'
    },
    slide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '250px',
        margin: '0 5px'
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '20px'
    }
};

// Add a style tag to override the CSS rule that hides the carousel
const overrideCarouselCSS = `
    .custom-carousel, 
    .custom-carousel.custom-carousel,
    .custom-carousel .custom-carousel,
    div.custom-carousel,
    .carousel-root .carousel.carousel-slider {
        padding: 20px 0;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    .carousel .slide {
        display: block !important;
        visibility: visible !important;
    }
    
    .carousel .slide img {
        display: block !important;
        max-height: 300px;
        width: auto;
        margin: 0 auto;
    }
`;

function HomeFive() {
    const navigate = useNavigate();

    const handleImageClick = () => {
      navigate('/MesothMainPage');
    };
    const carouselRef = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {
            if (carouselRef.current) {
                e.preventDefault();
                const carousel = carouselRef.current;
                if (e.deltaY > 0) {
                    carousel.onClickNext();
                } else if (e.deltaY < 0) {
                    carousel.onClickPrev();
                }
            }
        };

        const carouselElement = document.querySelector('.custom-carousel');
        if (carouselElement) {
            carouselElement.addEventListener('wheel', handleScroll, { passive: false });
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('wheel', handleScroll);
            }
        };
    }, []);

    return (
        <div className="font-halvett font-bold">
            <Helmet>
                <style>{overrideCarouselCSS}</style>
            </Helmet>

            {/* Desktop Version */}
      <div className="hidden md:flex flex-col gap-3 p-[5%] bg-[#F5E7DA80]">
  {/* First Row */}
  <div className="flex flex-col md:flex-row justify-between  md:gap-4 lg:gap-5">
    {/* Card 1 */}
    <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center items-center">
      <p className="text-[20px] md:text-[24px] text-[#2E4A7D] font-helvetica font-normal leading-none">
        Average compensation
      </p>
      <h2 className="text-[36px] md:text-[48px] text-[#2E4A7D] mt-0 font-helvetica font-bold leading-tight">
        $1M to $2M
      </h2>
    </div>

    {/* Card 2 */}
    <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center items-center">
      <p className="text-[20px] md:text-[24px] text-[#2E4A7D] font-helvetica font-normal leading-none mt-5">
        Asbestos trust funds hold
      </p>
      <h2 className="text-[36px] md:text-[48px] text-[#2E4A7D] mt-0 font-helvetica font-bold leading-tight">
        $30 Billion,
      </h2>
      <p className="text-[20px] md:text-[24px] text-[#2E4A7D] font-helvetica font-normal leading-none">
        as of 2025
      </p>
    </div>

    {/* Card 3 */}
    <div className="flex-1 bg-white p-6 md:p-4 lg:p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center items-center">
      <div className="flex items-baseline justify-center">
        <span className="text-[20px] md:text-[24px] text-[#2E4A7D] font-helvetica font-normal leading-none mr-2">
          Each year
        </span>
        <span className="text-[36px] md:text-[48px] text-[#2E4A7D] font-helvetica font-bold leading-tight">
          2,000 +
        </span>
      </div>
      <p className="text-[20px] md:text-[24px] text-[#2E4A7D] font-helvetica font-normal leading-none mt-2">
        people receive compensation
      </p>
    </div>
  </div>

  {/* Second Row */}
  <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-[1%] gap-4 md:gap-0 relative">
    <div className="flex justify-center md:block">
      <img
        src={image3}
        alt=""
        className="h-[40px] md:h-[50px] w-[120px] md:w-[150px] object-contain absolute z-10 mt-[8%] ml-[70%] md:ml-[70%] cursor-pointer"
        onClick={handleImageClick}
      />
    </div>
    <div className="overflow-hidden flex items-center justify-center">
      <img src={image2} alt="" className="max-h-full max-w-full object-contain" />
    </div>
  </div>
</div>


            {/* Mobile Version */}
            <div className="md:hidden flex flex-col gap-4 bg-[#F5E7DA80] mt-[-12%]">
                {/* Stats Cards - Stacked */}
                <div className="space-y-4 items-center justify-center p-4 leading-none">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1">
                        <p className="text-lg text-[#2E4A7D] font-helvetica font-normal leading-none">
                            Average compensation
                        </p>
                        <h2 className="text-3xl text-[#2E4A7D] mt-1 font-helvetica font-bold leading-none">
                            $1M to $2M
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1 ">
                        <p className="text-lg text-[#2E4A7D] font-helvetica font-normal leading-none">
                            Asbestos trust funds hold
                        </p>
                        <h2 className="text-3xl text-[#2E4A7D] mt-1 font-helvetica font-bold leading-none">
                            $30 Billion,  <span className="text-lg text-[#2E4A7D] font-helvetica font-normal leading-none">
                                as of 2025
                            </span>
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            <div className="flex items-baseline">
                                <span className="text-lg text-[#2E4A7D] font-helvetica font-normal mr-2">
                                    Each year
                                </span>
                                <span className="text-3xl text-[#2E4A7D] font-helvetica font-bold">
                                    2,000 +
                                </span>
                            </div>
                            <p className="text-lg text-[#2E4A7D] font-helvetica font-normal mt-1">
                                people receive compensation
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative mt-4 w-full">
                    <div className="relative w-full">
                        <Carousel
                            ref={carouselRef}
                            showArrows={true}
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop={true}
                            centerMode={true}
                            centerSlidePercentage={100} // Changed to 100% to take full width
                            emulateTouch={true}
                            swipeable={true}
                            showIndicators={false}
                            dynamicHeight={true}
                            className="w-full"
                            swipeScrollTolerance={50}
                            preventMovementUntilSwipeScrollTolerance={true}
                            renderThumbs={() => []}
                        >
                            {/* Card 1 - Construction Workers */}
                            <div className="w-full">
                                <img
                                    src={image4}
                                    alt="Construction Workers"
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                />
                            </div>

                            {/* Card 2 - Shipyard Workers */}
                            <div className="w-full">
                                <img
                                    src={image5}
                                    alt="Shipyard Workers"
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                />
                            </div>

                            {/* Card 3 - Auto Mechanics */}
                            <div className="w-full">
                                <img
                                    src={image6}
                                    alt="Auto Mechanics"
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                />
                            </div>

                            {/* Card 4 - Fire fighter */}
                            <div className="w-full">
                                <img
                                    src={image7}
                                    alt="Fire fighter"
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                />
                            </div>
                        </Carousel>
                    </div>
                </div>
                {/* Image 8 below carousel in mobile view */}
                <div className="mt-6 px-4 pb-8">
                    <img
                        src={image8}
                        alt="Additional information"
                        className="w-full h-auto rounded-[20px] object-contain"
                        style={{
                            display: 'block',
                            maxWidth: '100%',
                            margin: '0 auto'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeFive;