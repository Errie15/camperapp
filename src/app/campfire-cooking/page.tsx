'use client';
import Navigation from "../components/Navigation";
import { useState } from "react";

interface Recipe {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  image?: string;
}

const recipes: Recipe[] = [
  {
    name: "Campfire Foil Packets",
    difficulty: "Beginner",
    cookTime: "30-40 minutes",
    ingredients: [
      "Chicken breast or fish fillet",
      "Mixed vegetables (carrots, potatoes, onions)",
      "Butter or olive oil",
      "Seasonings (salt, pepper, herbs)",
      "Heavy-duty aluminum foil"
    ],
    instructions: [
      "Cut vegetables into even-sized pieces",
      "Place meat and vegetables on foil",
      "Add butter and seasonings",
      "Wrap tightly in foil, creating a packet",
      "Place on hot coals for 30-40 minutes"
    ],
    tips: [
      "Double-wrap to prevent leaks",
      "Turn packet every 10 minutes",
      "Check doneness before serving"
    ],
    image: "https://images.unsplash.com/photo-1536064692660-84ba205a5aaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Dutch Oven Stew",
    difficulty: "Intermediate",
    cookTime: "1-2 hours",
    ingredients: [
      "Beef chunks",
      "Root vegetables",
      "Broth or water",
      "Seasonings",
      "Dutch oven"
    ],
    instructions: [
      "Brown meat in Dutch oven",
      "Add vegetables and liquid",
      "Cover and place coals on top",
      "Simmer until meat is tender",
      "Add seasonings to taste"
    ],
    tips: [
      "Use the right coal placement",
      "Maintain steady temperature",
      "Check liquid levels periodically"
    ],
    image: "https://images.unsplash.com/photo-1621861585080-bf9b1d3165bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Campfire Pizza",
    difficulty: "Advanced",
    cookTime: "15-20 minutes",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Cheese",
      "Toppings",
      "Cast iron skillet"
    ],
    instructions: [
      "Prepare dough and toppings",
      "Heat skillet over fire",
      "Place dough in skillet",
      "Add toppings quickly",
      "Cover with foil and cook"
    ],
    tips: [
      "Pre-cook certain toppings",
      "Watch bottom doesn't burn",
      "Use a pizza stone if available"
    ],
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function CampfireCookingPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Campfire Cooking Guide</h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Master the art of outdoor cooking with our tried and tested recipes
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2c-5.5 4-8 8-8 12 0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-2.5-8-8-12zm0 18c-3.3 0-6-2.7-6-6 0-2.8 1.8-5.8 6-9 4.2 3.2 6 6.2 6 9 0 3.3-2.7 6-6 6z" />
                <path d="M12 6c-3.3 2.5-5 5-5 8 0 2.8 2.2 5 5 5s5-2.2 5-5c0-3-1.7-5.5-5-8z" />
              </svg>
              <span className="block font-semibold text-gray-800">Fire Management</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span className="block font-semibold text-gray-800">Cooking Times</span>
            </div>
            <div className="text-center">
              <svg className="w-16 h-16 icon-outdoors mx-auto mb-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="block font-semibold text-gray-800">Techniques</span>
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {recipes.map((recipe) => (
            <div
              key={recipe.name}
              className="card-outdoors p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white bg-opacity-95"
              onClick={() => setSelectedRecipe(recipe)}
            >
              {recipe.image && (
                <div className="h-48 overflow-hidden mb-4 -mt-2 -mx-2 rounded-t-lg">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{recipe.name}</h3>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  recipe.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                  recipe.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {recipe.difficulty}
                </span>
                <span className="ml-2 text-gray-700">{recipe.cookTime}</span>
              </div>
              <p className="text-gray-800 mb-6">
                {recipe.ingredients.slice(0, 3).join(", ")}...
              </p>
              <span className="link-outdoors inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                View Recipe
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          ))}
        </section>

        {/* Safety Tips Section */}
        <section className="card-outdoors p-8 mb-12 bg-white bg-opacity-95">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Campfire Cooking Safety</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Fire Safety</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Always have water or sand nearby</li>
                <li>Keep fire contained in a designated pit</li>
                <li>Never leave fire unattended</li>
                <li>Fully extinguish before leaving</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Food Safety</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Keep raw foods separate</li>
                <li>Use a food thermometer</li>
                <li>Store perishables properly</li>
                <li>Clean utensils between uses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedRecipe.name}</h2>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedRecipe.image && (
                <div className="mb-6">
                  <img src={selectedRecipe.image} alt={selectedRecipe.name} className="rounded-lg w-full h-64 object-cover" />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Difficulty & Time</h3>
                  <div className="flex items-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedRecipe.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                      selectedRecipe.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {selectedRecipe.difficulty}
                    </span>
                    <span className="ml-4 text-gray-700">{selectedRecipe.cookTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Ingredients</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-2">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Instructions</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="mb-2">{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">Pro Tips</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedRecipe.tips.map((tip, index) => (
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