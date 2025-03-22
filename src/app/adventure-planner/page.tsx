'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { BackpackIcon } from '../components/Icons';

// Define types for our form and items
type TripDetails = {
  duration: number;
  weather: string;
  temperatureHigh: number;
  temperatureLow: number;
  isWindy: boolean;
  precipitationType: string;
  terrain: string;
  campingStyle: string;
  numberOfPeople: number;
  distributeGear: boolean;
  hasPet: boolean;
  petName: string;
};

type PackingItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  isEssential: boolean;
  weatherConditions: string[];
  terrainTypes: string[];
  campingStyles: string[];
  forDuration: number[];
  isChecked?: boolean;
  isCustom?: boolean;
  assignedTo?: number | null; // Person number (1-based) or null for unassigned
};

export default function AdventurePlanner() {
  // State for multi-step form
  const [step, setStep] = useState(1);
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    duration: 2,
    weather: '',
    temperatureHigh: 75,
    temperatureLow: 55,
    isWindy: false,
    precipitationType: 'none',
    terrain: '',
    campingStyle: 'tent',
    numberOfPeople: 1,
    distributeGear: false,
    hasPet: false,
    petName: '',
  });
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Custom');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  
  // New state for UI enhancements
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [showEssentialOnly, setShowEssentialOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'byPerson' | 'distribution'>('all');
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [distributionFilter, setDistributionFilter] = useState<string>('');

  // Helper function to toggle category collapse
  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Helper function to update trip details
  const updateTripDetails = (field: keyof TripDetails, value: any) => {
    setTripDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Load saved packing list from localStorage
  useEffect(() => {
    const savedList = localStorage.getItem('packingList');
    const savedDetails = localStorage.getItem('tripDetails');
    
    if (savedList && savedDetails) {
      try {
        setPackingList(JSON.parse(savedList));
        const parsedDetails = JSON.parse(savedDetails);
        
        // Add default values for new fields if they don't exist in saved data
        const updatedDetails = {
          ...tripDetails, // Start with our defaults
          ...parsedDetails, // Override with saved values
          // Ensure new fields have defaults if not present in saved data
          temperatureHigh: parsedDetails.temperatureHigh ?? 75,
          temperatureLow: parsedDetails.temperatureLow ?? 55,
          isWindy: parsedDetails.isWindy ?? false,
          precipitationType: parsedDetails.precipitationType ?? 'none',
          distributeGear: parsedDetails.distributeGear ?? false,
        };
        
        setTripDetails(updatedDetails);
        // If there's a saved list, go to step 3
        setStep(3);
      } catch (error) {
        console.error('Error loading saved list:', error);
      }
    }
  }, []);

  // Function to save packing list to localStorage
  const savePackingList = () => {
    try {
      localStorage.setItem('packingList', JSON.stringify(packingList));
      localStorage.setItem('tripDetails', JSON.stringify(tripDetails));
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  // Function to add a custom item to the packing list
  const addCustomItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      quantity: newItemQuantity,
      isEssential: false,
      weatherConditions: [],
      terrainTypes: [],
      campingStyles: [],
      forDuration: [],
      isCustom: true,
    };
    
    setPackingList([...packingList, newItem]);
    setNewItemName('');
    setNewItemQuantity(1);
  };

  // Function to remove an item from the packing list (now works for all items)
  const removeItem = (id: string) => {
    setPackingList(packingList.filter(item => item.id !== id));
  };

  // Function to toggle checkbox state
  const toggleItemCheck = (id: string) => {
    setPackingList(packingList.map(item => 
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ));
  };

  // Function to generate packing list based on trip details
  const generatePackingList = () => {
    setIsGenerating(true);
    
    // Simulate loading (in a real app this might be an API call)
    setTimeout(() => {
      // Base items everyone needs regardless of conditions
      const baseItems: PackingItem[] = [
        {
          id: '1',
          name: 'First Aid Kit (with blister treatment)',
          category: 'Safety & Emergency',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '2',
          name: 'Water Bottle/Hydration System',
          category: 'Hydration',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '3',
          name: 'Multi-tool or Knife',
          category: 'Tools',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '4',
          name: 'Headlamp or Flashlight (+ spare batteries)',
          category: 'Lighting',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '101',
          name: 'Sleeping Bag (rated for conditions)',
          category: 'Sleep',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '102',
          name: 'Navigation Tools (map, compass, GPS)',
          category: 'Navigation',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '103',
          name: 'Fire Starting Kit (multiple methods)',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '104',
          name: 'Water Purification Method',
          category: 'Hydration',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '105',
          name: 'Backpack Rain Cover',
          category: 'Gear Protection',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['rainy', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '106',
          name: 'Toilet Paper (in waterproof container)',
          category: 'Hygiene',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '107',
          name: 'Trowel for Digging Catholes',
          category: 'Hygiene',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
      ];

      // Cooking & Kitchen items
      const cookingItems: PackingItem[] = [
        {
          id: '201',
          name: 'Compact Camping Stove',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '202',
          name: 'Fuel for Stove (extra canister)',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '203',
          name: 'Cookpot with Lid',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '204',
          name: 'Eating Utensil Set',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '205',
          name: 'Mug/Cup (insulated)',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '206',
          name: 'Biodegradable Soap',
          category: 'Hygiene',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '207',
          name: 'Dish Scrubber/Cloth',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '208',
          name: 'Collapsible Water Container',
          category: 'Hydration',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '209',
          name: 'Coffee/Tea Making Supplies',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '210',
          name: 'Lightweight Cutting Board',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [3, 7, 14, 30],
        },
      ];

      // Advanced/expert items beginners might overlook
      const advancedItems: PackingItem[] = [
        {
          id: '301',
          name: 'Tarp with Guy Lines (multiple uses)',
          category: 'Shelter',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '302',
          name: 'Duct Tape (wrapped around water bottle)',
          category: 'Repair',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '303',
          name: 'Gear Repair Kit (specific to your equipment)',
          category: 'Repair',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [3, 7, 14, 30],
        },
        {
          id: '304',
          name: 'Backup Water Treatment (tablets/drops)',
          category: 'Hydration',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '305',
          name: 'Satellite Messenger/Personal Locator Beacon',
          category: 'Safety & Emergency',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '306',
          name: 'Emergency Bivy/Space Blanket',
          category: 'Safety & Emergency',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['rainy', 'cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '307',
          name: 'Signaling Device (whistle/mirror)',
          category: 'Safety & Emergency',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '308',
          name: 'Navigation Backup (paper maps)',
          category: 'Navigation',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '309',
          name: 'Cordage/Paracord (50+ feet)',
          category: 'Gear',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '310',
          name: 'Microfiber Pack Towel',
          category: 'Gear',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [2, 3, 7, 14, 30],
        },
      ];

      // Items for specific weather conditions
      const weatherItems: PackingItem[] = [
        // Rainy weather items
        {
          id: '5',
          name: 'Rain Jacket',
          category: 'Clothing',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['rainy'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '6',
          name: 'Waterproof Stuff Sacks',
          category: 'Gear',
          quantity: 2,
          isEssential: false,
          weatherConditions: ['rainy'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        // Cold weather items
        {
          id: '7',
          name: 'Insulated Jacket',
          category: 'Clothing',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '8',
          name: 'Thermal Base Layers',
          category: 'Clothing',
          quantity: 2,
          isEssential: true,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        // Hot weather items
        {
          id: '9',
          name: 'Sun Hat',
          category: 'Clothing',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'hot'],
          terrainTypes: ['desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '10',
          name: 'Sunscreen',
          category: 'Personal',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'hot'],
          terrainTypes: ['desert', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '403',
          name: 'Gaiters (for snow/mud/brush)',
          category: 'Clothing',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['rainy', 'snow'],
          terrainTypes: ['mountain', 'forest'],
          campingStyles: ['primitive', 'tent', 'hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '404',
          name: 'Trekking Umbrella',
          category: 'Gear',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['rainy', 'hot'],
          terrainTypes: ['forest', 'plains', 'coastal', 'desert'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '405',
          name: 'Buff/Neck Gaiter (multiple uses)',
          category: 'Clothing',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['cold', 'hot', 'sunny', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
      ];

      // Camping style specific items
      const campingStyleItems: PackingItem[] = [
        // Tent camping
        {
          id: '11',
          name: 'Tent',
          category: 'Shelter',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '12',
          name: 'Sleeping Pad',
          category: 'Sleep',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        // Hammock camping
        {
          id: '13',
          name: 'Hammock',
          category: 'Shelter',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'hot'],
          terrainTypes: ['forest'],
          campingStyles: ['hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '14',
          name: 'Hammock Straps',
          category: 'Shelter',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'hot'],
          terrainTypes: ['forest'],
          campingStyles: ['hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '501',
          name: 'Tent Footprint/Ground Cloth',
          category: 'Shelter',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '502',
          name: 'Extra Tent Stakes and Guylines',
          category: 'Shelter',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['rainy', 'windy', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '503',
          name: 'Underquilt (for hammock)',
          category: 'Sleep',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['forest'],
          campingStyles: ['hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '504',
          name: 'Bug Net (for hammock)',
          category: 'Shelter',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['hot', 'rainy'],
          terrainTypes: ['forest', 'coastal', 'plains'],
          campingStyles: ['hammock'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
      ];

      // Duration specific items
      const durationItems: PackingItem[] = [
        // Longer trips (7+ days)
        {
          id: '15',
          name: 'Extra Batteries/Power Bank',
          category: 'Electronics',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [3, 7, 14, 30],
        },
        {
          id: '16',
          name: 'Repair Kit',
          category: 'Tools',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'primitive'],
          forDuration: [7, 14, 30],
        },
        {
          id: '601',
          name: 'Solar Charger/Power Bank',
          category: 'Electronics',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [3, 7, 14, 30],
        },
        {
          id: '602',
          name: 'Extra Pair of Socks',
          category: 'Clothing',
          quantity: tripDetails.duration > 7 ? Math.ceil(tripDetails.duration / 3) : 2,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '603',
          name: 'Journal and Pencil',
          category: 'Personal',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [3, 7, 14, 30],
        },
        {
          id: '604',
          name: 'Sewing Kit/Gear Repair',
          category: 'Repair',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [7, 14, 30],
        },
      ];

      // Food and nutrition items (based on duration)
      const foodItems: PackingItem[] = [
        {
          id: '701',
          name: `Meals (${tripDetails.duration * 3} packed or dehydrated)`,
          category: 'Food',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '702',
          name: 'High-Energy Snacks',
          category: 'Food',
          quantity: tripDetails.duration > 3 ? Math.ceil(tripDetails.duration / 2) : 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '703',
          name: 'Electrolyte Replacement',
          category: 'Food',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['hot', 'sunny'],
          terrainTypes: ['desert', 'mountain'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '704',
          name: 'Extra Day of Food (emergency)',
          category: 'Food',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
        {
          id: '705',
          name: 'Bear Canister/Food Storage',
          category: 'Food',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '706',
          name: 'Spice Kit (small containers)',
          category: 'Food',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [3, 7, 14, 30],
        },
      ];

      // Terrain-specific items
      const terrainItems: PackingItem[] = [
        {
          id: '801',
          name: 'Trekking Poles',
          category: 'Gear',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['mountain', 'desert', 'forest'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '802',
          name: 'Microspikes/Traction Devices',
          category: 'Gear',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['mountain'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '803',
          name: 'Insect Repellent',
          category: 'Personal',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['hot', 'rainy'],
          terrainTypes: ['forest', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '804',
          name: 'Sun Protection (clothing, hat)',
          category: 'Clothing',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'hot'],
          terrainTypes: ['desert', 'mountain', 'coastal'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: '805',
          name: 'Field Guide (local plants/animals)',
          category: 'Navigation',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [2, 3, 7, 14, 30],
        },
      ];

      // Nordic/Swedish camping style items
      const nordicCampingItems: PackingItem[] = [
        {
          id: 'nordic-1',
          name: 'Fixed-Blade Knife',
          category: 'Tools',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-2',
          name: 'Firesteel',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-3',
          name: 'Sitting Pad',
          category: 'Gear',
          quantity: tripDetails.numberOfPeople,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-4',
          name: 'Headlamp + Cap Light',
          category: 'Lighting',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-5',
          name: 'Camping Stove',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-6',
          name: 'Fuel (Alcohol/Gas)',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-7',
          name: 'Natural Fire Starter',
          category: 'Fire & Cooking',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['rainy', 'cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-8',
          name: 'Insulated Cup',
          category: 'Fire & Cooking',
          quantity: tripDetails.numberOfPeople,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-9',
          name: 'Wool Base Layers',
          category: 'Clothing',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-10',
          name: 'Down Vest',
          category: 'Clothing',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['cold', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'nordic-11',
          name: 'Camping Lantern',
          category: 'Lighting',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'coastal', 'plains'],
          campingStyles: ['tent', 'primitive', 'rv', 'cabin'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
      ];

      // Pet specific items
      const petItems: PackingItem[] = tripDetails.hasPet ? [
        {
          id: 'pet-1',
          name: `${tripDetails.petName || 'Pet'}'s Food (${tripDetails.duration * 2} portions)`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-2',
          name: `${tripDetails.petName || 'Pet'}'s Blanket`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-3',
          name: `Chew Bones/Treats for ${tripDetails.petName || 'Pet'}`,
          category: 'Pet Supplies',
          quantity: tripDetails.duration > 2 ? 2 : 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-4',
          name: `${tripDetails.petName || 'Pet'}'s Leash and Collar`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-5',
          name: `${tripDetails.petName || 'Pet'}'s Water Bowl`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-6',
          name: `Waste Bags for ${tripDetails.petName || 'Pet'}`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: true,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-7',
          name: `${tripDetails.petName || 'Pet'}'s Sleeping Bag`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['cold', 'snow', 'rainy'],
          terrainTypes: ['forest', 'mountain', 'plains', 'coastal'],
          campingStyles: ['tent', 'hammock', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
        {
          id: 'pet-8',
          name: `Sitting Pad for ${tripDetails.petName || 'Pet'} (2)`,
          category: 'Pet Supplies',
          quantity: 1,
          isEssential: false,
          weatherConditions: ['sunny', 'rainy', 'cold', 'hot', 'snow'],
          terrainTypes: ['forest', 'mountain', 'desert', 'coastal', 'plains'],
          campingStyles: ['tent', 'hammock', 'rv', 'cabin', 'primitive'],
          forDuration: [1, 2, 3, 7, 14, 30],
        },
      ] : [];

      // Adjust quantities based on number of people
      const adjustForPeople = (items: PackingItem[]): PackingItem[] => {
        return items.map(item => {
          // Items that should scale with number of people
          const scalableItems = [
            'Meals', 'Eating Utensil Set', 'Mug/Cup', 'Sleeping Bag', 
            'Sleeping Pad', 'Water Bottle', 'Extra Pair of Socks'
          ];
          
          const scalable = scalableItems.some(term => item.name.includes(term));
          
          if (scalable && tripDetails.numberOfPeople > 1) {
            return {
              ...item,
              quantity: item.quantity * tripDetails.numberOfPeople
            };
          }
          
          return item;
        });
      };

      // Generate temperature-appropriate clothing
      const clothingItems: PackingItem[] = generateClothingByTemperature();
      
      // Combine all items and adjust for number of people
      const allItems = [
        ...adjustForPeople([
          ...baseItems, 
          ...cookingItems,
          ...advancedItems,
          ...weatherItems, 
          ...campingStyleItems, 
          ...durationItems,
          ...foodItems,
          ...terrainItems,
          ...nordicCampingItems,
          ...clothingItems, // Add temperature-based clothing
        ]),
        ...petItems // Pet items already account for one pet
      ];

      // Filter items based on trip details
      const filteredItems = allItems.filter(item => {
        const weatherMatch = item.weatherConditions.includes(tripDetails.weather) || item.weatherConditions.length === 0;
        const terrainMatch = item.terrainTypes.includes(tripDetails.terrain) || item.terrainTypes.length === 0;
        const styleMatch = item.campingStyles.includes(tripDetails.campingStyle) || item.campingStyles.length === 0;
        const durationMatch = item.forDuration.some(d => d >= tripDetails.duration) || item.forDuration.length === 0;
        
        return weatherMatch && terrainMatch && styleMatch && durationMatch;
      });

      // Sort by category and essentials first
      const sortedItems = filteredItems.sort((a, b) => {
        if (a.isEssential !== b.isEssential) {
          return a.isEssential ? -1 : 1;
        }
        return a.category.localeCompare(b.category);
      });
      
      // Distribute gear between people if enabled
      if (tripDetails.distributeGear && tripDetails.numberOfPeople > 1) {
        const itemsToDistribute = sortedItems.filter(item => !item.isCustom);
        const assignedItems = sortedItems.filter(item => item.isCustom);
        
        // Group items by category
        const itemsByCategory: {[key: string]: PackingItem[]} = {};
        itemsToDistribute.forEach(item => {
          if (!itemsByCategory[item.category]) {
            itemsByCategory[item.category] = [];
          }
          itemsByCategory[item.category].push(item);
        });
        
        // Assign items to people - round robin for each category
        Object.keys(itemsByCategory).forEach(category => {
          const categoryItems = itemsByCategory[category];
          categoryItems.forEach((item, index) => {
            // Skip items that should be duplicated for everyone (personal items)
            const personalItems = ['Water Bottle', 'Headlamp', 'Sleeping Bag', 'Sleeping Pad'];
            const isPersonalItem = personalItems.some(term => item.name.includes(term));
            
            if (isPersonalItem) {
              // Personal items don't get assigned to a specific person
            } else {
              // Assign to a person (1-based) using round robin
              item.assignedTo = (index % tripDetails.numberOfPeople) + 1;
            }
          });
        });
        
        // Combine assigned and unassigned items
        setPackingList([...itemsToDistribute, ...assignedItems]);
      } else {
        setPackingList(sortedItems);
      }
      
      setIsGenerating(false);
      setStep(3); // Move to packing list view
    }, 1500);
  };
  
  // Function to generate clothing based on temperature range
  const generateClothingByTemperature = (): PackingItem[] => {
    const items: PackingItem[] = [];
    const { temperatureLow, temperatureHigh, isWindy } = tripDetails;
    const avgTemp = (temperatureLow + temperatureHigh) / 2;
    
    // Very cold conditions (below 20°F)
    if (temperatureLow < 20) {
      items.push({
        id: `temp-${Date.now()}-1`,
        name: 'Expedition Down Jacket',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold', 'snow'],
        terrainTypes: ['forest', 'mountain', 'plains'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-2`,
        name: 'Insulated Snow Pants',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold', 'snow'],
        terrainTypes: ['forest', 'mountain', 'plains'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-3`,
        name: 'Heavyweight Base Layer (Top & Bottom)',
        category: 'Clothing',
        quantity: 2,
        isEssential: true,
        weatherConditions: ['cold', 'snow'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-4`,
        name: 'Expedition Mittens + Liner Gloves',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold', 'snow'],
        terrainTypes: ['forest', 'mountain', 'plains'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-5`,
        name: 'Winter Sleeping Bag (0°F or Lower)',
        category: 'Sleep',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold', 'snow'],
        terrainTypes: ['forest', 'mountain', 'plains'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Cold conditions (20-40°F)
    if (temperatureLow >= 20 && temperatureLow < 40) {
      items.push({
        id: `temp-${Date.now()}-6`,
        name: 'Insulated Down/Synthetic Jacket',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-7`,
        name: 'Midweight Base Layer (Top & Bottom)',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-8`,
        name: 'Insulated Gloves',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['cold'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Cool conditions (40-60°F)
    if ((temperatureLow >= 40 && temperatureLow < 60) || (avgTemp >= 40 && avgTemp < 60)) {
      items.push({
        id: `temp-${Date.now()}-9`,
        name: 'Fleece Jacket/Pullover',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny', 'rainy'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-10`,
        name: 'Lightweight Hiking Pants (Non-Cotton)',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny', 'rainy'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-11`,
        name: 'Lightweight Base Layer Top',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny', 'rainy'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Warm conditions (60-80°F)
    if ((temperatureHigh >= 60 && temperatureHigh < 80) || (avgTemp >= 60 && avgTemp < 80)) {
      items.push({
        id: `temp-${Date.now()}-12`,
        name: 'Convertible Hiking Pants/Shorts',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny', 'hot'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-13`,
        name: 'Moisture-Wicking T-Shirts',
        category: 'Clothing',
        quantity: tripDetails.duration > 3 ? Math.ceil(tripDetails.duration / 2) : 2,
        isEssential: true,
        weatherConditions: ['sunny', 'hot'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-14`,
        name: 'Light Fleece or Jacket (for evenings)',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Hot conditions (80°F+)
    if (temperatureHigh >= 80) {
      items.push({
        id: `temp-${Date.now()}-15`,
        name: 'Lightweight Hiking Shorts',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['hot'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-16`,
        name: 'Sun-Protective Shirts (UPF Rated)',
        category: 'Clothing',
        quantity: tripDetails.duration > 3 ? Math.ceil(tripDetails.duration / 2) : 2,
        isEssential: true,
        weatherConditions: ['hot', 'sunny'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-17`,
        name: 'Sun Hat with Wide Brim',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['hot', 'sunny'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-18`,
        name: 'Cooling Bandana/Neck Gaiter',
        category: 'Clothing',
        quantity: 1,
        isEssential: false,
        weatherConditions: ['hot'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Add rain gear if conditions might be rainy
    if (tripDetails.precipitationType?.includes('rain') || tripDetails.weather === 'rainy') {
      items.push({
        id: `temp-${Date.now()}-19`,
        name: 'Waterproof Rain Jacket',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['rainy'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp', 'rv', 'camper_van', 'cabin'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
      
      items.push({
        id: `temp-${Date.now()}-20`,
        name: 'Waterproof Rain Pants',
        category: 'Clothing',
        quantity: 1,
        isEssential: tripDetails.precipitationType === 'heavy_rain',
        weatherConditions: ['rainy'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    // Add wind protection if windy
    if (isWindy) {
      items.push({
        id: `temp-${Date.now()}-21`,
        name: 'Windproof Jacket/Shell',
        category: 'Clothing',
        quantity: 1,
        isEssential: true,
        weatherConditions: ['sunny', 'cold', 'hot'],
        terrainTypes: ['forest', 'mountain', 'plains', 'desert', 'coastal'],
        campingStyles: ['tent', 'hammock', 'primitive', 'tarp'],
        forDuration: [1, 2, 3, 7, 14, 30],
      });
    }
    
    return items;
  };

  // Get unique categories for the select dropdown
  const uniqueCategories = Array.from(new Set([
    'Custom',
    ...packingList.map(item => item.category)
  ]));

  // Filter packing list based on search and filters
  const filteredPackingList = packingList.filter(item => {
    const searchMatch = searchTerm ? 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    const categoryMatch = filterCategory ? 
      item.category === filterCategory : true;
    
    const essentialMatch = showEssentialOnly ? 
      item.isEssential : true;
    
    const personMatch = viewMode === 'byPerson' && selectedPerson && tripDetails.distributeGear ?
      item.assignedTo === selectedPerson || !item.assignedTo : true;
    
    return searchMatch && categoryMatch && essentialMatch && personMatch;
  });

  // Get categories for display (filtered or all)
  const displayCategories = Array.from(new Set(
    filteredPackingList.map(item => item.category)
  ));

  // Add this backpack sizing function
  const getBackpackSize = (items: PackingItem[], tripDuration: number): string => {
    // Base size estimation based on trip duration
    let baseSize = 0;
    
    if (tripDuration <= 2) baseSize = 30; // Weekend trip: ~30L base
    else if (tripDuration <= 5) baseSize = 45; // Few days: ~45L base
    else if (tripDuration <= 10) baseSize = 60; // Week+: ~60L base
    else baseSize = 70; // Extended trip: 70L+ base
    
    // Count essential bulky items
    const bulkyItems = ['Tent', 'Sleeping Bag', 'Sleeping Pad', 'Hammock'];
    const bulkyItemCount = items.filter(item => 
      bulkyItems.some(term => item.name.includes(term))
    ).length;
    
    // Add liters based on bulky items
    const bulkyItemAdjustment = bulkyItemCount * 5;
    
    // Adjust for weather conditions (cold/snow = more gear)
    const weatherAdjustment = items.some(item => 
      item.weatherConditions.includes('cold') || 
      item.weatherConditions.includes('snow')
    ) ? 10 : 0;
    
    // Adjust for number of people (shared gear)
    const peopleAdjustment = Math.max(0, (items[0]?.quantity || 1) - 1) * 10;
    
    // Calculate total size
    const totalSize = baseSize + bulkyItemAdjustment + weatherAdjustment + peopleAdjustment;
    
    // Return size recommendation with range
    if (totalSize < 35) return '30-35L Daypack';
    if (totalSize < 50) return '40-50L Backpack';
    if (totalSize < 65) return '55-65L Backpack';
    if (totalSize < 80) return '70-80L Expedition Pack';
    return '80L+ Expedition Pack';
  };

  // Ensure the Progress Indicator shows relevant person items when in person mode
  const getProgressStats = () => {
    if (viewMode === 'byPerson' && selectedPerson && tripDetails.distributeGear) {
      const personItems = filteredPackingList.filter(item => 
        item.assignedTo === selectedPerson || !item.assignedTo
      );
      return {
        total: personItems.length,
        checked: personItems.filter(item => item.isChecked).length
      };
    }
    
    return {
      total: filteredPackingList.length,
      checked: filteredPackingList.filter(item => item.isChecked).length
    };
  };
  
  const progressStats = getProgressStats();

  // Function to handle item drag start
  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };
  
  // Function to handle dropping an item into a person's column
  const handleDrop = (personNumber: number | null) => {
    if (!draggedItem) return;
    
    setPackingList(prevList => 
      prevList.map(item => {
        if (item.id === draggedItem) {
          return { ...item, assignedTo: personNumber };
        }
        return item;
      })
    );
    
    setDraggedItem(null);
  };
  
  // Function to determine if an item is a personal item that shouldn't be shared
  const isPersonalItem = (item: PackingItem): boolean => {
    // Personal categories are typically not shared between hikers
    const personalCategories = ['Clothing', 'Personal', 'Hygiene'];
    if (personalCategories.includes(item.category)) return true;
    
    // Specific items that are typically personal
    const personalItemKeywords = [
      'Sleeping Bag', 
      'Sleeping Pad', 
      'Pillow', 
      'Water Bottle', 
      'Headlamp',
      'Toothbrush',
      'Toiletries',
      'Medication',
      'First Aid',
      'Glasses',
      'Sunglasses',
      'Hat',
      'Gloves',
      'Socks',
      'Underwear',
      'Wallet',
      'Phone',
      'Camera'
    ];
    
    return personalItemKeywords.some(keyword => 
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  
  // Function to get related items that should be distributed together
  const getRelatedItems = (itemName: string, items: PackingItem[]): PackingItem[] => {
    const relatedGroups: {[key: string]: string[]} = {
      'tent': ['tent', 'rainfly', 'tent body', 'tent poles', 'stakes', 'footprint'],
      'cooking': ['stove', 'fuel', 'pot', 'pan', 'utensil', 'plates', 'cups', 'spoon', 'fork', 'knife'],
      'water': ['filter', 'purification', 'treatment', 'reservoir'],
      'navigation': ['map', 'compass', 'gps'],
      'fire': ['matches', 'lighter', 'fire starter'],
    };
    
    // Check which group this item belongs to
    let itemGroup = '';
    for (const [group, keywords] of Object.entries(relatedGroups)) {
      if (keywords.some(word => itemName.toLowerCase().includes(word))) {
        itemGroup = group;
        break;
      }
    }
    
    if (!itemGroup) return [];
    
    // Find other items in the same group
    return items.filter(item => 
      item.id !== draggedItem && // Don't include the currently dragged item
      !item.assignedTo && // Only include unassigned items
      relatedGroups[itemGroup].some(word => 
        item.name.toLowerCase().includes(word)
      )
    );
  };
  
  // Function to allow dropping
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <BackpackIcon size={42} />
            <h1 className="text-3xl font-bold text-center ml-3">Adventure Planner</h1>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className={`w-1/3 h-1 rounded-full ${step >= 1 ? 'bg-forest-green-medium' : 'bg-gray-300'}`}></div>
            <div className={`w-1/3 h-1 rounded-full ${step >= 2 ? 'bg-forest-green-medium' : 'bg-gray-300'}`}></div>
            <div className={`w-1/3 h-1 rounded-full ${step >= 3 ? 'bg-forest-green-medium' : 'bg-gray-300'}`}></div>
          </div>
          
          <div className="card-outdoors p-8">
            {/* Step 1: Trip Duration */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">How long is your adventure?</h2>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Number of days:</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={tripDetails.duration} 
                    onChange={(e) => updateTripDetails('duration', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center font-bold text-xl mt-2 text-gray-800">
                    {tripDetails.duration} {tripDetails.duration === 1 ? 'day' : 'days'}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setStep(2)} 
                    className="btn-woodsman"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Trip Details */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Tell us about your trip</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Weather conditions:</label>
                  <select 
                    value={tripDetails.weather} 
                    onChange={(e) => updateTripDetails('weather', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                  >
                    <option value="">Select weather...</option>
                    <option value="sunny">Sunny/Mild</option>
                    <option value="hot">Hot/Dry</option>
                    <option value="rainy">Rainy/Wet</option>
                    <option value="cold">Cold</option>
                    <option value="snow">Snow</option>
                  </select>
                  
                  {tripDetails.weather && (
                    <div className="mt-1 text-sm text-gray-600">
                      {tripDetails.weather === 'sunny' && "Clear skies, moderate humidity, ideal for most activities."}
                      {tripDetails.weather === 'hot' && "High temperatures, low humidity, intense sun exposure."}
                      {tripDetails.weather === 'rainy' && "Wet conditions requiring waterproof gear."}
                      {tripDetails.weather === 'cold' && "Below freezing temperatures possible, insulation critical."}
                      {tripDetails.weather === 'snow' && "Snow conditions requiring specialized winter gear."}
                    </div>
                  )}
                </div>
                
                {/* Temperature Range */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 mb-2">High Temperature (°F):</label>
                    <input 
                      type="number" 
                      min="-20" 
                      max="120"
                      value={tripDetails.temperatureHigh} 
                      onChange={(e) => updateTripDetails('temperatureHigh', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Low Temperature (°F):</label>
                    <input 
                      type="number" 
                      min="-60" 
                      max="100"
                      value={tripDetails.temperatureLow} 
                      onChange={(e) => updateTripDetails('temperatureLow', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                    />
                  </div>
                </div>
                
                {/* Wind and Precipitation Type */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        id="isWindy"
                        checked={tripDetails.isWindy}
                        onChange={(e) => updateTripDetails('isWindy', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="isWindy" className="text-gray-700">Windy conditions</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Precipitation:</label>
                    <select 
                      value={tripDetails.precipitationType} 
                      onChange={(e) => updateTripDetails('precipitationType', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                    >
                      <option value="none">None</option>
                      <option value="light_rain">Light Rain</option>
                      <option value="heavy_rain">Heavy Rain</option>
                      <option value="light_snow">Light Snow</option>
                      <option value="heavy_snow">Heavy Snow</option>
                      <option value="mixed">Mixed Precipitation</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Terrain type:</label>
                  <select 
                    value={tripDetails.terrain} 
                    onChange={(e) => updateTripDetails('terrain', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                  >
                    <option value="">Select terrain...</option>
                    <option value="forest">Forest</option>
                    <option value="mountain">Mountain</option>
                    <option value="desert">Desert</option>
                    <option value="coastal">Coastal</option>
                    <option value="plains">Plains</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Camping style:</label>
                  <select 
                    value={tripDetails.campingStyle} 
                    onChange={(e) => updateTripDetails('campingStyle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                  >
                    <option value="tent">Tent Camping</option>
                    <option value="hammock">Hammock Camping</option>
                    <option value="tarp">Tarp Camping</option>
                    <option value="camper_van">Camper Van</option>
                    <option value="rv">RV Camping</option>
                    <option value="cabin">Cabin</option>
                    <option value="primitive">Primitive/Bushcraft</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Number of people:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={tripDetails.numberOfPeople} 
                    onChange={(e) => updateTripDetails('numberOfPeople', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                  />
                  
                  {tripDetails.numberOfPeople > 1 && (
                    <div className="mt-2 flex items-center">
                      <input 
                        type="checkbox" 
                        id="distributeGear"
                        checked={tripDetails.distributeGear}
                        onChange={(e) => updateTripDetails('distributeGear', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="distributeGear" className="text-gray-700">
                        Distribute gear between people (assign items to specific people)
                      </label>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="hasPet"
                      checked={tripDetails.hasPet}
                      onChange={(e) => updateTripDetails('hasPet', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="hasPet" className="text-gray-700">Bringing a pet</label>
                  </div>
                </div>
                
                {tripDetails.hasPet && (
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Pet's name:</label>
                    <input 
                      type="text"
                      placeholder="Sickan"
                      value={tripDetails.petName} 
                      onChange={(e) => updateTripDetails('petName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                    />
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setStep(1)} 
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    onClick={generatePackingList} 
                    className="btn-woodsman"
                    disabled={!tripDetails.weather || !tripDetails.terrain || isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Packing List'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Packing List */}
            {step === 3 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Your Custom Packing List</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={savePackingList} 
                      className="btn-secondary text-sm flex items-center text-gray-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      Save
                    </button>
                    <button 
                      onClick={() => window.print()} 
                      className="btn-secondary text-sm flex items-center text-gray-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-1 1v3M4 7h16" />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>
                
                {showSavedMessage && (
                  <div className="mb-3 p-2 bg-green-100 text-green-800 rounded-md">
                    ✓ Packing list saved successfully! You can access it later.
                  </div>
                )}
                
                {/* Compact Trip Details - Collapsible */}
                <details className="mb-3 bg-gray-100 rounded-lg group">
                  <summary className="p-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-200 rounded-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Trip Details
                    </span>
                    <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-2 pl-4 text-sm grid grid-cols-2 md:grid-cols-3 gap-1">
                    <p className="text-gray-800"><span className="font-medium">Duration:</span> {tripDetails.duration} days</p>
                    <p className="text-gray-800"><span className="font-medium">Weather:</span> {tripDetails.weather.charAt(0).toUpperCase() + tripDetails.weather.slice(1)}</p>
                    <p className="text-gray-800"><span className="font-medium">Temperature:</span> {tripDetails.temperatureLow}°F to {tripDetails.temperatureHigh}°F</p>
                    <p className="text-gray-800"><span className="font-medium">Terrain:</span> {tripDetails.terrain.charAt(0).toUpperCase() + tripDetails.terrain.slice(1)}</p>
                    <p className="text-gray-800"><span className="font-medium">Style:</span> {tripDetails.campingStyle.charAt(0).toUpperCase() + tripDetails.campingStyle.slice(1).replace('_', ' ')}</p>
                    <p className="text-gray-800"><span className="font-medium">People:</span> {tripDetails.numberOfPeople}</p>
                    
                    {tripDetails.isWindy && (
                      <p className="text-gray-800"><span className="font-medium">Conditions:</span> Windy</p>
                    )}
                    
                    {tripDetails.precipitationType && tripDetails.precipitationType !== 'none' && (
                      <p className="text-gray-800"><span className="font-medium">Precipitation:</span> {tripDetails.precipitationType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    )}
                    
                    {tripDetails.hasPet && <p className="text-gray-800"><span className="font-medium">Pet:</span> {tripDetails.petName || 'Your pet'}</p>}
                    
                    {tripDetails.distributeGear && tripDetails.numberOfPeople > 1 && (
                      <p className="text-gray-800"><span className="font-medium">Gear:</span> Distributed between {tripDetails.numberOfPeople} people</p>
                    )}
                  </div>
                </details>
                
                {/* Compact Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-2 items-stretch mb-3">
                  <div className="flex-1 relative">
                    <svg className="w-4 h-4 absolute left-2 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2 pl-8 pr-2 border border-gray-300 rounded-md text-gray-800 bg-white"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="py-2 px-2 border border-gray-300 rounded-md text-gray-800 bg-white"
                  >
                    <option value="">All Categories</option>
                    {Array.from(new Set(packingList.map(item => item.category))).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label className="flex items-center p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      id="essentialOnly"
                      checked={showEssentialOnly}
                      onChange={() => setShowEssentialOnly(!showEssentialOnly)}
                      className="mr-2 h-4 w-4 accent-forest-green-medium"
                    />
                    <span className="font-medium text-gray-800">Essentials only</span>
                  </label>
                </div>
                
                {/* View Mode Toggle for Gear Distribution */}
                {tripDetails.distributeGear && tripDetails.numberOfPeople > 1 && (
                  <div className="mb-3 bg-white border border-gray-200 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-800">View Mode:</div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setViewMode('all');
                            setSelectedPerson(null);
                          }}
                          className={`px-3 py-1 rounded-md text-sm ${
                            viewMode === 'all' 
                              ? 'bg-forest-green-medium text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          All Items
                        </button>
                        <button 
                          onClick={() => {
                            setViewMode('byPerson');
                            setSelectedPerson(1);
                          }}
                          className={`px-3 py-1 rounded-md text-sm ${
                            viewMode === 'byPerson' 
                              ? 'bg-forest-green-medium text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          By Person
                        </button>
                        <button 
                          onClick={() => {
                            setViewMode('distribution');
                            setSelectedPerson(null);
                          }}
                          className={`px-3 py-1 rounded-md text-sm ${
                            viewMode === 'distribution' 
                              ? 'bg-forest-green-medium text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          Distribute Gear
                        </button>
                      </div>
                    </div>
                    
                    {viewMode === 'byPerson' && (
                      <div className="flex gap-2 justify-center mt-2 flex-wrap">
                        {Array.from({ length: tripDetails.numberOfPeople }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedPerson(index + 1)}
                            className={`px-3 py-1 rounded-md text-sm ${
                              selectedPerson === index + 1
                                ? 'bg-blue-600 text-white' 
                                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                            }`}
                          >
                            Person {index + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Drag and Drop Gear Distribution */}
                {viewMode === 'distribution' && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4 text-forest-green-dark flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Gear Distribution
                    </h3>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        How to use:
                      </h4>
                      <ol className="list-decimal ml-6 text-sm space-y-1 text-gray-800">
                        <li>Drag items from the "Unassigned" column to assign them to specific people</li>
                        <li>Use category filters to focus on specific types of gear</li>
                        <li>Click "Auto-Balance" to automatically distribute gear evenly</li>
                        <li>When finished, click "Save Distribution" to save your assignments</li>
                      </ol>
                    </div>
                    
                    {/* Category filters for distribution view */}
                    <div className="mb-4">
                      <h4 className="text-base font-medium mb-2 flex items-center text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter by Category:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setDistributionFilter('')}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            distributionFilter === '' 
                              ? 'bg-forest-green-medium text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          All Categories
                        </button>
                        {Array.from(new Set(packingList.map(item => item.category))).sort().map(category => (
                          <button
                            key={category}
                            onClick={() => setDistributionFilter(category)}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                              distributionFilter === category 
                                ? 'bg-forest-green-medium text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
                      <div className="grid" style={{ 
                        gridTemplateColumns: `minmax(0, 2fr) ${Array(tripDetails.numberOfPeople).fill('minmax(0, 1fr)').join(' ')}`
                      }}>
                        {/* Header Row */}
                        <div className="font-medium text-gray-800 bg-gray-100 p-3 border-b border-r border-gray-200 text-base">
                          Gear Item {distributionFilter && `- ${distributionFilter}`}
                        </div>
                        {Array.from({ length: tripDetails.numberOfPeople }).map((_, index) => (
                          <div 
                            key={index} 
                            className="font-medium text-center text-gray-800 bg-gray-100 p-3 border-b border-gray-200 text-base"
                            style={{ borderRight: index < tripDetails.numberOfPeople - 1 ? '1px solid #e5e7eb' : 'none' }}
                          >
                            Person {index + 1}
                          </div>
                        ))}
                        
                        {/* Unassigned Drop Zone */}
                        <div 
                          className="p-3 border-b border-r border-gray-200 bg-white hover:bg-gray-50 transition"
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(null)}
                        >
                          <div className="font-medium text-gray-800 mb-3 text-base flex justify-between items-center">
                            <span>Shared Gear</span>
                            <span className="text-xs text-gray-500 font-normal">Drag items to assign</span>
                          </div>
                          <ul className="space-y-2 min-h-[120px]">
                            {packingList
                              .filter(item => !item.assignedTo && !item.isCustom && 
                                (distributionFilter ? item.category === distributionFilter : true) &&
                                !isPersonalItem(item)) // Only show items that can be shared
                              .map(item => (
                                <li 
                                  key={item.id}
                                  draggable 
                                  onDragStart={() => handleDragStart(item.id)}
                                  className="p-2.5 bg-white border-2 border-gray-300 rounded-md text-sm cursor-move hover:bg-gray-50 shadow-sm"
                                >
                                  <div className="flex flex-wrap items-start gap-1">
                                    <span className={`h-3 w-3 rounded-full mr-2 flex-shrink-0 mt-1 ${
                                      item.isEssential ? 'bg-forest-green-medium' : 'bg-amber-500'
                                    }`}></span>
                                    <span className="font-medium text-gray-900 mr-1">{item.name}</span>
                                    {item.quantity > 1 && (
                                      <span className="text-gray-700 text-sm whitespace-nowrap">(x{item.quantity})</span>
                                    )}
                                    <span className="text-sm text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap ml-auto">
                                      {item.category}
                                    </span>
                                  </div>
                                  
                                  {/* Show related items suggestion */}
                                  {getRelatedItems(item.name, packingList).length > 0 && (
                                    <div className="mt-1 text-xs text-blue-600 italic">
                                      Related to: {getRelatedItems(item.name, packingList).map(i => i.name).join(', ')}
                                    </div>
                                  )}
                                </li>
                              ))}
                          </ul>
                          
                          {/* Personal Items Section - These don't need to be distributed */}
                          <div className="mt-4 border-t border-gray-200 pt-3">
                            <div className="font-medium text-gray-800 mb-2 text-sm flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Personal Items (Each Person Carries Their Own)
                            </div>
                            <ul className="space-y-1">
                              {packingList
                                .filter(item => !item.assignedTo && !item.isCustom && 
                                  (distributionFilter ? item.category === distributionFilter : true) &&
                                  isPersonalItem(item))
                                .slice(0, 3) // Only show a few examples
                                .map(item => (
                                  <li key={item.id} className="text-sm text-gray-600 flex items-center">
                                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                                    {item.name}
                                  </li>
                                ))}
                              {packingList.filter(item => !item.assignedTo && isPersonalItem(item)).length > 3 && (
                                <li className="text-xs text-gray-500">
                                  + {packingList.filter(item => !item.assignedTo && isPersonalItem(item)).length - 3} more personal items...
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Person Drop Zones */}
                        {Array.from({ length: tripDetails.numberOfPeople }).map((_, personIndex) => (
                          <div 
                            key={personIndex}
                            className="p-3 border-b border-gray-200 bg-white hover:bg-blue-50 transition"
                            style={{ borderRight: personIndex < tripDetails.numberOfPeople - 1 ? '1px solid #e5e7eb' : 'none' }}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(personIndex + 1)}
                          >
                            <div className="font-medium text-center text-blue-800 mb-3 text-base">
                              Person {personIndex + 1}'s Gear
                            </div>
                            <ul className="space-y-2 min-h-[120px]">
                              {packingList
                                .filter(item => item.assignedTo === personIndex + 1 && 
                                  (distributionFilter ? item.category === distributionFilter : true))
                                .map(item => (
                                  <li 
                                    key={item.id}
                                    draggable 
                                    onDragStart={() => handleDragStart(item.id)}
                                    className="p-2.5 bg-white border-2 border-blue-300 rounded-md text-sm cursor-move hover:bg-blue-50 shadow-sm"
                                  >
                                    <div className="flex flex-wrap items-start gap-1">
                                      <span className={`h-3 w-3 rounded-full mr-2 flex-shrink-0 mt-1 ${
                                        item.isEssential ? 'bg-forest-green-medium' : 'bg-amber-500'
                                      }`}></span>
                                      <span className="font-medium text-gray-900 mr-1">{item.name}</span>
                                      {item.quantity > 1 && (
                                        <span className="text-gray-700 text-sm whitespace-nowrap">(x{item.quantity})</span>
                                      )}
                                      <span className="text-sm text-gray-700 bg-blue-50 px-1.5 py-0.5 rounded whitespace-nowrap ml-auto">
                                        {item.category}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                        
                        {/* Weight/Item Distribution Summary */}
                        <div className="col-span-full p-4 bg-gray-50 border-t border-gray-200">
                          <div className="grid" style={{ 
                            gridTemplateColumns: `minmax(0, 2fr) ${Array(tripDetails.numberOfPeople).fill('minmax(0, 1fr)').join(' ')}`
                          }}>
                            <div className="font-medium text-gray-800 text-base">
                              Summary:
                            </div>
                            {Array.from({ length: tripDetails.numberOfPeople }).map((_, index) => {
                              const personItems = packingList.filter(item => item.assignedTo === index + 1);
                              const itemCount = personItems.length;
                              const essentialItems = personItems.filter(item => item.isEssential).length;
                              
                              return (
                                <div key={index} className="text-center text-sm">
                                  <div className="font-medium text-gray-800">{itemCount} items total</div>
                                  <div className="text-forest-green-medium">{essentialItems} essentials</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => {
                          // Auto-distribute gear using a smarter algorithm
                          
                          // Group items by category for better distribution
                          const itemsByCategory: {[key: string]: PackingItem[]} = {};
                          
                          // Only distribute shared items, not personal items
                          const sharedItems = packingList.filter(item => 
                            !item.assignedTo && 
                            !item.isCustom && 
                            !isPersonalItem(item)
                          );
                          
                          sharedItems.forEach(item => {
                            if (!itemsByCategory[item.category]) {
                              itemsByCategory[item.category] = [];
                            }
                            itemsByCategory[item.category].push(item);
                          });
                          
                          // Count currently assigned items per person
                          const personItemCounts = Array(tripDetails.numberOfPeople).fill(0)
                            .map((_, index) => 
                              packingList.filter(item => item.assignedTo === index + 1).length
                            );
                          
                          // Identify tent components and cooking gear to distribute sensibly
                          const tentItems = sharedItems.filter(item => 
                            item.category === 'Shelter' || 
                            item.name.toLowerCase().includes('tent')
                          );
                          
                          const cookingItems = sharedItems.filter(item => 
                            item.category === 'Fire & Cooking' ||
                            ['stove', 'pot', 'pan', 'fuel', 'utensil'].some(word => 
                              item.name.toLowerCase().includes(word)
                            )
                          );
                          
                          // Create a new packing list starting with the current state
                          const newPackingList = [...packingList];
                          
                          // Helper to assign an item to the person with fewest items
                          const assignToLeastLoadedPerson = (item: PackingItem) => {
                            const minItemsPersonIndex = personItemCounts
                              .reduce((minIndex, count, index, array) => 
                                count < array[minIndex] ? index : minIndex, 0);
                            
                            // Find the item in our new list and assign it
                            const itemIndex = newPackingList.findIndex(i => i.id === item.id);
                            if (itemIndex >= 0) {
                              newPackingList[itemIndex] = {
                                ...newPackingList[itemIndex],
                                assignedTo: minItemsPersonIndex + 1
                              };
                              
                              // Update count
                              personItemCounts[minItemsPersonIndex]++;
                            }
                          };
                          
                          // Distribute tent components - split between 2 people if possible
                          if (tentItems.length > 0 && tripDetails.numberOfPeople >= 2) {
                            // Sort by weight (assuming heavier items have more descriptive names)
                            const sortedTentItems = [...tentItems].sort((a, b) => b.name.length - a.name.length);
                            
                            // Give tent body to person 1, rainfly/poles to person 2
                            sortedTentItems.forEach((item, index) => {
                              const personIndex = index % Math.min(2, tripDetails.numberOfPeople);
                              const itemIndex = newPackingList.findIndex(i => i.id === item.id);
                              
                              if (itemIndex >= 0) {
                                newPackingList[itemIndex] = {
                                  ...newPackingList[itemIndex],
                                  assignedTo: personIndex + 1
                                };
                                
                                personItemCounts[personIndex]++;
                              }
                            });
                          }
                          
                          // Distribute cooking gear between people
                          if (cookingItems.length > 0) {
                            cookingItems.forEach((item, index) => {
                              const personIndex = index % tripDetails.numberOfPeople;
                              const itemIndex = newPackingList.findIndex(i => i.id === item.id);
                              
                              if (itemIndex >= 0) {
                                newPackingList[itemIndex] = {
                                  ...newPackingList[itemIndex],
                                  assignedTo: personIndex + 1
                                };
                                
                                personItemCounts[personIndex]++;
                              }
                            });
                          }
                          
                          // Distribute remaining shared items evenly
                          const remainingItems = sharedItems.filter(item => 
                            !tentItems.some(i => i.id === item.id) &&
                            !cookingItems.some(i => i.id === item.id)
                          );
                          
                          remainingItems.forEach(item => {
                            assignToLeastLoadedPerson(item);
                          });
                          
                          setPackingList(newPackingList);
                        }}
                        className="btn-secondary flex items-center py-2 px-4"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Auto-Balance Gear
                      </button>
                      
                      <button 
                        onClick={savePackingList} 
                        className="btn-woodsman flex items-center py-2 px-4"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Distribution
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Compact Progress Indicator */}
                <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-3 flex items-center justify-between bg-gradient-to-r from-forest-green-light/10 to-forest-green-dark/20 border-b border-gray-200">
                    <div className="flex items-center">
                      <BackpackIcon size={20} color="#2d5a35" className="mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {viewMode === 'byPerson' && selectedPerson
                            ? `Person ${selectedPerson} Ready?`
                            : 'Trail Ready?'
                          }
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-1">You've packed</span>
                          <strong className="text-forest-green-dark">{progressStats.checked}</strong>
                          <span className="mx-1">of</span>
                          <strong>{progressStats.total}</strong>
                          <span className="ml-1">items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-800">
                        {progressStats.total > 0 
                          ? Math.round((progressStats.checked / progressStats.total) * 100)
                          : 0
                        }%
                      </div>
                      <span className="text-sm text-gray-600 ml-2">packed</span>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full relative transition-all duration-700 ease-in-out"
                        style={{ 
                          width: `${Math.max(3, (progressStats.checked / Math.max(progressStats.total, 1)) * 100)}%`,
                          background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
                        }}
                      >
                        <div 
                          className="absolute top-0 bottom-0 left-0 right-0"
                          style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shine 1.5s infinite'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Legend */}
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <p className="flex items-center text-gray-900">
                    <span className="inline-block w-3 h-3 bg-forest-green-medium rounded-full mr-1"></span> Essential
                  </p>
                  <p className="flex items-center text-gray-900">
                    <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mr-1"></span> Recommended
                  </p>
                  <p className="flex items-center text-gray-900">
                    <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-1"></span> Optional
                  </p>
                  
                  <div className="ml-auto flex gap-2">
                    <button 
                      className="text-forest-green-medium hover:text-forest-green-dark text-xs"
                      onClick={() => setCollapsedCategories(
                        collapsedCategories.length === displayCategories.length ? [] : [...displayCategories]
                      )}
                    >
                      {collapsedCategories.length === displayCategories.length ? 'Expand All' : 'Collapse All'}
                    </button>
                    <span className="text-gray-600 text-xs">
                      {filteredPackingList.length} items
                    </span>
                  </div>
                </div>
                
                {/* Compact Add Custom Item Form */}
                <details className="mb-3 bg-white border border-gray-200 rounded-lg shadow-sm group">
                  <summary className="p-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-100 rounded-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Custom Item
                    </span>
                    <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Item name"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="p-2 border border-gray-300 rounded text-gray-800 bg-white w-24 sm:w-auto"
                        >
                          {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={newItemQuantity}
                          onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                          className="w-16 p-2 border border-gray-300 rounded text-gray-800 bg-white"
                        />
                        <button
                          onClick={addCustomItem}
                          className="btn-woodsman"
                          disabled={!newItemName.trim()}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </details>
                
                {/* Backpack Size Recommendation - More Compact */}
                <div className="mb-3 flex items-center p-2 bg-forest-green-light/20 rounded-lg border border-forest-green-medium/70 text-sm">
                  <BackpackIcon size={24} color="#2d5a35" className="mr-2 flex-shrink-0" />
                  <p className="text-forest-green-dark m-0">
                    Recommended: <strong>{getBackpackSize(filteredPackingList, tripDetails.duration)}</strong> backpack
                  </p>
                </div>
                
                {filteredPackingList.length === 0 ? (
                  <p className="text-gray-800">No items found for your criteria. Try adjusting your filters or trip details.</p>
                ) : (
                  <div>
                    {/* Redesigned Category Cards - More Compact */}
                    <div className="space-y-2">
                      {displayCategories.map(category => {
                        // For person view, check if there are items for this category assigned to the selected person
                        const categoryItems = filteredPackingList.filter(item => 
                          item.category === category && 
                          (viewMode !== 'byPerson' || 
                            !tripDetails.distributeGear || 
                            !selectedPerson || 
                            item.assignedTo === selectedPerson || 
                            !item.assignedTo) // Include unassigned personal items for all
                        );
                        
                        if (categoryItems.length === 0) return null;
                        
                        return (
                          <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">
                            <div 
                              className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                              onClick={() => toggleCategory(category)}
                            >
                              <div className="flex items-center">
                                <span className="mr-2 text-lg">
                                  {category === 'Shelter' && <span>⛺</span>}
                                  {category === 'Clothing' && <span>👕</span>}
                                  {category === 'Fire & Cooking' && <span>🔥</span>}
                                  {category === 'Navigation' && <span>🧭</span>}
                                  {category === 'Hydration' && <span>💧</span>}
                                  {category === 'Sleep' && <span>💤</span>}
                                  {category === 'Safety & Emergency' && <span>🚨</span>}
                                  {category === 'Food' && <span>🍲</span>}
                                  {category === 'Lighting' && <span>🔦</span>}
                                  {category === 'Tools' && <span>🛠️</span>}
                                  {category === 'Gear' && <span>🎒</span>}
                                  {category === 'Hygiene' && <span>🧼</span>}
                                  {category === 'Electronics' && <span>🔋</span>}
                                  {category === 'Personal' && <span>👤</span>}
                                  {category === 'Repair' && <span>🔧</span>}
                                  {category === 'Pet Supplies' && <span>🐾</span>}
                                  {category === 'Gear Protection' && <span>🛡️</span>}
                                  {category === 'Custom' && <span>✨</span>}
                                </span>
                                <h3 className="text-gray-900 font-semibold">{category}</h3>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-600 mr-2">
                                  {categoryItems.length} items
                                </span>
                                <svg 
                                  className={`w-4 h-4 transition-transform duration-300 ${collapsedCategories.includes(category) ? 'transform rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                            
                            {!collapsedCategories.includes(category) && (
                              <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                                {categoryItems.map(item => (
                                  <li key={item.id} className={`p-2 flex items-center group ${
                                    item.isChecked ? 'bg-forest-green-light/30 border-l-4 border-forest-green-dark' : 'hover:bg-gray-50'
                                  }`}>
                                    <div 
                                      className={`flex-shrink-0 h-5 w-5 mr-2 rounded-md flex items-center justify-center border-2 ${
                                        item.isChecked 
                                          ? 'bg-white border-forest-green-medium text-white' 
                                          : 'border-gray-300 bg-white'
                                      }`}
                                      onClick={() => toggleItemCheck(item.id)}
                                    >
                                      {item.isChecked && (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="#16a34a" strokeWidth="2">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                    <label 
                                      htmlFor={`item-${item.id}`}
                                      className="flex-1 flex items-center cursor-pointer text-sm"
                                    >
                                      <span className={`${item.isChecked ? 'text-gray-900 font-bold' : 'text-gray-900'} transition-all duration-200`}>
                                        {item.name}
                                      </span>
                                      {item.quantity > 1 && (
                                        <span className="ml-1 text-gray-500 text-xs">
                                          (x{item.quantity})
                                        </span>
                                      )}
                                      
                                      {/* Show person assignment if gear is distributed */}
                                      {tripDetails.distributeGear && item.assignedTo && (
                                        <span className="ml-2 px-1.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                                          Person {item.assignedTo}
                                        </span>
                                      )}
                                    </label>
                                    <div className="flex items-center space-x-2">
                                      <span 
                                        className={`h-2 w-2 rounded-full ${
                                          item.isEssential ? 'bg-forest-green-medium' : 
                                          item.isCustom ? 'bg-gray-400' : 'bg-amber-500'
                                        }`}
                                        title={item.isEssential ? 'Essential' : item.isCustom ? 'Custom' : 'Recommended'}
                                      ></span>
                                      <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Remove item"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => setStep(2)} 
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <Link href="/">
                    <button className="btn-woodsman">
                      Home
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 