

import React, { useState } from 'react';
import { Calendar, BarChart3, TrendingUp, Cloud, Map, ChevronRight } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';
import SeasonalTrends from './SeasonalTrends';
import RegionalDistribution from './RegionalDistribution';
import ClimateImpact from './ClimateImpact';
import TemperatureYield from './TemperatureYield';
import SupplierTable from './SupplierTable';
import { 
  seasonalTrendData, 
  regionsData, 
  regionSuppliers, 
  climateImpactData 
} from './dashboardData';

const SupplyChainDashboard = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [seasonalTrend, setSeasonalTrend] = useState(seasonalTrendData.year);
  const [regions, setRegions] = useState(regionsData.year);
  const [suppliers, setSuppliers] = useState(regionSuppliers.year);
  const [climateImpact, setClimateImpact] = useState(climateImpactData.year);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setSeasonalTrend(seasonalTrendData[range]);
    setRegions(regionsData[range]);
    setSuppliers(regionSuppliers[range]);
    setClimateImpact(climateImpactData[range]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seasonal Analytics</h1>
        <p className="text-gray-600 mt-2">Track seasonal trends and climate impacts on your procurement activities</p>
      </div>
      
      <TimeRangeSelector 
        timeRange={timeRange} 
        handleTimeRangeChange={handleTimeRangeChange} 
      />
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Seasonal Product Trends</h2>
           
          </div>
          <SeasonalTrends data={seasonalTrend} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Regional Distribution</h2>
            
          </div>
          <RegionalDistribution data={regions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Climate Impact on Supply Chain</h2>
           
          </div>
          <ClimateImpact data={climateImpact} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Temperature vs Product Yield</h2>
        
          </div>
          <TemperatureYield data={seasonalTrend} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Supplier Distribution by Region</h2>
        </div>
        <SupplierTable suppliers={suppliers} />
      </div>
    </div>
  );
};

export default SupplyChainDashboard;