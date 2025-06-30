import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingDown,
  AlertTriangle,
  Truck,
  Factory,
  Info,
  ArrowRight,
  Award,
} from "lucide-react";

const emissionsData = [
  { year: "2022", value: 120, target: 110 },
  { year: "2023", value: 100, target: 90 },
  { year: "2024", value: 85, target: 70 },
  { year: "2025", value: 65, target: 60, projected: true },
];

const categoryData = [
  { name: "Transport", current: 45, previous: 55 },
  { name: "Processing", current: 30, previous: 35 },
  { name: "Packaging", current: 15, previous: 25 },
  { name: "Storage", current: 10, previous: 15 },
];

const supplierData = [
  { name: "Supplier A", emissions: 28, change: -15 },
  { name: "Supplier B", emissions: 22, change: -8 },
  { name: "Supplier C", emissions: 18, change: 5 },
  { name: "Supplier D", emissions: 17, change: -12 },
];

const Emission = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const tooltips = {
    emissionFactors:
      "Emission factors are values that convert activity data (like fuel used or distance traveled) into CO2 equivalent emissions. Lower is better.",
    carbonIntensity:
      "Carbon intensity measures the amount of CO2 emitted per unit of output or activity. It helps identify high-impact areas in your supply chain.",
    scope3:
      "Scope 3 emissions are indirect emissions from your value chain, including both upstream (suppliers) and downstream (distribution) activities.",
  };

  const showTooltip = (key) => {
    setActiveTooltip(key);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  return (
    <>
    <div className="p-3">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-slate-500">
              Total Emissions
            </h3>
            <div className="relative">
              <Info
                size={16}
                className="text-slate-400 cursor-help"
                onMouseEnter={() => showTooltip("emissionFactors")}
                onMouseLeave={hideTooltip}
              />
              {activeTooltip === "emissionFactors" && (
                <div className="absolute z-10 right-0 w-48 bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                  {tooltips.emissionFactors}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end mt-1">
            <span className="text-2xl font-bold">65</span>
            <span className="text-sm ml-1 mb-0.5">tCO2e</span>
            <span className="ml-2 text-green-600 flex items-center text-sm">
              <TrendingDown size={16} />
              -23.5%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-slate-500">
              Carbon Intensity
            </h3>
            <div className="relative">
              <Info
                size={16}
                className="text-slate-400 cursor-help"
                onMouseEnter={() => showTooltip("carbonIntensity")}
                onMouseLeave={hideTooltip}
              />
              {activeTooltip === "carbonIntensity" && (
                <div className="absolute z-10 right-0 w-48 bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                  {tooltips.carbonIntensity}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end mt-1">
            <span className="text-2xl font-bold">0.42</span>
            <span className="text-sm ml-1 mb-0.5">kgCO2e/kg</span>
            <span className="ml-2 text-green-600 flex items-center text-sm">
              <TrendingDown size={16} />
              -18.2%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-slate-500">
              Scope 3 Emissions
            </h3>
            <div className="relative">
              <Info
                size={16}
                className="text-slate-400 cursor-help"
                onMouseEnter={() => showTooltip("scope3")}
                onMouseLeave={hideTooltip}
              />
              {activeTooltip === "scope3" && (
                <div className="absolute z-10 right-0 w-48 bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                  {tooltips.scope3}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end mt-1">
            <span className="text-2xl font-bold">52</span>
            <span className="text-sm ml-1 mb-0.5">tCO2e</span>
            <span className="ml-2 text-green-600 flex items-center text-sm">
              <TrendingDown size={16} />
              -15.7%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-slate-500">Target Gap</h3>
          </div>
          <div className="flex items-end mt-1">
            <span className="text-2xl font-bold">+5</span>
            <span className="text-sm ml-1 mb-0.5">tCO2e</span>
            <span className="ml-2 text-amber-600 flex items-center text-sm">
              <AlertTriangle size={16} />
              8.3% over
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-slate-700 mb-4">
            Emissions Trend vs Target
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value} tCO2e`,
                  name === "value" ? "Actual" : "Target",
                ]}
                labelFormatter={(value) => `Year: ${value}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Actual"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#6366f1"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-slate-700 mb-4">
            Emissions by Category
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value} tCO2e`,
                  name === "current" ? "Current Year" : "Previous Year",
                ]}
              />
              <Legend />
              <Bar dataKey="previous" name="Previous Year" fill="#94a3b8" />
              <Bar dataKey="current" name="Current Year" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-700 mb-4">
          Improvement Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-t-4 border-green-500">
            <div className="flex items-start mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Truck size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">Transportation</h4>
                <p className="text-sm text-slate-500">
                  18% reduction potential
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Switch 30% of regional deliveries to electric vehicles
            </p>
            <button className="text-sm text-green-600 font-medium flex items-center">
              Take Action <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-t-4 border-blue-500">
            <div className="flex items-start mb-3">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Factory size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">Processing</h4>
                <p className="text-sm text-slate-500">
                  12% reduction potential
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Upgrade processing equipment to energy-efficient models
            </p>
            <button className="text-sm text-blue-600 font-medium flex items-center">
              Take Action <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-t-4 border-purple-500">
            <div className="flex items-start mb-3">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Award size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">
                  Supplier Transition
                </h4>
                <p className="text-sm text-slate-500">
                  15% reduction potential
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Switch two high-emission suppliers to certified green alternatives
            </p>
            <button className="text-sm text-purple-600 font-medium flex items-center">
              Take Action <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-slate-700 mb-4">
          Top Suppliers by Emissions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">
                  Supplier
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">
                  Emissions (tCO2e)
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">
                  YoY Change
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {supplier.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {supplier.emissions}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        supplier.change < 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {supplier.change > 0 ? "+" : ""}
                      {supplier.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default Emission;
