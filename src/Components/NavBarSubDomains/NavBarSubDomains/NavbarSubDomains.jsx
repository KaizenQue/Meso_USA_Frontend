

import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import Drawer from '../../../assets/drawer.png';
import CallIcon from '../../../assets/phoneIcon.png';
import logo from '../../../assets/Meso logo-01 1.png';

const useDialicsNumber = (defaultNumber = "(833) 588-0606") => {
  const [phoneNumber, setPhoneNumber] = useState(defaultNumber);

  const getCleanNumber = useCallback((num) => {
    return num.replace(/[^0-9+]/g, '');
  }, []);

  useEffect(() => {
    const targetNode = document.querySelector('[data-dialics="true"]');

    if (!targetNode) {
      console.warn("Dialics target element not found.");
      return;
    }

    const observerCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          const currentNumber = targetNode.textContent.trim();
          if (currentNumber && currentNumber !== phoneNumber) {
            setPhoneNumber(currentNumber);
          }
        }
      }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, {
      characterData: true,
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [phoneNumber]);

  return { phoneNumber, getCleanNumber };
};

const NavBarSubDomains = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { phoneNumber, getCleanNumber } = useDialicsNumber();
 
  useEffect(() => {
    document.body.classList.add('pt-[73px]', 'md:pt-[73px]');
    return () => {
      document.body.classList.remove('pt-[73px]', 'md:pt-[73px]');
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };
 
  const handlePhoneClick = useCallback(() => {
    const cleanNumber = getCleanNumber(phoneNumber);
    window.location.href = `tel:${cleanNumber}`;
  }, [phoneNumber, getCleanNumber]);
 
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
 
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .nav-link-animation {
          opacity: 0;
        }
        
        .menu-open .nav-link-animation:nth-child(1) {
          animation: slideIn 0.4s forwards;
          animation-delay: 0.1s;
        }
        
        .menu-open .nav-link-animation:nth-child(2) {
          animation: slideIn 0.4s forwards;
          animation-delay: 0.2s;
        }
        
        .menu-open .nav-link-animation:nth-child(3) {
          animation: slideIn 0.4s forwards;
          animation-delay: 0.3s;
        }
        
        .menu-open .claim-button-animation {
          animation: fadeIn 0.5s forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
      
      {/* Mobile Navbar */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-[1000] bg-[#FAF3EC] transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center justify-between p-[15px] relative z-[1001]">
          <div className="p-[8px] px-[15px] rounded-[4px]">
            <a href="/"> 
              <img
                src={logo}
                alt="Mesotheliamo Logo"
                className="h-[auto] w-[100px]" 
              />
            </a>
          </div>
 
          <div className="flex items-center gap-[12px]">
            <div
              className="w-[40px] h-[40px] rounded-full border-2 border-[#4B2C5E] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[rgba(75,44,94,0.1)]"
              onClick={handlePhoneClick}
            >
              <div className="relative w-[20px] h-[20px]">
                <img src={CallIcon} alt="Phone Icon" className="absolute top-0 left-0 w-full h-full" />
              </div>
            </div>
 
            <button
              onClick={toggleMenu}
              className="w-[40px] h-[40px] flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              aria-label="Toggle navigation menu"
            >
              <img src={Drawer} alt="Menu" className="w-[24px] h-[24px] object-contain" />
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen z-[1002] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-[5px]" 
          onClick={closeMenu}
        ></div>
        
        <div 
          className={`fixed top-0 w-full h-screen bg-[rgba(255,255,255,0.97)] transition-all duration-300 ease-in-out z-[1003] ${
            isOpen ? 'right-0' : 'right-[-100%]'
          } ${isOpen ? 'menu-open' : ''}`}
        >
          <div className="absolute top-[20px] left-[20px] bg-white p-[8px] px-[15px] rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
            <a href="/" onClick={closeMenu}> 
              <img
                src={logo}
                alt="Mesotheliamo Logo"
                className="h-[auto] w-[80px]" 
              />
            </a>
          </div>
          
          <button
            onClick={closeMenu}
            className="absolute top-[20px] right-[20px] w-[45px] h-[45px] flex items-center justify-center bg-[#4B2C5E] rounded-full border-none cursor-pointer p-0 z-[1004] shadow-md"
            aria-label="Close navigation menu"
          >
            <IoClose size={28} className="text-white" />
          </button>
          
          <div className="flex flex-col items-center justify-center gap-[5vh] h-full px-[20px]">
            
            
            <div className="flex items-center gap-[10px] mt-[5vh] claim-button-animation">
              <div
                className="w-[40px] h-[40px] rounded-full border-2 border-[#4B2C5E] flex items-center justify-center cursor-pointer"
                onClick={handlePhoneClick}
              >
                <div className="relative w-[20px] h-[20px]">
                  <img src={CallIcon} alt="Phone Icon" className="absolute top-0 left-0 w-full h-full" />
                </div>
              </div>
              <p 
                data-dialics="true"
                className="font-helvetica font-bold text-[20px] text-[#4B2C5E] m-0"
              >
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Desktop Navbar */}
      <div className="hidden md:block fixed top-0 left-0 w-full bg-[#FAF3EC] z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between p-[20px] px-[50px] bg-[#FAF3EC] w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="p-[8px] px-[15px] rounded-[4px] ml-24">
              <a href="/"> 
                <img
                  src={logo}
                  alt="Mesotheliamo Logo"
                  className="h-[auto] w-[150px]" 
                />
              </a>
            </div>
 
           
          </div>
 
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center justify-center">
                <div
                  className="w-[48px] h-[48px] rounded-full border-2 border-[#4B2C5E] flex items-center justify-center cursor-pointer"
                  onClick={handlePhoneClick}
                >
                  <div className="relative w-[24px] h-[24px]">
                    <img src={CallIcon} alt="Phone Icon" className="absolute top-0 left-0 w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="font-helvetica font-normal text-[16px] text-[#4B2C5E] m-0 mb-[5px]">Call Us For Help</p>
                <p 
                  data-dialics="true"
                  className="font-helvetica font-bold text-[24px] text-[#4B2C5E] m-0"
                >
                  {phoneNumber}
                </p>
              </div>
            </div>
            <div
              className="bg-[#4B2C5E] rounded-[60px] p-[10px] px-[20px] cursor-pointer ml-[25px]"
              
            >
              <span className="font-helvetica font-bold text-[20px] text-[#F5E7DA]">File Claim</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default NavBarSubDomains;