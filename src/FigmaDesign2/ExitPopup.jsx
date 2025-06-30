import React from 'react';
import logo from '../assets/MesoLogoWhite.png';
import ExitPopupImage from '../assets/EP1.svg';
import ExitPopupImage2 from '../assets/EP2.svg';
import ExitPopupImage3 from '../assets/EP3.svg';

export default function ExitPopup({ onClose }) {
    const getCalendlyUrl = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `https://calendly.com/reachus-fightformesothelioma/30min?month=${year}-${month}&date=${year}-${month}-${day}`;
    };

    return (
        <div className="fixed inset-0 bg-[#3d2353] flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] md:max-h-[85vh] flex flex-col md:flex-row overflow-hidden">
                {/* Left Section */}
                <div className="w-full md:w-[40%] bg-purple-50 p-3 md:p-8 flex flex-col">
                    <div className="rounded-lg bg-purple-700 p-2 md:p-4 text-white w-fit">
                        <img src={logo} alt="Logo" className="h-8 md:h-16 w-auto" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-[60%] p-3 md:p-8 relative flex flex-col h-full overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-1 right-1 md:top-4 md:right-4 w-7 h-7 md:w-10 md:h-10 bg-[#C49A6C] rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition-colors text-lg md:text-xl z-10"
                    >
                        X
                    </button>

                    {/* Main Content */}
                    <div className="flex-1 space-y-3 md:space-y-6 mt-6 md:mt-4">
                        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 leading-tight">
                            Wait! Before You Leave – Don't Miss Your Chance to Book a <span className="text-[#C49A6C]">Free case consultation</span>
                        </h2>
                        
                        <p className="text-gray-600 text-sm md:text-lg">
                            A single call could secure the compensation your family deserves.
                        </p>

                        <button 
                            onClick={() => window.open(getCalendlyUrl(), '_blank')}
                            className="w-full bg-[#C49A6C] hover:bg-amber-800 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 md:space-x-3 text-sm md:text-lg"
                        >
                            <span className="text-lg md:text-2xl">📅</span>
                            <span className="font-semibold">Book My Appointment Now</span>
                        </button>
                    </div>

                    {/* Feature Cards */}
                    <div className="mt-4 md:mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                            <div className="bg-[#4B2C5E] rounded-lg p-3 md:p-6 text-center text-white">
                                <div className="mb-2">
                                    <img src={ExitPopupImage} alt="Legal Review" className="h-10 md:h-16 w-auto mx-auto" />
                                </div>
                                <p className="font-medium text-sm md:text-lg">Free Legal Review</p>
                            </div>
                            <div className="bg-[#4B2C5E] rounded-lg p-3 md:p-6 text-center text-white">
                                <div className="mb-2">
                                    <img src={ExitPopupImage2} alt="No Upfront Cost" className="h-10 md:h-16 w-auto mx-auto" />
                                </div>
                                <p className="font-medium text-sm md:text-lg">No Upfront Cost</p>
                            </div>
                            <div className="bg-[#4B2C5E] rounded-lg p-3 md:p-6 text-center text-white">
                                <div className="mb-2">
                                    <img src={ExitPopupImage3} alt="Experts Help" className="h-10 md:h-16 w-auto mx-auto" />
                                </div>
                                <p className="font-medium text-sm md:text-lg">Experts Help for Mesothelioma</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 