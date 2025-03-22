'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";
import { FishIcon } from "../components/Icons";

interface WaterMethod {
  title: string;
  description: string;
  steps: string[];
  equipment: string[];
  pros: string[];
  cons: string[];
  image?: string;
}

const waterMethods: WaterMethod[] = [
  {
    title: "Boiling",
    description: "The most reliable method to kill harmful microorganisms in water",
    steps: [
      "Fill a heat-resistant container with collected water",
      "Place over fire or heat source until reaching a rolling boil",
      "Maintain a rolling boil for at least 1 minute (3+ minutes at high altitudes)",
      "Let water cool before drinking",
      "Improve taste by adding a pinch of salt per liter or pouring between containers"
    ],
    equipment: [
      "Metal pot, kettle, or container",
      "Fire or heat source",
      "Fuel for fire"
    ],
    pros: [
      "Highly effective against bacteria, viruses, and parasites",
      "Requires minimal equipment",
      "No chemicals needed",
      "Simple process with clear endpoint (boiling)"
    ],
    cons: [
      "Does not remove chemical contaminants or toxins",
      "Requires fuel source which may be limited",
      "Time-consuming process",
      "Water takes time to cool before consumption"
    ],
    image: "https://images.unsplash.com/photo-1475650522725-015d35677f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Filtration",
    description: "Using physical barriers to remove contaminants from water",
    steps: [
      "Collect water and pre-filter through cloth if visibly dirty",
      "Pour water through your filter system following manufacturer's directions",
      "Collect filtered water in a clean container",
      "For homemade filters, layer materials from coarse to fine (gravel, sand, charcoal)",
      "Replace or clean filters regularly according to manufacturer instructions"
    ],
    equipment: [
      "Commercial water filter or materials for DIY filter",
      "Clean collection containers",
      "Cloth for pre-filtering (bandana or t-shirt)"
    ],
    pros: [
      "Removes particulates, many bacteria and protozoa",
      "Improves water clarity and taste",
      "No waiting time for consumption after filtering",
      "No heat source required"
    ],
    cons: [
      "Many filters don't remove viruses (check specifications)",
      "Commercial filters can be expensive and heavy",
      "Filter elements require maintenance and eventual replacement",
      "DIY filters are less reliable than commercial options"
    ],
    image: "https://images.unsplash.com/photo-1624806992066-5ffdb5a63560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Chemical Treatment",
    description: "Using chlorine, iodine, or purification tablets to kill pathogens",
    steps: [
      "Collect and pre-filter water if cloudy",
      "Follow specific dosage instructions for your chemical treatment",
      "For chlorine bleach: 2 drops of 6% unscented bleach per liter of clear water",
      "For iodine: follow package instructions based on concentration",
      "For purification tablets: follow package directions",
      "Mix thoroughly and let stand for required time (typically 30 minutes to 4 hours)"
    ],
    equipment: [
      "Chemical treatment (tablets, drops, or bleach)",
      "Clean water container",
      "Measuring device for liquid treatments",
      "Watch or timer"
    ],
    pros: [
      "Lightweight and portable option",
      "Long shelf life for tablets and properly stored chemicals",
      "Effective against many pathogens",
      "No heat source needed"
    ],
    cons: [
      "Waiting time required before consumption",
      "May impart unpleasant taste to water",
      "Less effective in cold water (longer contact time needed)",
      "Not effective against all parasites like Cryptosporidium",
      "Iodine not recommended for pregnant women or those with thyroid issues"
    ],
    image: "https://images.unsplash.com/photo-1590781535549-bf1d954da801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "UV Purification",
    description: "Using ultraviolet light to neutralize harmful microorganisms",
    steps: [
      "Collect water and filter if cloudy (UV works best in clear water)",
      "Follow device instructions for treating the specific volume of water",
      "Insert UV device and activate for the recommended time (usually 1-2 minutes)",
      "Agitate water gently while treating to ensure all water is exposed",
      "Your water is ready to drink immediately after treatment"
    ],
    equipment: [
      "UV water purifier device",
      "Batteries (usually USB rechargeable or replaceable)",
      "Clear water container",
      "Pre-filter for cloudy water"
    ],
    pros: [
      "Quick treatment time (typically 90 seconds per liter)",
      "No chemicals added - no taste alteration",
      "Effective against bacteria, viruses, and protozoa including Cryptosporidium",
      "Lightweight option compared to many filters"
    ],
    cons: [
      "Requires batteries or power source",
      "Less effective in cloudy water",
      "No residual protection once treated",
      "Electronics can fail in wilderness conditions",
      "Does not remove chemical contaminants"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const waterSources = [
  {
    name: "Flowing Streams",
    quality: "Generally safer than standing water, especially in high elevations",
    tips: "Look for clear, flowing water away from human and animal activity. Collect upstream from your camping area."
  },
  {
    name: "Springs",
    quality: "Often the safest natural source",
    tips: "Water emerging directly from the ground is typically filtered naturally. Still requires treatment."
  },
  {
    name: "Lakes and Ponds",
    quality: "Variable - more susceptible to contamination",
    tips: "Collect from the surface away from shore, plants, and obvious contaminants. Always treat thoroughly."
  },
  {
    name: "Rain Collection",
    quality: "Generally clean but can be contaminated by collection surface",
    tips: "Use clean tarps or containers to collect. First flush may contain airborne contaminants."
  },
  {
    name: "Snow and Ice",
    quality: "Usually cleaner than surface water but still requires treatment",
    tips: "Avoid discolored snow. Melt before purifying as frozen pathogens can survive treatment."
  },
  {
    name: "Plant Transpiration",
    quality: "Clean but yields very small quantities",
    tips: "Tie clear plastic bags around leafy tree branches in sunlight. Condensation will collect as clean water."
  }
];

export default function WaterPage() {
  const [selectedMethod, setSelectedMethod] = useState<WaterMethod | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <div className="flex justify-center mb-6">
            <FishIcon size={64} color="#7EC8E3" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Water Purification</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Essential techniques for finding and purifying water in wilderness settings
          </p>
          
          <div className="hero-section p-8 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-sky-blue">Clean Water is Critical</h2>
                <p className="mb-4 text-gray-700">
                  Water is essential for survival, but contaminated water can cause serious illness. In wilderness settings, 
                  even the clearest mountain stream may contain harmful pathogens.
                </p>
                <p className="text-gray-700">
                  Learn how to find water sources and use proper purification techniques to ensure your 
                  drinking water is safe in any outdoor situation.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Clear mountain stream" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Water Sources Section */}
        <section className="card-outdoors p-8 bg-white bg-opacity-95 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-pine-dark text-center">Finding Water Sources</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">Source</th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">Quality</th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">Tips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {waterSources.map((source, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}>
                    <td className="py-3 px-4 text-gray-800 font-medium">{source.name}</td>
                    <td className="py-3 px-4 text-gray-700">{source.quality}</td>
                    <td className="py-3 px-4 text-gray-700">{source.tips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="mb-12 max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="mr-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Water Safety Warning</h3>
                <p className="text-gray-800 mb-3">
                  Never assume water is safe to drink without treatment, even if it looks clean and clear. Most waterborne pathogens 
                  are invisible to the naked eye and can cause serious illnesses like giardiasis, cryptosporidiosis, and bacterial infections.
                </p>
                <p className="text-gray-800">
                  Always treat water using one of the proven methods below, or combine methods for the highest safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Water Purification Methods Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Water Purification Methods</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {waterMethods.map((method) => (
              <div
                key={method.title}
                className="card-outdoors overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
                onClick={() => setSelectedMethod(method)}
              >
                {method.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={method.image} 
                      alt={method.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{method.title}</h3>
                  <p className="text-gray-800 mb-6">{method.description}</p>
                  <span className="link-outdoors inline-flex items-center text-sky-blue hover:text-blue-700 font-medium">
                    View Technique Details
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Method Details Modal */}
        {selectedMethod && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMethod.title}</h2>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedMethod.image && (
                <div className="mb-6">
                  <img src={selectedMethod.image} alt={selectedMethod.title} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedMethod.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Steps</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    {selectedMethod.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Required Equipment</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedMethod.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800">Pros</h3>
                    <ul className="list-disc list-inside text-green-800 space-y-1">
                      {selectedMethod.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800">Cons</h3>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      {selectedMethod.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
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