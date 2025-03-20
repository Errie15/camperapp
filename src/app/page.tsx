import Image from "next/image";
import Link from "next/link";
import Navigation from "./components/Navigation";

const TreeIcon = () => (
  <svg className="w-12 h-12 icon-outdoors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L4 15h4v6h8v-6h4L12 3z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-12 h-12 icon-outdoors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Bottom log */}
    <path d="M6 18c0 0 3 1 6 1s6-1 6-1" />
    {/* Top log */}
    <path d="M6 14c0 0 3 1 6 1s6-1 6-1" />
    {/* Flames */}
    <path d="M12 4c-2 3-3 5-3 7 0 1.6 1.3 3 3 3s3-1.4 3-3c0-2-1-4-3-7z" />
    <path d="M12 6c-1.5 2-2 3.5-2 5 0 1.1 0.9 2 2 2s2-0.9 2-2c0-1.5-0.5-3-2-5z" />
  </svg>
);

const CompassIcon = () => (
  <svg className="w-12 h-12 icon-outdoors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-12 h-12 icon-outdoors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CookingIcon = () => (
  <svg className="w-12 h-12 icon-outdoors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Main pot body */}
    <path d="M6 8h12v8H6z" />
    {/* Lid */}
    <path d="M5 8c0-1 1-2 2-2h10c1 0 2 1 2 2" />
    <path d="M5 8h14" />
    {/* Lid handle */}
    <path d="M11 4h2v2h-2z" />
    {/* Pot legs */}
    <path d="M7 16v2M17 16v2M12 16v2" />
    {/* Side handles */}
    <path d="M4 10h2M18 10h2" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto p-4">
        {/* Hero Section */}
        <section className="hero-section text-center py-16 mb-12 px-4">
          <h1 className="text-5xl font-bold mb-6">Master Essential Camping Skills</h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Learn everything from knot tying to campfire cooking with our comprehensive guides
          </p>
          <div className="flex justify-center space-x-12 mb-8">
            <TreeIcon />
            <FireIcon />
            <CompassIcon />
          </div>
          <button className="btn-woodsman">
            Start Your Adventure
          </button>
        </section>

        {/* Featured Skills Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          <Link href="/knots" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 icon-outdoors mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 6c0 2 2 2 4 2s4 0 4 2-2 2-4 2-4 0-4 2 2 2 4 2 4 0 4 2" />
                  <path d="M12 4v2M12 18v2" />
                </svg>
                <h2 className="text-2xl font-semibold">Essential Knots</h2>
              </div>
              <p className="text-gray-600 mb-6">Master crucial knots for camping and survival situations.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/fire" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <FireIcon />
                <h2 className="text-2xl font-semibold ml-3">Fire Skills</h2>
              </div>
              <p className="text-gray-600 mb-6">Master the art of fire building and maintenance in any condition.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/tarp-setups" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 icon-outdoors mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 20h16M4 20l8-16 8 16"/>
                </svg>
                <h2 className="text-2xl font-semibold">Tarp Setups</h2>
              </div>
              <p className="text-gray-600 mb-6">Different configurations for shelter and protection.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/campfire-cooking" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <CookingIcon />
                <h2 className="text-2xl font-semibold ml-3">Campfire Cooking</h2>
              </div>
              <p className="text-gray-600 mb-6">Delicious recipes and cooking techniques for the outdoors.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/weather" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 icon-outdoors mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Sun center */}
                  <circle cx="12" cy="12" r="4" />
                  {/* Sun rays */}
                  <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />
                </svg>
                <h2 className="text-2xl font-semibold">Weather Forecast</h2>
              </div>
              <p className="text-gray-600 mb-6">Stay prepared with accurate weather predictions.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/sos" className="block transform transition-all duration-300 hover:scale-105">
            <div className="card-outdoors p-8">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 icon-outdoors mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="6" width="12" height="12" fill="#ef4444" />
                  <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" />
                </svg>
                <h2 className="text-2xl font-semibold">SOS Guide</h2>
              </div>
              <p className="text-gray-600 mb-6">Emergency procedures and survival techniques.</p>
              <span className="link-outdoors inline-flex items-center">
                Learn more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <div className="card-outdoors p-8 bg-gradient-to-br from-pine-dark to-pine-light text-white transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-6">
              <BellIcon />
              <h2 className="text-2xl font-semibold ml-3">Daily Tips</h2>
            </div>
            <p className="mb-6">Get daily camping and survival tips delivered to you.</p>
            <button className="btn-woodsman bg-white/20 hover:bg-white/30 text-white border-white/30">
              Subscribe Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
