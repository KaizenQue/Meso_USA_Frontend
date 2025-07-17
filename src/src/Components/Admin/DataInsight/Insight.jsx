import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { MapPin, Clipboard, TrendingUp, Filter, Search, X } from "lucide-react";
import SpendByRegionChart from "./SpendByRegionChart";
import SpendByCategoryChart from "./SpendByCategoryChart";
const regionData = [
  { name: "North America", value: 4300000 },
  { name: "Europe", value: 3200000 },
  { name: "Asia Pacific", value: 2800000 },
  { name: "South America", value: 1900000 },
  { name: "Africa", value: 900000 },
];

const categoryData = [
  { name: "Grains", value: 7700 },
  { name: "Dairy", value: 2800 },
  { name: "Oranges", value: 2000 },
  { name: "Meat", value: 5000 },
  { name: "Beverages", value: 16000 },
];

const monthlyData = [
  { name: "Jan", spent: 2400000, orders: 440 },
  { name: "Feb", spent: 1800000, orders: 390 },
  { name: "Mar", spent: 2900000, orders: 510 },
  { name: "Apr", spent: 2700000, orders: 490 },
  { name: "May", spent: 3100000, orders: 540 },
  { name: "Jun", spent: 2800000, orders: 510 },
  { name: "Jul", spent: 3300000, orders: 570 },
  { name: "Aug", spent: 3500000, orders: 610 },
  { name: "Sep", spent: 3000000, orders: 530 },
  { name: "Oct", spent: 3200000, orders: 550 },
  { name: "Nov", spent: 3400000, orders: 580 },
  { name: "Dec", spent: 3800000, orders: 640 },
];

const supplierData = [
  {
    id: 1,
    name: "FarmCo Produce",
    category: "Produce",
    region: "North America",
    spend: 1240000,
    orders: 128,
    status: "On Time",
  },
  {
    id: 2,
    name: "Global Grain Supply",
    category: "Grains",
    region: "Europe",
    spend: 980000,
    orders: 87,
    status: "Delayed",
  },
  {
    id: 3,
    name: "Premium Dairy",
    category: "Dairy",
    region: "North America",
    spend: 870000,
    orders: 104,
    status: "On Time",
  },
  {
    id: 4,
    name: "Pacific Meats",
    category: "Meat",
    region: "Asia Pacific",
    spend: 1120000,
    orders: 95,
    status: "On Time",
  },
  {
    id: 5,
    name: "Beverage Distributors",
    category: "Beverages",
    region: "Europe",
    spend: 750000,
    orders: 62,
    status: "At Risk",
  },
  {
    id: 6,
    name: "South Farms Cooperative",
    category: "Produce",
    region: "South America",
    spend: 680000,
    orders: 76,
    status: "On Time",
  },
  {
    id: 7,
    name: "Quality Grains",
    category: "Grains",
    region: "Asia Pacific",
    spend: 890000,
    orders: 81,
    status: "Delayed",
  },
  {
    id: 8,
    name: "Organic Dairy Products",
    category: "Dairy",
    region: "Europe",
    spend: 720000,
    orders: 68,
    status: "On Time",
  },
];

const insightData = [
  {
    id: 1,
    title: "Seasonal Produce Price Increase",
    description:
      "Produce prices from South American suppliers are expected to rise 12% in Q4 due to seasonal changes.",
    impact: "High",
    category: "Price Trend",
  },
  {
    id: 2,
    title: "Supply Chain Disruption",
    description:
      "Logistics delays affecting grain shipments from Europe, potentially impacting production schedules.",
    impact: "Medium",
    category: "Risk Alert",
  },
  {
    id: 3,
    title: "New Supplier Opportunity",
    description:
      "New organic dairy supplier in North America offering competitive rates on bulk orders.",
    impact: "Medium",
    category: "Opportunity",
  },
  {
    id: 4,
    title: "Order Consolidation Savings",
    description:
      "Consolidating orders from 3 beverage suppliers could save approximately $180,000 annually.",
    impact: "High",
    category: "Cost Saving",
  },
];

// Color constants
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFC"];
const STATUS_COLORS = {
  "On Time": "bg-emerald-100 text-emerald-800",
  Delayed: "bg-amber-100 text-amber-800",
  "At Risk": "bg-rose-100 text-rose-800",
};
const IMPACT_COLORS = {
  High: "bg-rose-100 text-rose-800",
  Medium: "bg-amber-100 text-amber-800",
  Low: "bg-emerald-100 text-emerald-800",
};

const formatCurrency = (value) => {
  return `$${(value / 1000000).toFixed(2)}M`;
};

const Insight = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredSuppliers = supplierData.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || supplier.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {showFilters && (
                <div className="bg-white border-b border-gray-200 py-3 px-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Region
                        </label>
                        <select
                          className="rounded-md border border-gray-300 p-2 text-sm"
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                          <option>All</option>
                          <option>North America</option>
                          <option>Europe</option>
                          <option>Asia Pacific</option>
                          <option>South America</option>
                          <option>Africa</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-3">
                <div className="flex space-x-4 mb-4 mt-3">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      selectedTab === "overview"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      selectedTab === "suppliers"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedTab("suppliers")}
                  >
                    Suppliers
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      selectedTab === "insights"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedTab("insights")}
                  >
                    Insights
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Search className="h-4 w-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Countries
                  </h3>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold">47</p>
                <p className="text-sm text-gray-500 mt-1">
                  +4% vs previous period
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Active Contracts
                  </h3>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clipboard className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold">937</p>
                <p className="text-sm text-gray-500 mt-1">
                  +22% vs previous period
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Purchase Orders
                  </h3>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold">5,891</p>
                <p className="text-sm text-gray-500 mt-1">YTD (Year to Date)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Monthly Procurement Trends
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" tickFormatter={formatCurrency} />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value, name) =>
                          name === "spent" ? formatCurrency(value) : value
                        }
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="spent"
                        name="Spend"
                        stroke="#0088FE"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="orders"
                        name="Orders"
                        stroke="#00C49F"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpendByRegionChart regionData={regionData} />
                <SpendByCategoryChart categoryData={categoryData} />
                
              </div>
            </div>
          </div>
        )}

        {selectedTab === "suppliers" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Supplier
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Region
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Annual Spend
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Orders
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {supplier.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {supplier.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {supplier.region}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(supplier.spend)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {supplier.orders}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          STATUS_COLORS[supplier.status]
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "insights" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Procurement Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insightData.map((insight) => (
                  <div
                    key={insight.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-md font-medium text-gray-900">
                        {insight.title}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          IMPACT_COLORS[insight.impact]
                        }`}
                      >
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {insight.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">
                        {insight.category}
                      </span>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Insight;
