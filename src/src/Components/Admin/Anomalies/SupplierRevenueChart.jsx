import { motion } from "framer-motion";
import { useState } from "react";

const suppliers = [
  { name: "Fresh Farms Co", progress: 70 },
  { name: "Global Grain Ltd", progress: 50 },
  { name: "Exotic Spices Inc", progress: 90 },
  { name: "Southern Dairy", progress: 30 },
];

const products = [
  { name: "Milk", progress: 60 },
  { name: "Grains", progress: 80 },
  { name: "Spices", progress: 45 },
  { name: "Dairy", progress: 90 },
];

const regions = [
  { name: "North America", progress: 85 },
  { name: "Europe", progress: 75 },
  { name: "Asia", progress: 60 },
  { name: "Africa", progress: 40 },
];

const tabs = {
  suppliers,
  products,
  regions,
};

export default function SupplierRevenueChart() {
  const [selectedTab, setSelectedTab] = useState("suppliers");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabChange("suppliers")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "suppliers"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Suppliers
        </button>
        <button
          onClick={() => handleTabChange("products")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "products"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => handleTabChange("regions")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "regions"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Regions
        </button>
      </div>

      <div className="space-y-2">
        {tabs[selectedTab].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="p-2 rounded-md shadow-sm flex items-center border"
          >
            <p className="text-sm font-semibold text-gray-600 mr-4 w-1/3">
              {item.name}
            </p>

            <div className="flex-1 flex items-center">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-500 ml-2">
                {item.progress}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
