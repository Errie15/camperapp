'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface WeatherTip {
  condition: string;
  description: string;
  campingAdvice: string;
  safetyTips: string[];
}

const weatherTips: WeatherTip[] = [
  {
    condition: "Clear Skies",
    description: "Perfect visibility with minimal cloud cover",
    campingAdvice: "Ideal for stargazing and night activities. Consider setting up minimal rain protection.",
    safetyTips: [
      "Still bring rain gear as backup",
      "Watch for sudden weather changes",
      "Set up sun protection during day"
    ]
  },
  {
    condition: "Partly Cloudy",
    description: "Mix of sun and clouds with good visibility",
    campingAdvice: "Good conditions for most camping activities. Set up moderate weather protection.",
    safetyTips: [
      "Monitor cloud patterns",
      "Have rain gear accessible",
      "Check weather updates regularly"
    ]
  },
  {
    condition: "Rain Likely",
    description: "High chance of precipitation",
    campingAdvice: "Ensure waterproof setup and prepare indoor activities.",
    safetyTips: [
      "Set up proper drainage around tent",
      "Keep equipment dry and protected",
      "Know flash flood risks in your area"
    ]
  }
];

export default function WeatherPage() {
  const [selectedTip, setSelectedTip] = useState<WeatherTip | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Weather Guide for Campers</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Learn to read weather patterns and make informed camping decisions
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <span className="block font-semibold text-gray-800">Weather Patterns</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/>
                <path d="M8 15l4-4 4 4"/>
              </svg>
              <span className="block font-semibold text-gray-800">Pressure Systems</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/>
              </svg>
              <span className="block font-semibold text-gray-800">Wind Direction</span>
            </div>
          </div>
        </section>

        {/* Weather Tips Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {weatherTips.map((tip) => (
            <div
              key={tip.condition}
              className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
              onClick={() => setSelectedTip(tip)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{tip.condition}</h3>
              <p className="text-gray-800 mb-6">{tip.description}</p>
              <span className="link-outdoors inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                View Details
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          ))}
        </section>

        {/* Live Weather Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Live Weather Updates</h2>
          <div className="bg-white/80 p-6 rounded-lg">
            <p className="text-gray-800 mb-4">
              Connect your location to get real-time weather updates and camping recommendations.
            </p>
            <button className="btn-woodsman">
              Enable Location
            </button>
          </div>
        </section>

        {/* Weather Tip Modal */}
        {selectedTip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTip.condition}</h2>
                <button
                  onClick={() => setSelectedTip(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedTip.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Camping Advice</h3>
                  <p className="text-gray-700">{selectedTip.campingAdvice}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Safety Tips</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTip.safetyTips.map((tip, index) => (
                      <li key={index} className="mb-2">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 