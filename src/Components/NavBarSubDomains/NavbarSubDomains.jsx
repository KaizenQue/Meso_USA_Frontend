import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Drawer from "../../assets/drawer.png";
import CallIcon from "../../assets/phoneIcon.png";
import logo from "../../assets/Meso logo-01 1.png";

const NavbarSubDomains = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "(888) 212-8149";

  useEffect(() => {
    // Add padding to body to prevent content from hiding behind fixed navbar
    document.body.classList.add("pt-[73px]", "md:pt-[73px]");

    return () => {
      document.body.classList.remove("pt-[73px]", "md:pt-[73px]");
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
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

      <div
        className={`md:hidden fixed top-0 left-0 w-full z-[1000] bg-[#FAF3EC] transition-opacity duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between p-[15px] relative z-[1001]">
          <div className=" p-[8px] px-[15px] rounded-[4px]">
            <a href="/">
              <img
                src={logo}
                alt="Mesotheliamo Logo"
                className="h-[auto] w-[100px]"
              />
            </a>
          </div>

          <div className="flex items-center gap-[12px]">
           <div className="flex flex-row items-center justify-between">
            <div
              className="bg-[#4B2C5E] rounded-[60px] p-[10px] px-[20px] cursor-pointer ml-[25px]"
              
            >
              <span className="font-helvetica font-bold text-[20px] text-[#F5E7DA]">
                {phoneNumber}
              </span>
            </div>
          </div>

            {/* <button
              onClick={toggleMenu}
              className="w-[40px] h-[40px] flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              aria-label="Toggle navigation menu"
            >
              <img
                src={Drawer}
                alt="Menu"
                className="w-[24px] h-[24px] object-contain"
              />
            </button> */}
          </div>
        </div>
      </div>

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
            <div
              className="bg-[#4B2C5E] rounded-[60px] p-[10px] px-[20px] cursor-pointer ml-[25px]"
              onClick={() => navigate("/ClaimForm")}
            >
              <span className="font-helvetica font-bold text-[20px] text-[#F5E7DA]">
                {phoneNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarSubDomains;
