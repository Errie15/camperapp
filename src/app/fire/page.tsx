'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface FireTechnique {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Basics" | "Weather" | "Preparation";
  description: string;
  steps: string[];
  tips: string[];
  materials: string[];
  safetyNotes: string[];
}

const fireTechniques: FireTechnique[] = [
  {
    name: "Basic Fire Triangle",
    difficulty: "Beginner",
    category: "Basics",
    description: "Understanding the three essential components needed for fire: fuel, heat, and oxygen",
    steps: [
      "Clear the area of flammable materials",
      "Create a fire pit or use an existing one",
      "Gather your materials: tinder, kindling, and fuel wood",
      "Arrange materials in a pyramid or teepee structure",
      "Light the tinder from the bottom"
    ],
    tips: [
      "Always start small and gradually build up",
      "Ensure proper airflow through your structure",
      "Use dry materials whenever possible",
      "Keep extra tinder and kindling nearby"
    ],
    materials: [
      "Tinder (dry leaves, paper, bark)",
      "Kindling (small twigs, sticks)",
      "Fuel wood (larger branches, logs)",
      "Fire starter or matches"
    ],
    safetyNotes: [
      "Clear a 10-foot diameter area",
      "Keep water or dirt nearby for emergency extinguishing",
      "Never leave a fire unattended",
      "Check local fire regulations and restrictions"
    ]
  },
  {
    name: "Wet Weather Fire Starting",
    difficulty: "Advanced",
    category: "Weather",
    description: "Techniques for starting and maintaining a fire in wet conditions",
    steps: [
      "Find or create a dry elevated platform",
      "Collect materials from elevated or protected areas",
      "Split wet wood to access dry interior",
      "Use waterproof fire starters",
      "Create a larger than usual tinder bundle"
    ],
    tips: [
      "Look for dead standing wood instead of ground wood",
      "Collect extra materials before starting",
      "Use pine resin or birch bark if available",
      "Keep your fire materials covered while gathering"
    ],
    materials: [
      "Waterproof matches or lighter",
      "Petroleum-based fire starter",
      "Dead standing wood",
      "Natural waterproof tinder (birch bark, pine resin)",
      "Tarp for material protection"
    ],
    safetyNotes: [
      "Be extra cautious with fire accelerants",
      "Ensure proper ventilation in wet conditions",
      "Monitor surrounding areas for steam and smoke",
      "Have multiple fire starting methods available"
    ]
  },
  {
    name: "DIY Fire Starters",
    difficulty: "Beginner",
    category: "Preparation",
    description: "Create your own reliable fire starters at home",
    steps: [
      "Collect dryer lint or cotton balls",
      "Melt petroleum jelly in a double boiler",
      "Saturate materials with melted petroleum jelly",
      "Store in waterproof containers",
      "Alternative: Create wax-dipped pine cones"
    ],
    tips: [
      "Make these in bulk during dry weather",
      "Store in multiple small containers",
      "Label and date your fire starters",
      "Test them before relying on them in the field"
    ],
    materials: [
      "Dryer lint or cotton balls",
      "Petroleum jelly",
      "Waterproof containers",
      "Optional: wax and pine cones",
      "Zip-lock bags for storage"
    ],
    safetyNotes: [
      "Work in a well-ventilated area",
      "Keep away from open flames while preparing",
      "Store away from heat sources",
      "Label containers clearly as flammable"
    ]
  }
];

export default function FirePage() {
  const [selectedTechnique, setSelectedTechnique] = useState<FireTechnique | null>(null);
  const [activeCategory, setActiveCategory] = useState<FireTechnique["category"]>("Basics");

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Fire Skills & Safety</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Master the essential skills of fire building, safety, and maintenance in any condition
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6v12M8 12h8"/>
              </svg>
              <span className="block font-semibold text-gray-800">Fire Basics</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M7 8l10 8M7 16l10-8"/>
              </svg>
              <span className="block font-semibold text-gray-800">Weather Challenges</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 12l10 10 10-10L12 2z"/>
              </svg>
              <span className="block font-semibold text-gray-800">Preparation</span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex justify-center space-x-4">
            {(["Basics", "Weather", "Preparation"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Techniques Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {fireTechniques
            .filter((technique) => technique.category === activeCategory)
            .map((technique) => (
              <div
                key={technique.name}
                className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
                onClick={() => setSelectedTechnique(technique)}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{technique.name}</h3>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    technique.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    technique.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {technique.difficulty}
                  </span>
                </div>
                <p className="text-gray-800 mb-6">{technique.description}</p>
                <span className="link-outdoors inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            ))}
        </section>

        {/* General Safety Tips Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Essential Fire Safety Tips</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Before Starting a Fire</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Check local fire regulations and restrictions</li>
                <li>Choose and prepare a safe location</li>
                <li>Gather necessary materials and tools</li>
                <li>Have water or extinguishing materials ready</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Fire Management</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Never leave a fire unattended</li>
                <li>Keep the fire contained and controlled</li>
                <li>Monitor wind conditions</li>
                <li>Properly extinguish before leaving</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technique Detail Modal */}
        {selectedTechnique && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    selectedTechnique.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    selectedTechnique.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {selectedTechnique.difficulty}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTechnique.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedTechnique.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Required Materials</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTechnique.materials.map((material, index) => (
                      <li key={index} className="mb-2">{material}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Steps</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedTechnique.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Tips</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTechnique.tips.map((tip, index) => (
                      <li key={index} className="mb-2">{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-text-gray-800">Safety Notes</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTechnique.safetyNotes.map((note, index) => (
                      <li key={index} className="mb-2">{note}</li>
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