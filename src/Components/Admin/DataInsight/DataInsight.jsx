import React from "react";
import ChoroplethMap from "./MapComponent";
import Insight from "./Insight";

const DataInsight = () => {
  return (
    <div className="flex min-h-screen flex-col p-4 space-y-6">
      <div className="h-[500px] bg-white shadow-lg rounded-2xl overflow-hidden">
        <ChoroplethMap />
      </div>
      <Insight />
    </div>
  );
};

export default DataInsight;
