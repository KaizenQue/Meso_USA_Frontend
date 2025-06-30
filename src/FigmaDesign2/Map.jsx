"use client"

import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

// USA GeoJSON data
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// State data with additional information
const stateData = {
  Alabama: { population: "4.9M", capital: "Montgomery" },
  Alaska: { population: "0.7M", capital: "Juneau" },
  Arizona: { population: "7.3M", capital: "Phoenix" },
  Arkansas: { population: "3.0M", capital: "Little Rock" },
  California: { population: "39.5M", capital: "Sacramento" },
  Colorado: { population: "5.8M", capital: "Denver" },
  Connecticut: { population: "3.6M", capital: "Hartford" },
  Delaware: { population: "1.0M", capital: "Dover" },
  Florida: { population: "21.5M", capital: "Tallahassee" },
  Georgia: { population: "10.6M", capital: "Atlanta" },
  Hawaii: { population: "1.4M", capital: "Honolulu" },
  Idaho: { population: "1.8M", capital: "Boise" },
  Illinois: { population: "12.7M", capital: "Springfield" },
  Indiana: { population: "6.7M", capital: "Indianapolis" },
  Iowa: { population: "3.2M", capital: "Des Moines" },
  Kansas: { population: "2.9M", capital: "Topeka" },
  Kentucky: { population: "4.5M", capital: "Frankfort" },
  Louisiana: { population: "4.6M", capital: "Baton Rouge" },
  Maine: { population: "1.3M", capital: "Augusta" },
  Maryland: { population: "6.0M", capital: "Annapolis" },
  Massachusetts: { population: "6.9M", capital: "Boston" },
  Michigan: { population: "10.0M", capital: "Lansing" },
  Minnesota: { population: "5.6M", capital: "St. Paul" },
  Mississippi: { population: "3.0M", capital: "Jackson" },
  Missouri: { population: "6.1M", capital: "Jefferson City" },
  Montana: { population: "1.1M", capital: "Helena" },
  Nebraska: { population: "1.9M", capital: "Lincoln" },
  Nevada: { population: "3.1M", capital: "Carson City" },
  "New Hampshire": { population: "1.4M", capital: "Concord" },
  "New Jersey": { population: "8.9M", capital: "Trenton" },
  "New Mexico": { population: "2.1M", capital: "Santa Fe" },
  "New York": { population: "19.5M", capital: "Albany" },
  "North Carolina": { population: "10.5M", capital: "Raleigh" },
  "North Dakota": { population: "0.8M", capital: "Bismarck" },
  Ohio: { population: "11.7M", capital: "Columbus" },
  Oklahoma: { population: "4.0M", capital: "Oklahoma City" },
  Oregon: { population: "4.2M", capital: "Salem" },
  Pennsylvania: { population: "12.8M", capital: "Harrisburg" },
  "Rhode Island": { population: "1.1M", capital: "Providence" },
  "South Carolina": { population: "5.1M", capital: "Columbia" },
  "South Dakota": { population: "0.9M", capital: "Pierre" },
  Tennessee: { population: "6.8M", capital: "Nashville" },
  Texas: { population: "29.0M", capital: "Austin" },
  Utah: { population: "3.2M", capital: "Salt Lake City" },
  Vermont: { population: "0.6M", capital: "Montpelier" },
  Virginia: { population: "8.5M", capital: "Richmond" },
  Washington: { population: "7.6M", capital: "Olympia" },
  "West Virginia": { population: "1.8M", capital: "Charleston" },
  Wisconsin: { population: "5.8M", capital: "Madison" },
  Wyoming: { population: "0.6M", capital: "Cheyenne" },
}

// Get array of state names for the dropdown
const stateNames = Object.keys(stateData).sort()

// Colors for different state regions
const regionColors = {
  West: "#8B5CF6",      // violet-500
  Midwest: "#6366F1",   // indigo-500
  Northeast: "#7C3AED", // violet-600
  South: "#4F46E5",     // indigo-600
}

