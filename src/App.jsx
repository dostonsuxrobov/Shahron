import React, { useEffect, useState } from 'react';
import { 
  Menu, X, Phone, ChevronDown, CheckCircle, 
  Star, Shield, ThumbsUp, Car, Loader2, ArrowLeft,
  FileText, MessageSquare, Lock, UserCheck, Mail
} from 'lucide-react';

// ==========================================
// 1. DATA
// ==========================================

const CAR_DEALS = [
  {
    id: 1,
    make: 'Honda',
    model: 'Accord',
    year: '2026',
    price: 429.99,
    term: 36,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+Honda+Accord',
    type: 'Sedan'
  },
  {
    id: 2,
    make: 'Mazda',
    model: 'CX-30',
    year: '2026',
    price: 309.99,
    term: 33,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+Mazda+CX-30',
    type: 'SUV'
  },
  {
    id: 3,
    make: 'Nissan',
    model: 'Pathfinder',
    year: '2026',
    price: 419.99,
    term: 24,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+Nissan+Pathfinder',
    type: 'SUV'
  },
  {
    id: 4,
    make: 'BMW',
    model: 'X5',
    year: '2026',
    price: 899.99,
    term: 39,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+BMW+X5',
    type: 'SUV'
  },
  {
    id: 5,
    make: 'Nissan',
    model: 'Rogue',
    year: '2026',
    price: 339.99,
    term: 39,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+Nissan+Rogue',
    type: 'SUV'
  },
  {
    id: 6,
    make: 'Honda',
    model: 'Prologue',
    year: '2026',
    price: 339.99,
    term: 36,
    miles: '10,000',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=2026+Honda+Prologue',
    type: 'Electric'
  }
];

const FAQS = [
  {
    question: "How does leasing a car work?",
    answer: "Leasing a car means entering into a long-term rental agreement for driving the new car. It includes lower monthly payments, $0 down payment, no depreciation worries, and no resale hassle. Unlike a traditional purchase, you don't actually own the vehicle."
  },
  {
    question: "What terms do I need to know to get a good lease deal?",
    answer: "1. Depreciation: The difference between the negotiated sale price and its predicted worth at the end. 2. MSRP: Manufacturer's Suggested Retail Price. 3. Residual Value: The amount the car is expected to be worth at the end of the lease."
  },
  {
    question: "What is the difference between leasing and financing a car?",
    answer: "Leasing is generally a cheaper monthly alternative to buying outright or financing. You only pay for the vehicle's depreciation during the time you drive it. Financing requires a larger upfront commitment but results in ownership."
  }
];

// ==========================================
// 2. ATOMIC COMPONENTS
// ==========================================

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-bold rounded transition-all duration-300 flex items-center justify-center cursor-pointer uppercase tracking-wider text-sm";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 px-6 py-3 shadow-lg shadow-red-600/20",
    outline: "border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-6 py-3",
    nav: "text-gray-300 hover:text-red-500 px-3 py-2 text-sm font-semibold"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle, centered = false, light = false }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    <div className={`w-12 h-1 bg-red-600 mb-4 ${centered ? 'mx-auto' : ''}`} />
    <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-tight ${light ? 'text-white' : 'text-white'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-400' : 'text-gray-400'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
        <CheckCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h3 className="text-3xl font-extrabold text-white mb-2 uppercase">Quote Sent!</h3>
        <p className="text-gray-400 mb-8 text-lg">
          Thank you for your request. One of our lease experts will review your details and contact you shortly with a personalized offer.
        </p>
        <Button variant="primary" onClick={onClose} className="w-full text-lg">
          Got it, thanks!
        </Button>
      </div>
    </div>
  );
};

