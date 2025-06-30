import React from "react";

const supplierData = [
  { name: "Supplier A", emissions: 28, change: -15 },
  { name: "Supplier B", emissions: 22, change: -8 },
  { name: "Supplier C", emissions: 18, change: 5 },
  { name: "Supplier D", emissions: 17, change: -12 },
];

const SuppliersTable = () => {
  return (
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
  );
};

export default SuppliersTable;