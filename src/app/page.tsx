import Link from "next/link";
import Navigation from "./components/Navigation";
import { 
  TreeIcon, 
  FireIcon, 
  CompassIcon, 
  BellIcon, 
  CookingIcon, 
  KnotIcon, 
  TentIcon, 
  WeatherIcon, 
  MedicalIcon,
  MapIcon,
  LeafIcon,
  FishIcon
} from "./components/Icons";

export default function Home() {
  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="hero-section text-center py-16 mb-12 px-6 mx-auto max-w-6xl">
          <span className="accent-text text-xl mb-2 block">Explore • Learn • Adventure</span>
          <h1 className="text-5xl font-bold mb-6">Master Your Outdoor Skills</h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            From essential knots to campfire cooking, learn practical skills for your next outdoor adventure
          </p>
          <div className="flex justify-center space-x-8 mb-10">
            <div className="flex flex-col items-center">
              <TreeIcon />
              <span className="mt-2 font-medium">Shelters</span>
            </div>
            <div className="flex flex-col items-center">
              <FireIcon />
              <span className="mt-2 font-medium">Fire Skills</span>
            </div>
            <div className="flex flex-col items-center">
              <CompassIcon />
              <span className="mt-2 font-medium">Navigation</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/adventure-planner">
              <button className="btn-woodsman">
                Start an Adventure
              </button>
            </Link>
            <button className="btn-secondary">
              Start Learning
            </button>
            <button className="btn-secondary">
              Join Community
            </button>
          </div>
        </section>

        {/* Featured Skills Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 mb-16 max-w-6xl mx-auto">
          <Link href="/knots" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <KnotIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Essential Knots</h2>
              </div>
              <p className="text-gray-600 mb-6">Master crucial knots that will serve you well in any camping or survival situation.</p>
              <span className="link-outdoors inline-flex items-center">
                Explore knots 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/fire" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <FireIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Fire Making</h2>
              </div>
              <p className="text-gray-600 mb-6">Learn fire-starting techniques that work even in challenging weather conditions.</p>
              <span className="link-outdoors inline-flex items-center">
                Master fire skills 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/tarp-setups" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <TentIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Tarp Shelters</h2>
              </div>
              <p className="text-gray-600 mb-6">Discover versatile tarp configurations for shelter and protection in the wilderness.</p>
              <span className="link-outdoors inline-flex items-center">
                Explore setups 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/campfire-cooking" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <CookingIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Outdoor Cooking</h2>
              </div>
              <p className="text-gray-600 mb-6">Create delicious meals with minimal equipment using these campfire cooking techniques.</p>
              <span className="link-outdoors inline-flex items-center">
                Discover recipes 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/weather" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <WeatherIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Weather Skills</h2>
              </div>
              <p className="text-gray-600 mb-6">Learn to predict weather changes by observing natural signs in your environment.</p>
              <span className="link-outdoors inline-flex items-center">
                Read the skies 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/sos" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <MedicalIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Emergency Guide</h2>
              </div>
              <p className="text-gray-600 mb-6">Essential wilderness first aid, survival procedures, and emergency response techniques for outdoor situations.</p>
              <span className="link-outdoors inline-flex items-center text-sunset-orange">
                Safety guide 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/foraging" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <LeafIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Foraging & Plants</h2>
              </div>
              <p className="text-gray-600 mb-6">Identify edible plants and learn safe foraging practices for wilderness nutrition.</p>
              <span className="link-outdoors inline-flex items-center">
                Discover plants 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/navigation" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <MapIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Navigation Skills</h2>
              </div>
              <p className="text-gray-600 mb-6">Master compass use, map reading, terrain navigation, and natural wayfinding methods.</p>
              <span className="link-outdoors inline-flex items-center">
                Find your way 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          <Link href="/water-purification" className="block transform transition-all duration-300 hover:scale-102">
            <div className="card-outdoors p-8 h-full">
              <div className="flex items-center mb-5">
                <FishIcon size={42} />
                <h2 className="text-2xl font-semibold ml-3">Water Purification</h2>
              </div>
              <p className="text-gray-600 mb-6">Learn essential techniques for finding and purifying water in wilderness settings.</p>
              <span className="link-outdoors inline-flex items-center">
                Clean water guides
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        </section>

        {/* Featured showcase */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-7 gap-6">
            <div className="md:col-span-3 card-outdoors p-8">
              <h2 className="text-2xl font-bold mb-4">Ready for Adventure?</h2>
              <p className="text-gray-600 mb-6">
                Join our community of outdoor enthusiasts and gain access to exclusive guides, expert tips, and connect with fellow adventurers.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-forest-green-medium mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Exclusive video tutorials</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-forest-green-medium mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly challenges & badges</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-forest-green-medium mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Printable field guides</span>
                </div>
              </div>
              <button className="btn-accent">
                Join Now
              </button>
            </div>
            <div className="md:col-span-4 card-outdoors p-0 overflow-hidden">
              <div className="h-full relative bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"}}>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="accent-text mb-1">Featured Skill</div>
                  <h3 className="text-xl font-bold mb-2">Wilderness Navigation</h3>
                  <p className="text-white/90 text-sm mb-3">Learn to find your way using the stars, natural landmarks, and more.</p>
                  <button className="text-white font-semibold flex items-center text-sm">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="card-outdoors p-10 text-center shadow-lg border-t-4 border-sunset-orange">
            <div className="flex justify-center mb-6">
              <BellIcon color="#FF7F50" size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-pine-dark">Get Outdoor Tips & Tricks</h2>
            <p className="mb-8 max-w-xl mx-auto text-gray-700 text-lg">
              Join our newsletter for weekly camping tips, seasonal guides, and exclusive outdoor skills content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg flex-grow bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange"
                aria-label="Email address for newsletter subscription"
              />
              <button className="px-6 py-3 bg-earth-dark hover:bg-earth-dark/90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg border-2 border-sunset-orange">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
