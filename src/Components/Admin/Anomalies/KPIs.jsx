
import React from 'react';
import { TrendingUp, MapPin, AlertTriangle, Filter } from 'lucide-react';

const KPIs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Spend</p>
            <p className="text-2xl font-semibold text-gray-800">$12.4M</p>
            <p className="text-xs text-green-600 mt-1">+5.2% from last month</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-md">
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Active Suppliers</p>
            <p className="text-2xl font-semibold text-gray-800">342</p>
            <p className="text-xs text-gray-500 mt-1">-2 from last month</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-md">
            <MapPin className="h-5 w-5 text-purple-500" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Recent Anomalies</p>
            <p className="text-2xl font-semibold text-gray-800">12</p>
            <p className="text-xs text-red-600 mt-1">+3 from last month</p>
          </div>
          <div className="p-2 bg-red-50 rounded-md">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">On-time Delivery</p>
            <p className="text-2xl font-semibold text-gray-800">92.7%</p>
            <p className="text-xs text-green-600 mt-1">+1.3% from last month</p>
          </div>
          <div className="p-2 bg-green-50 rounded-md">
            <Filter className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIs;