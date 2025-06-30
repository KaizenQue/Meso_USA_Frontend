import React from "react";
import EmissionCards from "./EmissionCards";
import EmissionCharts from "./EmissionCharts";
import ImprovementOpportunities from "./ImprovementOpportunities";
import SuppliersTable from "./SuppliersTable";

const EmissionDashboard = () => {
  return (
    <div className="p-3">
      <EmissionCards />
      <EmissionCharts />
      <ImprovementOpportunities />
      <SuppliersTable />
    </div>
  );
};

export default EmissionDashboard;