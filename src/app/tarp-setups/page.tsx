'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface TarpSetup {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string[];
  materials: string[];
  steps: string[];
  tips: string[];
  weatherRating: {
    rain: number;
    wind: number;
    snow: number;
  };
  image?: string;
}

const tarpSetups: TarpSetup[] = [
  {
    name: "A-Frame Shelter",
    difficulty: "Beginner",
    bestFor: [
      "Basic camping",
      "Light to moderate rain",
      "Quick setup",
      "Most weather conditions"
    ],
    materials: [
      "1 tarp (8x10 ft or larger)",
      "2 trees or poles",
      "Paracord or rope",
      "4-6 tent stakes",
      "Guylines"
    ],
    steps: [
      "Find two trees about 10 feet apart",
      "Tie rope between trees at shoulder height",
      "Drape tarp over rope evenly",
      "Stake out corners at 45-degree angle",
      "Adjust tension for proper drainage"
    ],
    tips: [
      "Ensure center line is tight",
      "Create slight slope for water runoff",
      "Use adjustable knots for easy tensioning",
      "Position entrance away from wind"
    ],
    weatherRating: {
      rain: 4,
      wind: 3,
      snow: 3
    },
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Lean-To Shelter",
    difficulty: "Beginner",
    bestFor: [
      "Open view camping",
      "Directional weather protection",
      "Campfire viewing",
      "Summer camping"
    ],
    materials: [
      "1 tarp (8x10 ft or larger)",
      "2 trees or poles",
      "Paracord or rope",
      "4 tent stakes",
      "Guylines"
    ],
    steps: [
      "Find two trees about 8-10 feet apart",
      "Tie rope high on one end, lower on other",
      "Drape tarp at angle (about 45 degrees)",
      "Stake out bottom corners",
      "Secure sides if needed"
    ],
    tips: [
      "Face opening away from prevailing winds",
      "Angle steeper in heavy rain",
      "Can add side walls for more protection",
      "Good for reflecting campfire heat"
    ],
    weatherRating: {
      rain: 3,
      wind: 2,
      snow: 2
    },
    image: "https://images.unsplash.com/photo-1597181344289-97fcafe34218?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Diamond Shelter",
    difficulty: "Intermediate",
    bestFor: [
      "Minimalist camping",
      "Light weight setup",
      "Variable weather conditions",
      "Limited materials"
    ],
    materials: [
      "1 square tarp",
      "1 central pole or tree",
      "Paracord or rope",
      "4 tent stakes",
      "Guylines"
    ],
    steps: [
      "Find central pole or tree",
      "Attach tarp corner to top of pole",
      "Stake out remaining corners",
      "Adjust tension evenly",
      "Create proper drainage angles"
    ],
    tips: [
      "Use center pole slightly off-center for entrance",
      "Adjust height for headroom vs weather protection",
      "Can raise sides for ventilation",
      "Multiple configuration options possible"
    ],
    weatherRating: {
      rain: 4,
      wind: 4,
      snow: 3
    },
    image: "https://images.unsplash.com/photo-1628628722350-dea3f1c3bb28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function TarpSetupsPage() {
  const [selectedSetup, setSelectedSetup] = useState<TarpSetup | null>(null);

  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Tarp Setup Guide</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Master essential tarp configurations for any outdoor situation
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 20h16M4 20l8-16 8 16"/>
              </svg>
              <span className="block font-semibold text-gray-800">Basic Shapes</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/>
              </svg>
              <span className="block font-semibold text-gray-800">Weather Protection</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 21h10M12 21v-4M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7h18M5 7l1 12h12l1-12"/>
              </svg>
              <span className="block font-semibold text-gray-800">Equipment</span>
            </div>
          </div>
        </section>

        {/* Tarp Setups Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {tarpSetups.map((setup) => (
            <div
              key={setup.name}
              className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
              onClick={() => setSelectedSetup(setup)}
            >
              {setup.image && (
                <div className="h-48 overflow-hidden mb-4 -mt-2 -mx-2 rounded-t-lg">
                  <img 
                    src={setup.image} 
                    alt={setup.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{setup.name}</h3>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  setup.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                  setup.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {setup.difficulty}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-16 text-gray-800">Rain:</span>
                  <div className="flex">{renderRating(setup.weatherRating.rain)}</div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-16 text-gray-800">Wind:</span>
                  <div className="flex">{renderRating(setup.weatherRating.wind)}</div>
                </div>
              </div>
              <span className="link-outdoors inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                View Setup
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          ))}
        </section>

        {/* General Tips Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">General Tarp Tips</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Site Selection</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Choose level ground when possible</li>
                <li>Check for overhead hazards</li>
                <li>Consider natural wind breaks</li>
                <li>Look for appropriate anchor points</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Maintenance</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Dry tarp completely before storage</li>
                <li>Check for tears or damage regularly</li>
                <li>Clean dirt and debris after use</li>
                <li>Store in dry, cool place</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setup Detail Modal */}
        {selectedSetup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    selectedSetup.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    selectedSetup.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {selectedSetup.difficulty}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSetup.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedSetup(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedSetup.image && (
                <div className="mb-6">
                  <img src={selectedSetup.image} alt={selectedSetup.name} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Best For</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedSetup.bestFor.map((use, index) => (
                      <li key={index} className="mb-2">{use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Required Materials</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedSetup.materials.map((material, index) => (
                      <li key={index} className="mb-2">{material}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Setup Steps</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedSetup.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Pro Tips</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedSetup.tips.map((tip, index) => (
                      <li key={index} className="mb-2">{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Weather Ratings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-16 text-gray-800">Rain:</span>
                      <div className="flex">{renderRating(selectedSetup.weatherRating.rain)}</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-16 text-gray-800">Wind:</span>
                      <div className="flex">{renderRating(selectedSetup.weatherRating.wind)}</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium w-16 text-gray-800">Snow:</span>
                      <div className="flex">{renderRating(selectedSetup.weatherRating.snow)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 