'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";
import { LeafIcon } from "../components/Icons";

interface EdiblePlant {
  name: string;
  scientificName: string;
  description: string;
  identificationTips: string[];
  uses: string[];
  cautions: string[];
  whenToHarvest: string;
  whereToFind: string;
  image?: string;
}

const ediblePlants: EdiblePlant[] = [
  {
    name: "Dandelion",
    scientificName: "Taraxacum officinale",
    description: "One of the most recognizable and nutritious wild edibles, every part of the dandelion is edible from flower to root.",
    identificationTips: [
      "Toothed leaves arranged in a basal rosette",
      "Single yellow flower head on hollow stem",
      "Produces white fluffy seed heads",
      "Exudes milky white sap when broken"
    ],
    uses: [
      "Young leaves in salads or cooked as greens",
      "Flowers can be made into wine or fritters",
      "Roots can be roasted and used as a coffee substitute",
      "Rich in vitamins A, C, K and minerals"
    ],
    cautions: [
      "Avoid harvesting from areas treated with pesticides or near roadways",
      "May cause allergic reactions in some individuals",
      "Can interact with certain medications due to diuretic properties"
    ],
    whenToHarvest: "Spring through fall, with young leaves best in early spring before flowering",
    whereToFind: "Lawns, meadows, fields, and disturbed areas worldwide",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Blackberry",
    scientificName: "Rubus species",
    description: "Wild blackberries are delicious fruits that grow on thorny canes, providing both food and medicine.",
    identificationTips: [
      "Thorny canes with compound leaves of 3-5 leaflets",
      "White to pink five-petaled flowers",
      "Berries ripen from green to red to black",
      "Grows in dense thickets"
    ],
    uses: [
      "Ripe berries eaten fresh or made into preserves, pies, or wine",
      "Young leaves can be brewed for tea",
      "Rich in antioxidants, vitamins C and K"
    ],
    cautions: [
      "Thorns can cause painful scratches - wear protection when harvesting",
      "Similar-looking plants include raspberries (also edible) and poisonous nightshade (black berries growing on non-thorny stems)",
      "Avoid plants along roadsides or sprayed areas"
    ],
    whenToHarvest: "Berries ripen mid to late summer depending on climate",
    whereToFind: "Forest edges, clearings, old fields, roadsides throughout temperate regions",
    image: "https://images.unsplash.com/photo-1567870335471-1129836babcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chickweed",
    scientificName: "Stellaria media",
    description: "A common garden weed with tender, mild-flavored leaves that are nutritious and medicinal.",
    identificationTips: [
      "Low-growing with small, oval leaves arranged in opposite pairs",
      "Tiny white flowers with 5 deeply notched petals that look like 10 petals",
      "Single line of hairs that switches sides between nodes on the stem",
      "Stems snap easily when pulled"
    ],
    uses: [
      "Young leaves and stems in salads or sandwiches",
      "Can be cooked like spinach",
      "Traditional use as a topical remedy for skin conditions",
      "Contains vitamins A, C, B complex and minerals"
    ],
    cautions: [
      "Scarlet pimpernel looks similar but has orange-red flowers and is toxic",
      "Avoid collecting from areas with potential pollution or pesticides"
    ],
    whenToHarvest: "Best in cool weather - spring and fall in most areas, can grow year-round in mild climates",
    whereToFind: "Gardens, lawns, disturbed soil, shady areas worldwide",
    image: "https://images.unsplash.com/photo-1590600421450-206d42ed2458?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Wild Garlic",
    scientificName: "Allium species",
    description: "Also known as ramps or wild leeks, these plants offer a distinctive garlic-onion flavor.",
    identificationTips: [
      "Broad, smooth leaf blades with onion-like bulbs",
      "Strong garlic or onion smell when crushed",
      "Clusters of white flowers on a single stalk",
      "Grows in patches in woodland settings"
    ],
    uses: [
      "Leaves and bulbs can be used like domestic garlic or onions",
      "Leaves added to salads, soups, or pesto",
      "Bulbs can be pickled or used in cooking",
      "Contains immune-boosting compounds similar to cultivated garlic"
    ],
    cautions: [
      "Can be confused with toxic lily-family plants like death camas or lily-of-the-valley",
      "ALWAYS verify by the distinctive garlic/onion smell",
      "Harvest sustainably - many wild garlic populations are threatened by overharvesting"
    ],
    whenToHarvest: "Early spring before trees leaf out completely",
    whereToFind: "Deciduous forest floors, especially in rich, moist soil",
    image: "https://images.unsplash.com/photo-1591189824978-c3a202ab3901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const foragingRules = [
  "Never consume a plant unless you are 100% certain of its identification",
  "Start with easily identifiable plants that have few toxic look-alikes",
  "Use multiple identification features (not just appearance) including smell, habitat, and season",
  "Harvest ethically - take only what you need and leave plenty for wildlife and plant reproduction",
  "Avoid harvesting from polluted areas like roadsides, industrial sites, or areas sprayed with chemicals",
  "Learn from experienced foragers and/or take guided walks before foraging independently",
  "Use multiple reliable field guides to confirm identification",
  "Consider potential allergic reactions even to known edible plants",
  "Never harvest endangered or protected species"
];

export default function ForagingPage() {
  const [selectedPlant, setSelectedPlant] = useState<EdiblePlant | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <div className="flex justify-center mb-6">
            <LeafIcon size={64} color="#2D6A4F" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Foraging & Wild Edible Plants</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Learn to identify, harvest, and use wild edible plants safely and sustainably
          </p>
          
          <div className="hero-section p-8 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-pine-dark">Forage Responsibly</h2>
                <p className="mb-4 text-gray-700">
                  Foraging connects us with our ancestral knowledge and provides nutritious, fresh food directly from nature.
                  However, it requires careful study, respect for the environment, and responsible harvesting practices.
                </p>
                <p className="text-gray-700">
                  Our guides will help you identify common edible plants, understand sustainable harvesting, and avoid
                  dangerous look-alikes that could pose health risks.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Person foraging for mushrooms" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Foraging Rules Section */}
        <section className="card-outdoors p-8 bg-white bg-opacity-95 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-pine-dark text-center">Essential Foraging Safety Rules</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-earth-light/10 p-6 rounded-lg border-l-4 border-earth-light">
              <ul className="space-y-4">
                {foragingRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block bg-earth-light text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Edible Plants Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Common Edible Wild Plants</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {ediblePlants.map((plant) => (
              <div
                key={plant.name}
                className="card-outdoors overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
                onClick={() => setSelectedPlant(plant)}
              >
                {plant.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{plant.name}</h3>
                    <span className="text-sm font-italic text-gray-600">{plant.scientificName}</span>
                  </div>
                  <p className="text-gray-800 mb-4">{plant.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="link-outdoors inline-flex items-center text-pine-light hover:text-pine-dark font-medium">
                      Identification Details
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plant Details Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPlant.name}</h2>
                  <span className="text-sm italic text-gray-600">{selectedPlant.scientificName}</span>
                </div>
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedPlant.image && (
                <div className="mb-6">
                  <img src={selectedPlant.image} alt={selectedPlant.name} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-700">{selectedPlant.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">How to Identify</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedPlant.identificationTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-800">When to Harvest</h3>
                    <p className="text-gray-700">{selectedPlant.whenToHarvest}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-800">Where to Find</h3>
                    <p className="text-gray-700">{selectedPlant.whereToFind}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Uses</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedPlant.uses.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800">Cautions & Warnings</h3>
                  <ul className="list-disc list-inside text-red-800 space-y-1">
                    {selectedPlant.cautions.map((caution, index) => (
                      <li key={index}>{caution}</li>
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