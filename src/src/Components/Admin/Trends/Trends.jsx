import React from "react";
import SupplyChainDashboard from "./SupplyChainDashboard";

const Trends = () => {
  return (
    <div className="flex h-screen-auto">
      <div className="flex-1 p-6 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
        
          <SupplyChainDashboard />
        </div>
      </div>
    </div>
  );
};

export default Trends;
