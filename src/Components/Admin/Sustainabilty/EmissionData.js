
export const emissionsData = [
    { year: "2022", value: 120, target: 110 },
    { year: "2023", value: 100, target: 90 },
    { year: "2024", value: 85, target: 70 },
    { year: "2025", value: 65, target: 60, projected: true },
  ];
  
  export const categoryData = [
    { name: "Transport", current: 45, previous: 55 },
    { name: "Processing", current: 30, previous: 35 },
    { name: "Packaging", current: 15, previous: 25 },
    { name: "Storage", current: 10, previous: 15 },
  ];
  
  export const supplierData = [
    { name: "Supplier A", emissions: 28, change: -15 },
    { name: "Supplier B", emissions: 22, change: -8 },
    { name: "Supplier C", emissions: 18, change: 5 },
    { name: "Supplier D", emissions: 17, change: -12 },
  ];
  
  export const metricsData = {
    totalEmissions: {
      value: 65,
      unit: "tCO2e",
      change: -23.5,
      tooltip: "Emission factors are values that convert activity data (like fuel used or distance traveled) into CO2 equivalent emissions. Lower is better.",
    },
    carbonIntensity: {
      value: 0.42,
      unit: "kgCO2e/kg",
      change: -18.2,
      tooltip: "Carbon intensity measures the amount of CO2 emitted per unit of output or activity. It helps identify high-impact areas in your supply chain.",
    },
    scope3Emissions: {
      value: 52,
      unit: "tCO2e",
      change: -15.7,
      tooltip: "Scope 3 emissions are indirect emissions from your value chain, including both upstream (suppliers) and downstream (distribution) activities.",
    },
    targetGap: {
      value: 5,
      unit: "tCO2e",
      change: 8.3,
      isOverTarget: true,
    },
  };
  
  export const improvementOpportunities = [
    {
      title: "Transportation",
      icon: "Truck",
      color: "green",
      reductionPotential: 18,
      description: "Switch 30% of regional deliveries to electric vehicles",
    },
    {
      title: "Processing",
      icon: "Factory",
      color: "blue",
      reductionPotential: 12,
      description: "Upgrade processing equipment to energy-efficient models",
    },
    {
      title: "Supplier Transition",
      icon: "Award",
      color: "purple",
      reductionPotential: 15,
      description: "Switch two high-emission suppliers to certified green alternatives",
    },
  ];