// ==========================================
// 3. SECTION COMPONENTS
// ==========================================

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Lease Deals', href: '#deals' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Privacy Policy', href: '#privacy-policy' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-tighter text-white">
              ALPHA <span className="text-red-600">AUTO</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  item.href === '#privacy-policy'
                    ? 'border border-neutral-700 text-white hover:border-red-600 hover:text-red-500'
                    : 'text-gray-300 hover:text-red-500'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden xl:flex items-center space-x-4">
            <a href="tel:+19294797777" className="flex items-center text-white hover:text-red-500 font-bold text-sm transition-colors">
              <Phone className="w-4 h-4 mr-2 text-red-500" />
              +1 (929) 479-7777
            </a>
            <a href="#quote" className="font-bold rounded transition-all duration-300 flex items-center justify-center uppercase tracking-wider text-sm bg-red-600 text-white hover:bg-red-700 px-5 py-3 shadow-lg shadow-red-600/20">
              Free Quote
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-black border-t border-neutral-800 px-4 pb-6 pt-2 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded px-3 py-3 font-semibold text-sm uppercase tracking-wider transition-colors ${
                item.href === '#privacy-policy'
                  ? 'mt-2 border border-neutral-700 text-white hover:border-red-600 hover:text-red-500'
                  : 'text-gray-300 hover:bg-neutral-900 hover:text-red-500'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href="tel:+19294797777" className="flex items-center text-white hover:text-red-500 font-bold text-sm px-3 pt-3 transition-colors">
            <Phone className="w-4 h-4 mr-2 text-red-500" />
            +1 (929) 479-7777
          </a>
          <a href="#quote" onClick={() => setIsMenuOpen(false)} className="mt-4 w-full font-bold rounded transition-all duration-300 flex items-center justify-center uppercase tracking-wider text-sm bg-red-600 text-white hover:bg-red-700 px-6 py-3 shadow-lg shadow-red-600/20">
            Free Quote
          </a>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);
    formData.append("access_key", "776fd99d-a9a4-44e5-b315-69a9cf49ebd2");
    formData.append("subject", "New Lease Quote Request — Alpha Auto");
    formData.append("from_name", "Alpha Auto Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
        e.target.reset();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative bg-black text-white overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        
        <div className="w-full lg:w-3/5 lg:pr-12 mb-12 lg:mb-0">
          <div className="inline-block bg-red-600 text-white font-bold px-4 py-1 rounded text-xs mb-6 uppercase tracking-widest">
            Best Car Lease Deals
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 uppercase tracking-tight">
            Lease your new car <br/><span className="text-red-500">completely online.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
            Sign your deal FAST and EASY with a personal assistant working with you from quote to car delivery. We facilitate delivery by a dealership to your home within 48 hours across all states.
          </p>
          
          <div className="flex gap-8 mt-10">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '10K+', label: 'Happy Clients' },
              { value: '48hr', label: 'Fast Delivery' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-red-500">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="quote" className="w-full lg:w-2/5 scroll-mt-28">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2 uppercase">Get your free quote</h3>
            <p className="text-gray-500 mb-6 text-sm">On any make & model. No commitment required.</p>
            
            <form className="space-y-4" onSubmit={handleQuoteSubmit}>
              {/* Hidden honeypot field — catches bots */}
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-400">Make</label>
                  <select name="make" required className="w-full border border-neutral-700 bg-neutral-800 text-white rounded p-3 focus:ring-2 focus:ring-red-600 focus:outline-none focus:border-red-600">
                    <option value="">Select Make</option>
                    <option value="BMW">BMW</option>
                    <option value="Honda">Honda</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Nissan">Nissan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-400">Model</label>
                  <input type="text" name="model" required placeholder="e.g. X5" className="w-full border border-neutral-700 bg-neutral-800 text-white rounded p-3 focus:ring-2 focus:ring-red-600 focus:outline-none focus:border-red-600 placeholder-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-400">Full Name</label>
                <input type="text" name="name" required placeholder="John Doe" className="w-full border border-neutral-700 bg-neutral-800 text-white rounded p-3 focus:ring-2 focus:ring-red-600 focus:outline-none focus:border-red-600 placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-400">Phone Number</label>
                <input type="tel" name="phone" required placeholder="(555) 000-0000" className="w-full border border-neutral-700 bg-neutral-800 text-white rounded p-3 focus:ring-2 focus:ring-red-600 focus:outline-none focus:border-red-600 placeholder-gray-600" />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 text-lg font-bold rounded transition-all duration-300 flex items-center justify-center cursor-pointer uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 px-6 py-3 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-20 bg-neutral-950 border-t border-neutral-800 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle 
            title="Passion for Cars, Dedication to You" 
            subtitle="Alpha Auto is one of the fastest growing companies offering car leasing deals in the NYC and Tri-State area."
            light
          />
          <div className="space-y-4 text-gray-400 text-lg">
            <p>
              Since 1997, our multifaceted service includes auto leasing, sales, as well as trade-ins of new and used vehicles. With operating principles of low inventory costs and dealer fleet program access, we are able to pass substantial savings to our customers so you can lease a car at the best price.
            </p>
            <p>
              Our office is staffed with passionate automobile enthusiasts eager to lend their expertise. We pride ourselves on making your experience educated, seamless, and transparent, while guaranteeing the most competitive prices in the nation.
            </p>
          </div>
          <div className="mt-8 flex items-center space-x-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-11 h-11 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-gray-500 font-bold text-xs">
                  User
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-red-500">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-white mt-1">10,000+ Trusted Clients</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800" alt="Premium Dealership" className="object-cover w-full h-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-lg shadow-xl">
            <div className="text-4xl font-black">25+</div>
            <div className="text-sm font-medium uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DealCard = ({ car }) => (
  <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600/50 transition-all duration-300 flex flex-col group">
    <div className="relative h-48 bg-neutral-800 flex items-center justify-center overflow-hidden">
      <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-red-500 uppercase tracking-wider">
        {car.type}
      </div>
    </div>
    
    <div className="p-6 flex-grow flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 uppercase">{car.year} {car.make} {car.model}</h3>
        <p className="text-sm text-gray-500">Lease Offers</p>
      </div>
      
      <div className="mb-6 pb-6 border-b border-neutral-800">
        <div className="flex items-end">
          <span className="text-3xl font-black text-red-500">${car.price}</span>
          <span className="text-gray-500 font-medium ml-1 mb-1">/ mo</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
        <div className="bg-neutral-800 p-3 rounded">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Term</p>
          <p className="font-bold text-white">{car.term} Months</p>
        </div>
        <div className="bg-neutral-800 p-3 rounded">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Mileage</p>
          <p className="font-bold text-white">{car.miles}/yr</p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full">View Details</Button>
    </div>
  </div>
);

const BestDealsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All Models');
  
  const filterCategories = ['All Models', 'SUVs', 'Sedans', 'Electric/Hybrid', 'Exotic'];

  const getFilteredCars = () => {
    if (activeFilter === 'All Models') return CAR_DEALS;
    if (activeFilter === 'SUVs') return CAR_DEALS.filter(car => car.type === 'SUV');
    if (activeFilter === 'Sedans') return CAR_DEALS.filter(car => car.type === 'Sedan');
    if (activeFilter === 'Electric/Hybrid') return CAR_DEALS.filter(car => car.type === 'Electric' || car.type === 'Hybrid');
    if (activeFilter === 'Exotic') return CAR_DEALS.filter(car => car.type === 'Exotic');
    return CAR_DEALS;
  };

  const visibleCars = getFilteredCars();

  return (
    <section id="deals" className="py-20 bg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Best Car Lease Deals" 
          subtitle="Explore our top picks for February 2026. Hand-selected vehicles offering the best value, comfort, and performance."
          centered={true}
          light
        />
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer
                ${activeFilter === cat 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                  : 'bg-neutral-900 text-gray-400 border border-neutral-800 hover:border-red-600/50 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCars.length > 0 ? (
            visibleCars.map(car => <DealCard key={car.id} car={car} />)
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 font-semibold text-lg">
              No vehicles found in this category right now. Check back soon!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-red-600/40 transition-colors duration-300">
    <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-white mb-3 uppercase">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const WhyChooseUs = () => (
  <section className="py-20 bg-neutral-950 border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        title="Why Choose Alpha Auto" 
        subtitle="Unmatched quality and service tailored specifically to your automotive needs."
        centered={true}
        light
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Feature 
          icon={ThumbsUp} 
          title="Exceptional Service" 
          description="Our team is here for you every step of the way, ensuring a smooth and enjoyable leasing experience." 
        />
        <Feature 
          icon={Star} 
          title="Exclusive Offers" 
          description="We provide unbeatable lease deals on a wide range of vehicles, tailored to meet your needs and budget." 
        />
        <Feature 
          icon={Shield} 
          title="Quality & Reliability" 
          description="Drive with confidence knowing our cars are meticulously maintained and meet the highest standards." 
        />
        <Feature 
          icon={Car} 
          title="Easy Return & Trade-In" 
          description="When it's time to upgrade, our hassle-free return and trade-in options make it simple to get your next car." 
        />
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Choose your car', desc: 'Check our catalog for a wide range of makes and models.' },
    { num: '02', title: 'Get your quote', desc: 'Find your price. You can also sell or trade-in your old car.' },
    { num: '03', title: 'Confirm your quote', desc: 'Settle details with an expert and prepare the contract.' },
    { num: '04', title: 'Free delivery', desc: 'Pick up your car at our Brooklyn location or get free door-to-door delivery.' }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black border-t border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Simple Steps to Your New Car"
          subtitle="Leasing your next car with us is straightforward and hassle-free. Experience a seamless process from start to finish!"
          centered={true}
          light
        />
        
        <div className="grid md:grid-cols-4 gap-8 relative mt-16">
          <div className="hidden md:block absolute top-10 left-[12.5%] w-3/4 h-px bg-neutral-800 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-neutral-900 border-2 border-red-600 rounded-full flex items-center justify-center text-2xl font-black text-red-500 mb-6 shadow-lg shadow-red-600/10">
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white uppercase">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-neutral-800 rounded-lg bg-neutral-900 mb-4 overflow-hidden">
      <button 
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-neutral-800 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-white pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-red-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 border-t border-neutral-800 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section id="faqs" className="py-20 bg-neutral-950 border-t border-neutral-800 scroll-mt-20">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common leasing questions below."
        centered={true}
        light
      />
      <div className="mt-10">
        {FAQS.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="py-16 bg-red-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
        Ready to Drive Your Dream Car?
      </h2>
      <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
        Get a personalized lease quote in minutes. No commitment, no hassle.
      </p>
      <Button
        variant="primary"
        onClick={() =>
          document
            .getElementById('quote')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="bg-white !text-red-600 hover:bg-gray-100 px-10 py-4 text-lg shadow-xl"
      >
        Get Your Free Quote Now
      </Button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-gray-500 pt-16 pb-10 border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-10">
        <div>
          <span className="text-2xl font-black tracking-tighter text-white">
            ALPHA <span className="text-red-600">AUTO</span>
          </span>
          <p className="text-sm mt-3 text-gray-600 max-w-xs">
            NYC & Tri-State area's trusted car leasing partner since 1997.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          {[
            { label: 'Home', href: '#home' },
            { label: 'About Us', href: '#about' },
            { label: 'Best Deals', href: '#deals' },
            { label: 'FAQs', href: '#faqs' },
            { label: 'Privacy Policy', href: '#privacy-policy' },
          ].map(link => (
            <a key={link.label} href={link.href} className="text-gray-500 hover:text-red-500 font-semibold uppercase tracking-wider text-xs transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center text-white font-bold text-sm">
          <Phone className="w-4 h-4 mr-2 text-red-500" />
          +1 (929) 479-7777
        </div>
      </div>
      <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600">Photos are generic and for reference only. Alpha Auto is a non franchise dealer.</p>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Alpha Auto. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const PolicySection = ({ number, title, children }) => (
  <section className="border-t border-neutral-800 py-8 first:border-t-0 first:pt-0">
    <div className="flex gap-4">
      <span className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-600/10 text-xs font-black text-red-500">
        {number}
      </span>
      <div className="min-w-0">
        <h2 className="mb-4 text-xl font-extrabold uppercase tracking-tight text-white md:text-2xl">{title}</h2>
        <div className="space-y-4 text-[15px] leading-7 text-gray-400 md:text-base">{children}</div>
      </div>
    </div>
  </section>
);

const PolicyCallout = ({ children }) => (
  <div className="rounded-lg border border-red-600/30 border-l-4 border-l-red-600 bg-red-600/5 p-5 text-gray-300">
    {children}
  </div>
);

const PrivacyPolicy = () => (
  <main id="privacy-policy" className="bg-black scroll-mt-20">
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <a href="#home" className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-red-500">
          <ArrowLeft className="h-4 w-4" />
          Back to Alpha Auto
        </a>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded border border-red-600/30 bg-red-600/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500">
              <FileText className="h-4 w-4" />
              Legal & Privacy
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">Privacy Policy</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              How Alpha Auto LLC collects, uses, protects, and shares information when you use our website and services.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-black/60 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Last updated</p>
            <p className="mt-1 font-bold text-white">July 21, 2026</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Lock, title: 'Your data', text: 'Reasonable safeguards protect the information you share.' },
          { icon: MessageSquare, title: 'SMS control', text: 'Reply STOP at any time to opt out of text messages.' },
          { icon: UserCheck, title: 'No data sales', text: 'We do not sell your personal information.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <Icon className="mb-4 h-6 w-6 text-red-500" />
            <h2 className="font-bold uppercase tracking-wide text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl shadow-black/20 md:p-10">
        <p className="mb-10 text-base leading-8 text-gray-300 md:text-lg">
          Alpha Auto LLC (&quot;Alpha Auto,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates as an auto brokerage helping customers find, finance, and purchase vehicles. This Privacy Policy explains what information we collect through our website and communications with you, how we use it, and the choices you have — including with respect to SMS/text messaging.
        </p>

        <PolicySection number="01" title="Information We Collect">
          <p>We may collect the following types of information when you use our website, contact us, or request our services:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-red-500">
            <li><strong className="text-gray-200">Contact information</strong> you provide, such as your name, phone number, email address, and mailing address.</li>
            <li><strong className="text-gray-200">Vehicle interest and brokerage details</strong>, such as the make/model you&apos;re looking for, trade-in information, or budget.</li>
            <li><strong className="text-gray-200">Financing-related information</strong> you voluntarily submit if you request help arranging financing.</li>
            <li><strong className="text-gray-200">Communication records</strong>, including messages sent through contact forms, phone calls, email, and text messages.</li>
            <li><strong className="text-gray-200">Technical information</strong> such as browser type, device information, and general usage data collected automatically when you visit our site.</li>
          </ul>
        </PolicySection>

        <PolicySection number="02" title="How We Use Your Information">
          <ul className="list-disc space-y-2 pl-5 marker:text-red-500">
            <li>To respond to inquiries and provide brokerage services (locating vehicles, coordinating purchases, connecting you with financing options).</li>
            <li>To communicate with you about your request, appointment, or transaction via phone, email, or SMS text message.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </PolicySection>

        <PolicySection number="03" title="SMS / Text Messaging Terms">
          <p>By providing your mobile phone number and opting in, you consent to receive text messages from Alpha Auto LLC related to your vehicle inquiry, appointment reminders, financing updates, and customer service communications.</p>
          <PolicyCallout>
            <div className="space-y-3">
              <p><strong className="text-white">Consent is not a condition of purchase.</strong> Message frequency may vary. Message and data rates may apply.</p>
              <p><strong className="text-white">Opt-out:</strong> You may opt out of text messages at any time by replying <strong className="text-white">STOP</strong> to any message you receive from us. You will receive a one-time confirmation message, and no further messages will be sent unless you opt back in.</p>
              <p><strong className="text-white">Help:</strong> Reply <strong className="text-white">HELP</strong> for assistance, or contact us directly at <a className="font-semibold text-red-500 hover:text-red-400" href="mailto:sales@alpha-auto.net">sales@alpha-auto.net</a> or <a className="font-semibold text-red-500 hover:text-red-400" href="tel:2232507777">223-250-7777</a>.</p>
              <p><strong className="text-white">Carriers are not liable</strong> for delayed or undelivered messages.</p>
            </div>
          </PolicyCallout>
        </PolicySection>

        <PolicySection number="04" title="Sharing of Information">
          <p>We do not sell your personal information. We do not share your information with third parties for their own marketing purposes.</p>
          <PolicyCallout>
            <p><strong className="text-white">No mobile opt-in data is shared with third parties.</strong> Text messaging originator opt-in data and consent will not be shared with any third parties or affiliates for any purpose, including marketing and promotional purposes.</p>
          </PolicyCallout>
          <p>We may share information with:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-red-500">
            <li>Financing partners or lenders, only when you request our help arranging financing, and only with your knowledge.</li>
            <li>Service providers who help us operate our business (such as website hosting or communication platforms), who are contractually bound to protect your information.</li>
            <li>Authorities, when required by law or to protect our legal rights.</li>
          </ul>
        </PolicySection>

        <PolicySection number="05" title="Data Security">
          <p>We use reasonable administrative and technical safeguards to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
        </PolicySection>

        <PolicySection number="06" title="Your Choices">
          <ul className="list-disc space-y-2 pl-5 marker:text-red-500">
            <li>You may opt out of SMS communications at any time by replying STOP.</li>
            <li>You may request that we delete your contact information by emailing us at <a className="font-semibold text-red-500 hover:text-red-400" href="mailto:sales@alpha-auto.net">sales@alpha-auto.net</a>.</li>
            <li>You may unsubscribe from promotional emails using the link provided in those emails.</li>
          </ul>
        </PolicySection>

        <PolicySection number="07" title="Children's Privacy">
          <p>Our website and services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.</p>
        </PolicySection>

        <PolicySection number="08" title="Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date.</p>
        </PolicySection>

        <PolicySection number="09" title="Contact Us">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-lg font-extrabold uppercase tracking-wide text-white">Alpha Auto LLC</p>
            <p>1228 Radcliffe Street, Bristol, PA 19007</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-6">
              <a className="inline-flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-400" href="mailto:sales@alpha-auto.net">
                <Mail className="h-4 w-4" /> sales@alpha-auto.net
              </a>
              <a className="inline-flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-400" href="tel:2232507777">
                <Phone className="h-4 w-4" /> 223-250-7777
              </a>
            </div>
          </div>
        </PolicySection>
      </div>
    </section>
  </main>
);

// ==========================================
// 4. MAIN APPLICATION
// ==========================================

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = route === '#privacy-policy'
      ? 'Privacy Policy | Alpha Auto'
      : 'Alpha Auto | Car Lease Deals';

    const frame = window.requestAnimationFrame(() => {
      const targetId = route.replace('#', '') || 'home';
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [route]);

  const isPrivacyPolicy = route === '#privacy-policy';

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-red-600 selection:text-white">
      <Header />
      {isPrivacyPolicy ? (
        <PrivacyPolicy />
      ) : (
        <main>
          <Hero />
          <AboutSection />
          <BestDealsSection />
          <WhyChooseUs />
          <HowItWorks />
          <CTABanner />
          <FAQSection />
        </main>
      )}
      <Footer />
    </div>
  );
}
