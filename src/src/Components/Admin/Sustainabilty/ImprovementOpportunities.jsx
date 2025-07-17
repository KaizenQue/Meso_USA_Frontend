import React from "react";
import { Truck, Factory, Award, ArrowRight } from "lucide-react";
import { improvementOpportunities } from "./EmissionData";

const ImprovementOpportunities = () => {
  const iconMap = {
    Truck: Truck,
    Factory: Factory,
    Award: Award,
  };

  const renderOpportunityCard = (opportunity, index) => {
    const IconComponent = iconMap[opportunity.icon];
    return (
      <div 
        key={index} 
        className={`bg-white p-4 rounded-lg shadow border-t-4 border-${opportunity.color}-500`}
      >
        <div className="flex items-start mb-3">
          <div className={`bg-${opportunity.color}-100 p-2 rounded-full mr-3`}>
            <IconComponent size={20} className={`text-${opportunity.color}-600`} />
          </div>
          <div>
            <h4 className="font-medium text-slate-800">{opportunity.title}</h4>
            <p className="text-sm text-slate-500">
              {opportunity.reductionPotential}% reduction potential
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          {opportunity.description}
        </p>
        <button className={`text-sm text-${opportunity.color}-600 font-medium flex items-center`}>
          Take Action <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-slate-700 mb-4">
        Improvement Opportunities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {improvementOpportunities.map((opportunity, index) => (
          renderOpportunityCard(opportunity, index)
        ))}
      </div>
    </div>
  );
};

export default ImprovementOpportunities;