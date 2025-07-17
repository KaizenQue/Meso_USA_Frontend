import React, { useState } from "react";
import { Info } from "lucide-react";

const InfoTooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Info
        size={16}
        className="text-slate-400 cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div className="absolute z-10 right-0 w-48 bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;