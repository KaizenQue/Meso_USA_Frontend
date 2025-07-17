import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Bell, AlertTriangle, Map, Filter, ArrowUpDown } from 'lucide-react';
const anomalyData = [
  { id: 1, supplier: 'Fresh Farms Co.', region: 'North America', country: 'USA', category: 'Milk', amount: 82500, expected: 65000, date: '2025-03-01', severity: 'high', type: 'Unexpectedly High Purchase' },
  { id: 2, supplier: 'Global Grain Ltd.', region: 'Europe', country: 'France', category: 'Grains', amount: 12300, expected: 45000, date: '2025-03-02', severity: 'high', type: 'Unexpectedly Low Purchase' },
  { id: 3, supplier: 'Exotic Spices Inc.', region: 'Asia', country: 'India', category: 'Spices', amount: 28700, expected: 25000, date: '2025-03-03', severity: 'low', type: 'Slight Deviation' },
  { id: 4, supplier: 'Southern Dairy', region: 'North America', country: 'Mexico', category: 'Dairy', amount: 33400, expected: 30000, date: '2025-03-05', severity: 'medium', type: 'Irregular Pattern' },
  { id: 5, supplier: 'Organic Orchards', region: 'South America', country: 'Brazil', category: 'Oranges', amount: 57800, expected: 40000, date: '2025-03-07', severity: 'medium', type: 'Unexpected Volume' },
  { id: 6, supplier: 'Herbal tea', region: 'South America', country: 'Brazil', category: 'Tea', amount: 57800, expected: 40000, date: '2025-03-07', severity: 'medium', type: 'Unexpected Volume' },
];

const regionData = [
  { name: 'North America', value: 2 },
  { name: 'Europe', value: 1 },
  { name: 'Asia', value: 1 },
  { name: 'South America', value: 1 },
];

const categoryData = [
  { name: 'Produce', value: 2 },
  { name: 'Grains', value: 1 },
  { name: 'Spices', value: 1 },
  { name: 'Dairy', value: 1 },
];

const trendData = [
  { name: 'Jan', normal: 120, anomalies: 5 },
  { name: 'Feb', normal: 150, anomalies: 8 },
  { name: 'Mar', normal: 170, anomalies: 12 },
  { name: 'Apr', normal: 165, anomalies: 10 },
  { name: 'May', normal: 190, anomalies: 7 },
  { name: 'Jun', normal: 210, anomalies: 9 },
];

const SupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Supply Chain Analytics</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
                <Filter size={16} className="mr-2" />
                <span>Filters</span>
              </button>
            </div>
            <div className="relative">
              <Bell size={20} className="text-gray-600 cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">5</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'anomalies' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab('anomalies')}
          >
            Anomaly Detection
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Anomalies Detected</h3>
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle size={20} className="text-red-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">5</p>
                <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Affected Regions</h3>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Map size={20} className="text-blue-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">4</p>
                <p className="text-sm text-gray-500 mt-1">Across 3 continents</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">High Severity</h3>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <AlertTriangle size={20} className="text-yellow-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">2</p>
                <p className="text-sm text-gray-500 mt-1">Require immediate action</p>
              </div>
            </div>

            <div className="col-span-3 lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">Anomaly Trends</h3>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-600">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="normal" 
                      name="Normal Transactions"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 3 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="anomalies" 
                      name="Anomalies"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-3 lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Anomalies by Region</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      name="Anomalies"
                      fill="url(#colorGradient)" 
                      radius={[0, 4, 4, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#93c5fd" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Detected Anomalies</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600">
                  <option>All Severities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600">
                  <option>All Regions</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>South America</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Supplier
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Region/Country
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Category
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Expected
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Type
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Severity
                        <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.supplier}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.region} / {item.country}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.expected.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${item.severity === 'high' ? 'bg-red-100 text-red-800' : 
                              item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'}`}
                        >
                          {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupplyChainDashboard;