'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";
import { MapIcon, CompassIcon } from "../components/Icons";

interface NavigationTechnique {
  title: string;
  description: string;
  steps: string[];
  equipment: string[];
  tips: string[];
  image?: string;
}

const navigationTechniques: NavigationTechnique[] = [
  {
    title: "Map & Compass Navigation",
    description: "Master the basics of navigating with a topographic map and compass",
    steps: [
      "Orient your map to north using the compass",
      "Identify prominent landmarks on the map and in your surroundings",
      "Determine your current position (triangulation)",
      "Plan your route to destination",
      "Measure distances using the map scale",
      "Follow bearings using the compass"
    ],
    equipment: [
      "Topographic map of the area",
      "Baseplate compass with rotating bezel",
      "Map case or waterproof sleeve",
      "Pencil for marking",
      "Ruler or string for measuring distances"
    ],
    tips: [
      "Always account for magnetic declination in your area",
      "Keep your compass away from metal objects",
      "Check your bearing frequently to stay on course",
      "Use handrails (linear features like trails or streams) when possible"
    ],
    image: "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Navigation by the Stars",
    description: "Find direction at night using celestial bodies",
    steps: [
      "Identify the North Star (Polaris) in the northern hemisphere",
      "Find the Southern Cross in the southern hemisphere",
      "Use the Big Dipper to locate Polaris",
      "Determine cardinal directions based on star positions",
      "Track star movement to estimate time"
    ],
    equipment: [
      "Star chart or app (for reference before trip)",
      "Red headlamp to preserve night vision",
      "Compass for verification"
    ],
    tips: [
      "Practice identifying constellations before your trip",
      "The North Star remains almost stationary in the sky",
      "Stars rise in the east and set in the west",
      "The moon rises in the east and sets in the west"
    ],
    image: "https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Natural Navigation",
    description: "Navigate using natural indicators and landmarks",
    steps: [
      "Observe moss growth on trees (often grows on north side)",
      "Check tree growth patterns (denser on southern side in northern hemisphere)",
      "Study ant hills (often on south side of trees)",
      "Watch the sun's movement throughout the day",
      "Use prominent landmarks for triangulation"
    ],
    equipment: [
      "None required, though a watch can help",
      "Field guide to local flora and fauna (optional)"
    ],
    tips: [
      "Natural indicators are not 100% reliable - use multiple methods",
      "Local environmental factors can affect natural indicators",
      "Remember that the sun rises in the east and sets in the west",
      "At noon, shadows point north (in northern hemisphere) or south (in southern hemisphere)"
    ],
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "GPS Navigation",
    description: "Using digital tools for precise navigation while maintaining traditional skills",
    steps: [
      "Set up your GPS device or app before departure",
      "Mark your starting point or trailhead",
      "Create waypoints for important locations",
      "Follow the planned route on your device",
      "Check your track log to review your journey",
      "Always have backup batteries or power source"
    ],
    equipment: [
      "GPS device or smartphone with GPS app",
      "Extra batteries or power bank",
      "Waterproof case",
      "Map and compass as backup"
    ],
    tips: [
      "Never rely solely on electronic devices in the wilderness",
      "Pre-download maps for offline use",
      "Turn off unnecessary features to conserve battery",
      "Learn to understand GPS coordinates and your particular unit before your trip"
    ],
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function NavigationPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<NavigationTechnique | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <div className="flex justify-center mb-6">
            <MapIcon size={64} color="#2D6A4F" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Wilderness Navigation Skills</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Learn how to find your way in the wilderness using maps, compasses, stars, and natural features
          </p>
          
          <div className="hero-section p-8 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-pine-dark">Never Get Lost Again</h2>
                <p className="mb-4 text-gray-700">
                  Wilderness navigation is an essential skill for any outdoor enthusiast. Knowing how to navigate without relying
                  on technology can mean the difference between an enjoyable adventure and a dangerous situation.
                </p>
                <p className="text-gray-700">
                  Our comprehensive guides will teach you traditional navigation methods that have been trusted for centuries,
                  as well as modern techniques to enhance your wayfinding abilities.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1517016006573-2eefaa2f5b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Hiker using map and compass" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Techniques Grid */}
        <section className="grid gap-8 md:grid-cols-2 mb-12">
          {navigationTechniques.map((technique) => (
            <div
              key={technique.title}
              className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
              onClick={() => setSelectedTechnique(technique)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{technique.title}</h3>
              <p className="text-gray-800 mb-6">{technique.description}</p>
              <div className="flex justify-between items-center">
                <span className="link-outdoors inline-flex items-center text-pine-light hover:text-pine-dark font-medium">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
                {technique.image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src={technique.image} alt={technique.title} className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Best Practices Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Navigation Best Practices</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Before Your Trip</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Research your route and terrain thoroughly</li>
                <li>Study the map of your destination area</li>
                <li>Check weather forecasts for visibility concerns</li>
                <li>Test and familiarize with all your navigation tools</li>
                <li>Share your detailed route plan with someone</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">During Your Adventure</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Check your position regularly on the map</li>
                <li>Note landmarks and terrain features as you pass them</li>
                <li>Use the "handrail" technique along linear features</li>
                <li>Never rely solely on electronic navigation devices</li>
                <li>Keep track of your elevation changes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation Technique Modal */}
        {selectedTechnique && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTechnique.title}</h2>
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedTechnique.image && (
                <div className="mb-6">
                  <img src={selectedTechnique.image} alt={selectedTechnique.title} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedTechnique.description}</p>
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
                  <h3 className="font-semibold mb-2 text-gray-800">Equipment Needed</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTechnique.equipment.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800">Helpful Tips</h3>
                  <ul className="list-disc list-inside text-blue-900">
                    {selectedTechnique.tips.map((tip, index) => (
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