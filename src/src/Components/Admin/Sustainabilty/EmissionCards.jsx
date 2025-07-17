import React from "react";
import { TrendingDown, AlertTriangle } from "lucide-react";
import InfoTooltip from "./InfoTooltip";
import { metricsData } from "./EmissionData";

const EmissionCards = () => {
  const { totalEmissions, carbonIntensity, scope3Emissions, targetGap } = metricsData;

  const renderMetricCard = (data, title, borderColor) => {
    return (
      <div className={`bg-white p-4 rounded-lg shadow border-l-4 border-${borderColor}-500`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          {data.tooltip && <InfoTooltip content={data.tooltip} />}
        </div>
        <div className="flex items-end mt-1">
          <span className="text-2xl font-bold">{data.value > 0 ? '+' : ''}{data.value}</span>
          <span className="text-sm ml-1 mb-0.5">{data.unit}</span>
          <span className={`ml-2 ${data.isOverTarget ? 'text-amber-600' : 'text-green-600'} flex items-center text-sm`}>
            {data.isOverTarget ? (
              <AlertTriangle size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {data.change}%{data.isOverTarget ? ' over' : ''}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {renderMetricCard(totalEmissions, "Total Emissions", "green")}
      {renderMetricCard(carbonIntensity, "Carbon Intensity", "blue")}
      {renderMetricCard(scope3Emissions, "Scope 3 Emissions", "purple")}
      {renderMetricCard(targetGap, "Target Gap", "yellow")}
    </div>
  );
};

export default EmissionCards;