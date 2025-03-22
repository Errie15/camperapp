'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface EmergencyTip {
  category: string;
  title: string;
  description: string;
  steps: string[];
  equipment: string[];
  warnings: string[];
  image?: string;
}

const emergencyTips: EmergencyTip[] = [
  {
    category: "Medical",
    title: "First Aid Basics",
    description: "Essential first aid procedures for common outdoor injuries",
    steps: [
      "Check the scene for safety",
      "Assess the victim's condition",
      "Call for help if necessary",
      "Provide appropriate first aid",
      "Monitor until help arrives"
    ],
    equipment: [
      "First aid kit",
      "Emergency blanket",
      "Clean water",
      "Antiseptic wipes"
    ],
    warnings: [
      "Don't move victim if spinal injury suspected",
      "Wear protective gloves when treating wounds",
      "Know your limits - don't exceed your training"
    ],
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Medical",
    title: "Wilderness First Aid",
    description: "Medical care techniques when you're far from help",
    steps: [
      "Assess the situation and ensure your safety",
      "Check victim's ABCs (Airway, Breathing, Circulation)",
      "Treat life-threatening conditions first",
      "Stabilize injuries with available materials",
      "Document symptoms and treatment times",
      "Plan evacuation if necessary"
    ],
    equipment: [
      "Comprehensive first aid kit",
      "SAM splints or improvised splinting materials",
      "Trauma shears",
      "Irrigation syringe for wound cleaning",
      "Emergency pressure bandages"
    ],
    warnings: [
      "Never attempt procedures beyond your training",
      "Be aware of the 'golden hour' for severe trauma",
      "Hypothermia can develop even in mild conditions",
      "Monitor for shock symptoms continuously"
    ],
    image: "https://images.unsplash.com/photo-1560178404-f9c34ce54584?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Medical",
    title: "Treating Hypothermia",
    description: "Recognizing and treating dangerous body temperature drops",
    steps: [
      "Get the person out of cold/wet environment",
      "Remove wet clothing",
      "Warm the core first (not extremities)",
      "Use skin-to-skin contact in a sleeping bag",
      "Give warm, sweet drinks if conscious",
      "Monitor breathing and consciousness"
    ],
    equipment: [
      "Emergency blankets",
      "Dry clothing",
      "Sleeping bag",
      "Hot water bottles (if available)",
      "Chemical heat packs"
    ],
    warnings: [
      "Don't give alcohol - it worsens hypothermia",
      "Don't rub or massage extremities",
      "Be gentle - rough handling can cause cardiac arrest",
      "Severe hypothermia requires professional medical care"
    ],
    image: "https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Navigation",
    title: "Lost in the Wild",
    description: "Steps to take when you've lost your way",
    steps: [
      "Stop and stay calm",
      "Use STOP (Stop, Think, Observe, Plan)",
      "Stay where you are if safe",
      "Signal for help",
      "Conserve energy and resources"
    ],
    equipment: [
      "Map and compass",
      "Whistle",
      "Bright colored clothing",
      "Emergency shelter"
    ],
    warnings: [
      "Don't panic and run",
      "Avoid splitting up the group",
      "Don't waste phone battery on non-emergency calls"
    ],
    image: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Weather",
    title: "Severe Weather Response",
    description: "How to handle unexpected weather conditions",
    steps: [
      "Monitor weather conditions",
      "Seek appropriate shelter",
      "Protect yourself and equipment",
      "Wait out the storm",
      "Assess situation after weather clears"
    ],
    equipment: [
      "Weather radio",
      "Rain gear",
      "Emergency shelter",
      "Extra warm clothing"
    ],
    warnings: [
      "Avoid high ground during lightning",
      "Don't shelter under tall trees",
      "Beware of flash flood areas"
    ],
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function SOSPage() {
  const [selectedTip, setSelectedTip] = useState<EmergencyTip | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Emergency Guide</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Essential survival skills and emergency procedures for outdoor situations
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span className="block font-semibold text-gray-800">Emergency Response</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"/>
              </svg>
              <span className="block font-semibold text-gray-800">First Aid</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
              <span className="block font-semibold text-gray-800">Survival Skills</span>
            </div>
          </div>
        </section>

        {/* Emergency Tips Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {emergencyTips.map((tip) => (
            <div
              key={tip.title}
              className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
              onClick={() => setSelectedTip(tip)}
            >
              {tip.image && (
                <div className="h-48 overflow-hidden mb-4 -mt-2 -mx-2 rounded-t-lg">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="flex items-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {tip.category}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{tip.title}</h3>
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

        {/* Emergency Contacts Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Emergency Contacts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Important Numbers</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="inline-block w-24 font-medium text-gray-800">Emergency:</span>
                  <span className="text-red-600 font-bold">911</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-24 font-medium text-gray-800">Park Service:</span>
                  <span className="text-gray-700">1-800-XXX-XXXX</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-24 font-medium text-gray-800">Poison Control:</span>
                  <span className="text-gray-700">1-800-222-1222</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Before You Go</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Share your trip plan with someone</li>
                <li>Check local emergency frequencies</li>
                <li>Save emergency numbers offline</li>
                <li>Know your exact location</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency Tip Modal */}
        {selectedTip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-2">
                    {selectedTip.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTip.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedTip(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedTip.image && (
                <div className="mb-6">
                  <img src={selectedTip.image} alt={selectedTip.title} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedTip.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Steps to Follow</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedTip.steps.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Required Equipment</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedTip.equipment.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800">Important Warnings</h3>
                  <ul className="list-disc list-inside text-red-900">
                    {selectedTip.warnings.map((warning, index) => (
                      <li key={index} className="mb-2">{warning}</li>
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