export default function Home({ highlightOnHover = true }) {
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [selectedState, setSelectedState] = useState("")
  const [isMapClickable, setIsMapClickable] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogState, setDialogState] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "New York",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMapVisible, setIsMapVisible] = useState(false)

  // Add useEffect for initial animation
  useEffect(() => {
    setIsMapVisible(true)
    if (stateData["New York"]) {
      setTooltipContent(`
        New York
        Population: ${stateData["New York"].population}
        Capital: ${stateData["New York"].capital}
      `);
      setTooltipPosition({ x: 400, y: 200 });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }))
    setSelectedState(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with data:", formData)
    setIsSubmitted(true)
    
    // Reset form after submission with slight delay
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        state: "",
      })
      setIsSubmitted(false)
      setSelectedState("")
    }, 3000)
  }

  const handleStateClick = (stateName) => {
    if (!isMapClickable) return;
    setSelectedState(stateName);
    setFormData(prev => ({ ...prev, state: stateName }));
    setDialogState(stateData[stateName]);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setDialogState(null);
  };

  return (
    <main className=" bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent animate-slide-down">USA Interactive Map</h2>
          <p className="text-xl text-gray-600 animate-slide-up">Explore states and register for updates</p>
        </div>

        {/* Map and Form Section - Side by Side */}
        <div className="grid grid-cols-1 gap-2 sm:gap-10">
          {/* Map Section - Full width */}
          <div className={`bg-white rounded-2xl shadow-2xl p-1 sm:p-6 border border-violet-200/50 relative transition-all duration-700 transform ${isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Map Controls */}
            {/* <div className="flex justify-end mb-1 sm:mb-4">
              <button
                onClick={() => setIsMapClickable(!isMapClickable)}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isMapClickable 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isMapClickable ? 'Disable Map Selection' : 'Enable Map Selection'}
              </button>
            </div> */}

            <div className="w-full aspect-[16/16] sm:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-violet-50 to-indigo-50 p-0.5 sm:p-4 border border-violet-100">
              <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const isSelected = selectedState === stateName;
                      const isHovered = highlightOnHover && tooltipContent.includes(stateName);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e) => {
                            if (!highlightOnHover || !isMapClickable) return;
                            const { name } = geo.properties;
                            if (stateData[name]) {
                              setTooltipContent(`
                                ${name}
                                Population: ${stateData[name].population}
                                Capital: ${stateData[name].capital}
                              `);
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              setTooltipPosition({ x, y });
                            }
                          }}
                          onMouseLeave={() => {
                            if (!highlightOnHover || !isMapClickable) return;
                            setTooltipContent("");
                          }}
                          onClick={() => handleStateClick(geo.properties.name)}
                          style={{
                            default: {
                              fill: isSelected ? "#8B5CF6" : "#F8FAFC",
                              opacity: isSelected ? 1 : 0.9,
                              stroke: "#FFFFFF",
                              strokeWidth: isSelected ? 2 : 1,
                              outline: "none",
                              transition: "all 0.3s ease",
                            },
                            hover: {
                              fill: isMapClickable && isHovered ? "#8B5CF6" : (isSelected ? "#8B5CF6" : "#F8FAFC"),
                              opacity: isMapClickable && isHovered ? 0.95 : (isSelected ? 1 : 0.9),
                              stroke: "#FFFFFF",
                              strokeWidth: isMapClickable && isHovered ? 1.5 : (isSelected ? 2 : 1),
                              outline: "none",
                              cursor: isMapClickable ? "pointer" : "default",
                              transition: "all 0.3s ease",
                            },
                            pressed: {
                              fill: "#7C3AED",
                              outline: "none",
                              transition: "all 0.2s ease",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
            
            {/* Floating Tooltip */}
            {tooltipContent && highlightOnHover && (
              <div 
                className="absolute bg-white/95 backdrop-blur-sm border border-violet-200 rounded-xl p-3 shadow-lg transform transition-all duration-300 ease-in-out animate-fade-in max-w-[200px] sm:max-w-none"
                style={{
                  left: `${tooltipPosition.x + 10}px`,
                  top: `${tooltipPosition.y + 10}px`,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 1000,
                  maxWidth: '90vw',
                  wordBreak: 'break-word'
                }}
              >
                <pre className="whitespace-pre-line text-violet-700 font-medium text-sm">{tooltipContent}</pre>
              </div>
            )}

            {/* State Statistics Dialog */}
            {showDialog && dialogState && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
                  <button
                    onClick={handleCloseDialog}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                  <h2 className="text-2xl font-bold text-violet-700 mb-4">{selectedState}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-semibold text-violet-700">{dialogState.population}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Capital:</span>
                      <span className="font-semibold text-violet-700">{dialogState.capital}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Section - Commented out
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-violet-200/50 transition-all duration-700 transform ${isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="p-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2 animate-slide-down">Register</h3>
              <p className="text-gray-600 mb-6 animate-slide-up">Stay informed about your favorite states</p>
              
              {isSubmitted ? (
                <div className="bg-slate-50 border border-violet-200 rounded-xl p-6 flex flex-col items-center justify-center animate-fade-in">
                  <div className="h-14 w-14 bg-violet-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <svg className="h-7 w-7 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-violet-700 mb-2 animate-slide-down">Thank You!</h4>
                  <p className="text-violet-700/80 text-center animate-slide-up">
                    Your registration has been received. We'll send updates about {formData.state ? formData.state : "your selected state"}.
                  </p>
                </div>
              ) : (
                <>
                  {selectedState && (
                    <div className="mb-6 p-4 bg-slate-50 border border-violet-200 rounded-xl animate-fade-in">
                      <p className="font-semibold text-violet-700 text-lg">{selectedState}</p>
                      <p className="text-sm text-violet-700/80 mt-1">
                        Population: {stateData[selectedState]?.population} • 
                        Capital: {stateData[selectedState]?.capital}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="animate-slide-up">
                      <label htmlFor="firstName" className="block text-sm font-medium text-violet-700 mb-1.5">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-violet-200 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-slate-50 hover:border-violet-300"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                      <label htmlFor="lastName" className="block text-sm font-medium text-violet-700 mb-1.5">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-violet-200 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-slate-50 hover:border-violet-300"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                      <label htmlFor="email" className="block text-sm font-medium text-violet-700 mb-1.5">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-violet-200 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-slate-50 hover:border-violet-300"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                      <label htmlFor="state" className="block text-sm font-medium text-violet-700 mb-1.5">State</label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        disabled
                        className="w-full px-4 py-2.5 border border-violet-200 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-slate-50 hover:border-violet-300"
                      >
                        <option value="">Select a state</option>
                        {stateNames.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-violet-700/60">Or click directly on the map</p>
                    </div>

                    <div className="pt-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Register Now
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          */}
        </div>
      </section>
    </main>
  )
}

// Add these styles at the top of your file, after the imports
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}