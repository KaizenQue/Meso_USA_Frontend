import React from 'react'

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-[1001]">
      <div className="w-full bg-[#dcc0a7] overflow-hidden py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center mr-8">
              <span className="font-sans text-lg text-[#4B2C5E] font-normal">
                Download the complete guide to mesothelioma e-book now
              </span>
              <span className="text-[#F8F2E9] mx-2 text-base">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
