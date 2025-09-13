import React, { useState, useEffect } from 'react';
import { ChevronDown, Coffee, Zap, Clock, Shield, MapPin, Users, TrendingUp, Mail, Phone, Star, Menu, X } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'features', 'locations', 'scale', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('https://i.postimg.cc/k56TDJMH/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Overlay for better content visibility - now less opaque */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a093680] via-[#1a093660] to-[#1a0936b3]"></div>
      </div>
      {/* Stars Background (optional) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Popup Modal for Learn More */}
      {showLearnMore && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-purple-900/90 to-purple-800/80 rounded-2xl p-8 max-w-md w-full border border-purple-500/40 shadow-xl animate-pop-up relative">
            <button
              onClick={() => setShowLearnMore(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-purple-400 text-2xl font-bold cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Host a Galaxy Coffee Kiosk
            </h2>
            <p className="text-gray-300 mb-4">
              Transform your space with a fully autonomous, barista-quality coffee kiosk. 
              Delight your customers, boost your revenue, and join the future of food & beverage.
            </p>
            <ul className="list-disc list-inside text-purple-300 mb-4">
              <li>Minimal space required (~2.5 m²)</li>
              <li>No plumbing or kitchen needed</li>
              <li>24/7 operation & self-cleaning</li>
              <li>Social-media-ready experience</li>
            </ul>
            <button
              onClick={() => {
                setShowLearnMore(false);
                scrollToSection('contact');
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 animate-pulse-glow cursor-pointer mt-2"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10">
                <img 
                  src="https://i.postimg.cc/HswPWvnC/Asset-5.png" 
                  alt="Galaxy Coffee Co. Logo" 
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
                Galaxy Coffee Co.
              </span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'features', label: 'Features' },
                { id: 'locations', label: 'Locations' },
                { id: 'scale', label: 'Partnership' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-purple-400 transition-colors cursor-pointer ${
                    activeSection === item.id ? 'text-purple-400' : 'text-gray-300'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-purple-400 hover:text-purple-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-lg border-b border-purple-500/20 z-50">
            <div className="flex flex-col items-center py-4 space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'features', label: 'Features' },
                { id: 'locations', label: 'Locations' },
                { id: 'scale', label: 'Partnership' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full py-2 text-lg font-semibold hover:text-purple-400 transition-colors cursor-pointer ${
                    activeSection === item.id ? 'text-purple-400' : 'text-gray-300'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Brand Logo - moved here */}
        <div className="w-full flex justify-center items-center absolute top-0 left-0 pt-8 z-20 my-8 lg:my-16">
          <img
            src="https://i.postimg.cc/HswPWvnC/Asset-5.png"
            alt="Galaxy Coffee Co. Logo"
            className="h-32 sm:h-40 lg:h-80 w-auto drop-shadow-2xl"
            style={{ maxWidth: '380px' }}
          />
        </div>
        {/* Removed Hero Background Image */}
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-5xl mx-auto animate-fade-in-up">
          <h2 className="text-purple-300 text-2xl font-bold my-8" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
            Coffee From Another Galaxy
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Welcome to the
            </span>
            <br />
            <span className="text-white">Future of Coffee</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed ">
            Fully autonomous robotic kiosks that serve premium, barista-level beverages 24/7. 
            No lines, no staffing issues, no inconsistent quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 animate-pulse-glow cursor-pointer"
            >
              Discover the Future
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Partner With Us
            </button>
          </div>
        </div>
        
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
              We don't just serve coffee.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                We serve the future.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              At Galaxy Coffee Co., we believe that getting great coffee should be fast, consistent, 
              and exciting — without long lines, staffing issues, or inconsistent quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-center text-center">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:scale-105 transition-all duration-300 hover:border-purple-400/40 flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fully Autonomous</h3>
              <p className="text-gray-300">
                Advanced automation with Italian-quality brewing in sleek, eye-catching units built to perform anywhere, anytime.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:scale-105 transition-all duration-300 hover:border-purple-400/40 flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Availability</h3>
              <p className="text-gray-300">
                Always open for high-traffic locations. Whether it's morning rush or late-night cravings, we're always ready.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:scale-105 transition-all duration-300 hover:border-purple-400/40 flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Self-Cleaning</h3>
              <p className="text-gray-300">
                Meets strict food safety and hygiene standards with automated cleaning systems that maintain perfect conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
              What Is a <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Galaxy Coffee Kiosk?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our compact robotic coffee stations combine advanced automation with Italian-quality brewing, 
              in a sleek, eye-catching unit that's built to perform — anywhere, anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Coffee className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">70+ Drink Variations</h3>
                  <p className="text-gray-300">Hot and iced, real beans, real milk, multiple flavors</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fully Autonomous</h3>
                  <p className="text-gray-300">No staff needed, just power and space</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Self-Cleaning</h3>
                  <p className="text-gray-300">Meets strict food safety and hygiene standards</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Always Open</h3>
                  <p className="text-gray-300">24/7 availability for high-traffic locations</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Social-Media-Ready</h3>
                  <p className="text-gray-300">The robotic arm is a showstopper – customers love to film and share</p>
                </div>
              </div>
            </div>

            {/* Robot Coffee Machine Image - Clean and Themed */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 rounded-3xl shadow-lg border border-purple-500/30 p-8 flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/5N1TGV7d/galaxy-coffee-co-machine.png" // Ensure this path points to your local asset
                  alt="Galaxy Robot Coffee Machine"
                  className="h-64 w-auto object-contain drop-shadow-xl"
                  style={{ background: "rgba(60, 7, 83, 0.08)", borderRadius: "1.5rem" }}
                />
              </div>
              <p className="text-purple-300 font-semibold text-center mt-6 text-lg">
                The Galaxy Coffee Kiosk: Robotic precision, barista-quality taste.
              </p>
              <p className="text-gray-400 text-center mt-2 text-sm">
                Sleek, compact, and futuristic — designed to stand out in any space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
              Perfect for <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Any Location</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our kiosks are made for high-traffic, tech-friendly environments. Galaxy Coffee brings 
              added value, customer satisfaction, and innovation to your space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: MapPin, title: 'Shopping Centers' },
              { icon: Zap, title: 'Airports' },
              { icon: Users, title: 'Universities' },
              { icon: Star, title: 'Hotels & Resorts' },
            ].map((location, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center hover:scale-105 transition-all duration-300 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <location.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold">{location.title}</h3>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">All we need is:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">~2.5 m² of space</h4>
                <p className="text-gray-300 text-sm">(≈27 sqft)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">Standard power connection</h4>
                <p className="text-gray-300 text-sm">No plumbing required</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">Daily service</h4>
                <p className="text-gray-300 text-sm">30 min/day restocking & cleaning</p>
              </div>
            </div>
            <p className="text-center text-lg mt-8 text-purple-300">
              That's it. No plumbing. No kitchen. No staff management.
            </p>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section id="scale" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
              Built to <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Scale</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Galaxy Coffee isn't just a product. It's a brand. Our mission is to build a nationwide 
              network of premium robotic coffee kiosks — supported by local partners, franchisees, and smart infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center hover:scale-105 transition-all duration-300 hover:border-purple-400/40">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Host a Kiosk</h3>
              <p className="text-gray-300 mb-6">
                Transform your space with cutting-edge coffee technology that delights customers and generates revenue.
              </p>
              <button
                className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                onClick={() => setShowLearnMore(true)}
              >
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center hover:scale-105 transition-all duration-300 hover:border-purple-400/40">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Franchise Opportunity</h3>
              <p className="text-gray-300 mb-6">
                Own your region and build a network of robotic coffee kiosks with our proven business model.
              </p>
              <button
                className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                onClick={() => scrollToSection('contact')}
              >
                Inquire Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center hover:scale-105 transition-all duration-300 hover:border-purple-400/40">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Investment Opportunity</h3>
              <p className="text-gray-300 mb-6">
                Invest in the future of coffee with low operating costs, high margins, and growing demand.
              </p>
              <button
                className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                onClick={() => scrollToSection('contact')}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center">
            <p className="text-2xl md:text-3xl font-bold mb-4 animate-pulse-text">
              With low operating costs, high margins, and growing demand for contactless solutions, 
              Galaxy Coffee is the perfect concept for the future of food & beverage.
            </p>
            <p className="text-xl text-purple-300">
              Because the future of coffee… isn't human.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
              Let's <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interested in partnering or franchising? Let us show you how Galaxy Coffee Co. 
              can elevate your space and deliver real results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:m.klapp@galaxy-coffee-company.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                        m.klapp@galaxy-coffee-company.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+15592455755" className="text-purple-400 hover:text-purple-300 transition-colors">
                        +1 (559) 245-5755
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-300">
                        Galaxy Coffee Company LLC<br />
                        Maurice Klapp<br />
                        1901 Avenue of the Stars<br />
                        Suite 200<br />
                        Los Angeles, CA 90067
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interest</label>
                  <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors">
                    <option>Host a Kiosk</option>
                    <option>Franchise Opportunity</option>
                    <option>Investment Opportunity</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your location or interest..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 animate-pulse-glow cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="https://i.postimg.cc/HswPWvnC/Asset-5.png" 
                alt="Galaxy Coffee Co. Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Andaro, Montserrat, Arial, Helvetica, sans-serif' }}>
                Galaxy Coffee Co.
              </span>
            </div>
            <p className="text-gray-400 text-center">
              Barista-quality. Robotic precision. Zero hassle.
            </p>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 Galaxy Coffee Company LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Add animation styles */}
      <style>
        {`
          @keyframes pop-up {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-up {
            animation: pop-up 0.3s cubic-bezier(.4,2,.3,1) forwards;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}

export default App;