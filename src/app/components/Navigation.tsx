'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CompassIcon, BackpackIcon } from '../components/Icons';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-woodsman sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-2xl font-bold text-white hover:text-sky-blue transition-colors"
          >
            <CompassIcon size={32} color="#FFFFFF" />
            <span className="font-display tracking-wide">CampSkills</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white hover:text-sky-blue transition-colors"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open menu</span>
            <svg 
              className="h-8 w-8 transition-transform duration-200 ease-in-out" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/adventure-planner" 
              className="text-white bg-forest-green-medium hover:bg-forest-green-dark px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
            >
              <BackpackIcon size={20} color="#FFFFFF" />
              <span className="ml-2">Adventure Planner</span>
            </Link>
            <Link 
              href="/knots" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Knots
            </Link>
            <Link 
              href="/fire" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Fire Skills
            </Link>
            <Link 
              href="/tarp-setups" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Tarp Setups
            </Link>
            <Link 
              href="/campfire-cooking" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Cooking
            </Link>
            <Link 
              href="/weather" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Weather
            </Link>
            <Link 
              href="/navigation" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Navigation
            </Link>
            <Link 
              href="/foraging" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Foraging
            </Link>
            <Link 
              href="/water-purification" 
              className="text-white hover:text-sky-blue px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              Water
            </Link>
            <Link 
              href="/sos" 
              className="text-white bg-sunset-orange hover:bg-sunset-orange/90 px-4 py-2 rounded-lg transition-all duration-200"
            >
              SOS
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/adventure-planner" 
              className="block text-white bg-forest-green-medium px-4 py-3 rounded-lg transition-all duration-200 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BackpackIcon size={20} color="#FFFFFF" />
              <span className="ml-2">Adventure Planner</span>
            </Link>
            <Link 
              href="/knots" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Knots
            </Link>
            <Link 
              href="/fire" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Fire Skills
            </Link>
            <Link 
              href="/tarp-setups" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Tarp Setups
            </Link>
            <Link 
              href="/campfire-cooking" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Cooking
            </Link>
            <Link 
              href="/weather" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Weather
            </Link>
            <Link 
              href="/navigation" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Navigation
            </Link>
            <Link 
              href="/foraging" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Foraging
            </Link>
            <Link 
              href="/water-purification" 
              className="block text-white hover:text-sky-blue px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Water
            </Link>
            <Link 
              href="/sos" 
              className="block text-white bg-sunset-orange hover:bg-sunset-orange/90 px-4 py-3 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              SOS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 