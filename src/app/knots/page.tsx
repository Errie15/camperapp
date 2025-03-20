'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface Knot {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Essential" | "Climbing" | "Camping";
  description: string;
  uses: string[];
  steps: string[];
  tips: string[];
  materials: string[];
}

const knots: Knot[] = [
  {
    name: "Bowline",
    difficulty: "Beginner",
    category: "Essential",
    description: "The king of knots - creates a secure loop that won't slip or bind",
    uses: [
      "Creating a secure loop in rope",
      "Rescue operations",
      "Securing lines to posts or rings",
      "Tying up boats"
    ],
    steps: [
      "Form a small loop in the rope",
      "Pass the working end up through the loop",
      "Bring the working end around the standing part",
      "Pass the working end back down through the small loop",
      "Hold the working end and standing part, then pull to tighten"
    ],
    tips: [
      "The rabbit comes out of the hole, around the tree, and back down the hole",
      "Always dress the knot by aligning all parts",
      "Test the knot before relying on it",
      "Can be tied with one hand in emergencies"
    ],
    materials: [
      "Single rope length",
      "Optional: practice post or ring"
    ]
  },
  {
    name: "Figure 8 Follow Through",
    difficulty: "Intermediate",
    category: "Climbing",
    description: "Essential climbing knot for tying into a harness",
    uses: [
      "Rock climbing anchor",
      "Securing to a harness",
      "Creating a strong loop",
      "Safety line attachment"
    ],
    steps: [
      "Create a figure 8 with plenty of tail",
      "Thread tail through harness or anchor",
      "Trace the original figure 8 exactly",
      "Ensure parallel lines don't cross",
      "Tighten all parts of the knot evenly"
    ],
    tips: [
      "Leave at least 6 inches of tail",
      "Check for proper parallel strands",
      "No crossed or twisted sections",
      "Should look symmetrical when finished"
    ],
    materials: [
      "Climbing rope",
      "Climbing harness or anchor point"
    ]
  },
  {
    name: "Taut Line Hitch",
    difficulty: "Intermediate",
    category: "Camping",
    description: "Adjustable knot perfect for tent guy lines and tarps",
    uses: [
      "Tent and tarp guy lines",
      "Creating adjustable tension",
      "Securing loads that need adjustment",
      "Camp clotheslines"
    ],
    steps: [
      "Wrap the rope around anchor point",
      "Make two turns around the standing part",
      "Make one turn on the opposite side",
      "Thread through the space between turns",
      "Slide to adjust tension"
    ],
    tips: [
      "More turns equals more grip",
      "Keep coils neat and parallel",
      "Test by loading gradually",
      "Works best with cord of same thickness"
    ],
    materials: [
      "Rope or cord",
      "Tent stake or anchor point"
    ]
  }
];

export default function KnotsPage() {
  const [selectedKnot, setSelectedKnot] = useState<Knot | null>(null);
  const [activeCategory, setActiveCategory] = useState<Knot["category"]>("Essential");

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Essential Camping Knots</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Master the most important knots for outdoor adventures and safety
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M15 9l-6 6M9 9l6 6"/>
              </svg>
              <span className="block font-semibold text-gray-800">Basic Knots</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"/>
              </svg>
              <span className="block font-semibold text-gray-800">Safety Knots</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 20h16M4 20l8-16 8 16"/>
              </svg>
              <span className="block font-semibold text-gray-800">Camping Knots</span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex justify-center space-x-4">
            {(["Essential", "Climbing", "Camping"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {category} Knots
              </button>
            ))}
          </div>
        </section>

        {/* Knots Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {knots
            .filter((knot) => knot.category === activeCategory)
            .map((knot) => (
              <div
                key={knot.name}
                className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
                onClick={() => setSelectedKnot(knot)}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{knot.name}</h3>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    knot.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    knot.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {knot.difficulty}
                  </span>
                </div>
                <p className="text-gray-800 mb-6">{knot.description}</p>
                <span className="link-outdoors inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                  Learn Knot
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            ))}
        </section>

        {/* General Tips Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Knot Tying Tips</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Practice Tips</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Practice with different rope types</li>
                <li>Learn one knot at a time</li>
                <li>Practice until muscle memory forms</li>
                <li>Test knots before relying on them</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Safety Guidelines</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Always check knots before use</li>
                <li>Use appropriate rope for the task</li>
                <li>Know when to retire old ropes</li>
                <li>Double-check critical knots</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Knot Detail Modal */}
        {selectedKnot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    selectedKnot.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                    selectedKnot.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {selectedKnot.difficulty}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedKnot.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedKnot(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedKnot.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Common Uses</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedKnot.uses.map((use, index) => (
                      <li key={index} className="mb-2">{use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Required Materials</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedKnot.materials.map((material, index) => (
                      <li key={index} className="mb-2">{material}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Tying Instructions</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedKnot.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800">Pro Tips</h3>
                  <ul className="list-disc list-inside text-blue-900">
                    {selectedKnot.tips.map((tip, index) => (
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