import React, { useState } from 'react';
import { 
  Menu, X, Phone, ChevronDown, CheckCircle, 
  MapPin, Star, Shield, ThumbsUp, Car, Battery, Zap 
} from 'lucide-react';

// ==========================================
// 1. DATA (The "DNA" of the application)
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+Honda+Accord',
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+Mazda+CX-30',
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+Nissan+Pathfinder',
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+BMW+X5',
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+Nissan+Rogue',
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
    image: 'https://placehold.co/600x400/f3f4f6/1f2937?text=2026+Honda+Prologue',
    type: 'Electric'
  }
];

const FAQS = [
  {
    question: "How does leasing a car work?",
    answer: "Leasing a car means entering into a long-term rental agreement for driving the new car. It includes lower monthly payments, $0 down payment, no depreciation worries, and no resale hassle. Unlike a traditional purchase, you don't actually own the vehicle. After the term ends, you can return the vehicle or purchase it at a residual value."
  },
  {
    question: "What terms do I need to know to get a good lease deal?",
    answer: "1. Depreciation: The difference between the negotiated sale price and its predicted worth at the end. 2. MSRP: Manufacturer's Suggested Retail Price. 3. Residual Value: The amount the car is expected to be worth at the end of the lease. 4. Money Factor: Similar to an interest rate, determines your finance charge."
  },
  {
    question: "What is the difference between leasing and financing a car?",
    answer: "Leasing is generally a cheaper monthly alternative to buying outright or financing. You only pay for the vehicle's depreciation during the time you drive it, rather than the entire value of the vehicle. Financing requires a larger upfront commitment but results in ownership."
  }
];

// ==========================================
// 2. ATOMIC COMPONENTS (The "Cells" - SRP Applied)
// ==========================================

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-bold rounded-md transition-all duration-300 flex items-center justify-center";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 px-6 py-3",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3",
    nav: "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle, centered = false }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

// ==========================================
// 3. SECTION COMPONENTS (The "Organs")
// ==========================================

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              GRAND PRIX <span className="text-blue-600">MOTORS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Button variant="nav">Home</Button>
            <Button variant="nav">About Us</Button>
            <Button variant="nav">Best Lease Deals</Button>
            <Button variant="nav">Applications</Button>
            <Button variant="nav">FAQs</Button>
            <Button variant="nav">Contact Us</Button>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-gray-900 font-bold">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              (718) 648-8822
            </div>
            <Button variant="primary">Free Quote</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['Home', 'About Us', 'Best Lease Deals', 'Applications', 'FAQs', 'Contact Us'].map((item) => (
            <a key={item} href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
              {item}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
            <div className="flex items-center text-gray-900 font-bold justify-center py-2 bg-gray-50 rounded-md">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              (718) 648-8822
            </div>
            <Button variant="primary" className="w-full">Get Free Quote</Button>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  // 1. State: The cell's memory. We store what the user types here.
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    name: '',
    phone: ''
  });
  const [status, setStatus] = useState('');

  // 2. Action: Handing the message to the transport mechanism (Backend)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading (physics: maintain current state)
    setStatus('Sending...');
    
    try {
      // Send the data to our local Node server
      const response = await fetch('http://localhost:5000/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Quote sent successfully!');
        setFormData({ make: '', model: '', name: '', phone: '' }); // Reset form
      } else {
        setStatus('Failed to send.');
      }
    } catch (error) {
      setStatus('Server is off. Cannot send.');
    }
  };

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background styling for depth */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        
        {/* Left Content */}
        <div className="w-full lg:w-3/5 lg:pr-12 mb-12 lg:mb-0">
          <div className="inline-block bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm mb-6 uppercase tracking-wider">
            Best Car Lease Deals
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Lease your new car <br/><span className="text-blue-500">completely online.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Sign your deal FAST and EASY with a personal assistant working with you from quote to car delivery. We facilitate delivery by a dealership to your home within 48 hours across all states.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="text-lg px-8">View Specials</Button>
            <Button variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900">Browse All Cars</Button>
          </div>
        </div>

        {/* Right Quote Form */}
        <div className="w-full lg:w-2/5">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-gray-900">
            <h3 className="text-2xl font-bold mb-2">Get your free quote</h3>
            <p className="text-gray-500 mb-6 text-sm">On any make & model. No commitment required.</p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Make</label>
                  <select 
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="">Select Make</option>
                    <option value="BMW">BMW</option>
                    <option value="Honda">Honda</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Nissan">Nissan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Model</label>
                  <input 
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    placeholder="e.g. X5" 
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(555) 000-0000" 
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                  required
                />
              </div>
              <Button variant="primary" type="submit" className="w-full mt-4 text-lg">
                {status || 'Send Request'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle 
            title="Passion for Cars, Dedication to You" 
            subtitle="Grand Prix Motors is one of the fastest growing companies offering car leasing deals in the NYC and Tri-State area."
          />
          <div className="space-y-4 text-gray-600 text-lg">
            <p>
              Since 1997, our multifaceted service includes auto leasing, sales, as well as trade-ins of new and used vehicles. With operating principles of low inventory costs and dealer fleet program access, we are able to pass substantial savings to our customers so you can lease a car at the best price.
            </p>
            <p>
              Our office is staffed with passionate automobile enthusiasts eager to lend their expertise. We pride ourselves on making your experience educated, seamless, and transparent, while guaranteeing the most competitive prices in the nation.
            </p>
          </div>
          <div className="mt-8 flex items-center space-x-6">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs`}>
                  User
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-gray-900 mt-1">10,000+ Trusted Clients</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800" alt="Premium Dealership" className="object-cover w-full h-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
            <div className="text-4xl font-black">25+</div>
            <div className="text-sm font-medium uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DealCard = ({ car }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
    <div className="relative h-48 bg-gray-100 p-4 flex items-center justify-center overflow-hidden group">
      <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
        {car.type}
      </div>
    </div>
    
    <div className="p-6 flex-grow flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{car.year} {car.make} {car.model}</h3>
        <p className="text-sm text-gray-500">Lease Offers</p>
      </div>
      
      <div className="mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-end">
          <span className="text-3xl font-black text-blue-600">${car.price}</span>
          <span className="text-gray-500 font-medium ml-1 mb-1">/ mo</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Term</p>
          <p className="font-bold text-gray-900">{car.term} Months</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Mileage</p>
          <p className="font-bold text-gray-900">{car.miles}/yr</p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full">View Details</Button>
    </div>
  </div>
);

const BestDealsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        title="Best Car Lease Deals" 
        subtitle="Explore our top picks for February 2026. Hand-selected vehicles offering the best value, comfort, and performance."
        centered={true}
      />
      
      {/* Category Tabs (Visual Mock) */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {['All Models', 'SUVs', 'Sedans', 'Electric/Hybrid', 'Exotic'].map((cat, idx) => (
          <button 
            key={cat} 
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${idx === 0 ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAR_DEALS.map(car => (
          <DealCard key={car.id} car={car} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button variant="primary" className="mx-auto">View All Inventory</Button>
      </div>
    </div>
  </section>
);

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const WhyChooseUs = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        title="Why Choose Grand Prix Motors" 
        subtitle="Unmatched quality and service tailored specifically to your automotive needs."
        centered={true}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Simple Steps to Your New Car</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Leasing your next car with us is straightforward and hassle-free. Experience a seamless process from start to finish!</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center text-2xl font-black text-blue-500 mb-6 shadow-xl">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
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
    <div className="border border-gray-200 rounded-lg bg-white mb-4 overflow-hidden">
      <button 
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-900 pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common leasing questions below."
        centered={true}
      />
      <div className="mt-10">
        {FAQS.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Info */}
        <div className="col-span-1 lg:col-span-1">
          <span className="text-2xl font-black tracking-tighter text-white block mb-6">
            GRAND PRIX <span className="text-blue-600">MOTORS</span>
          </span>
          <p className="text-sm mb-6 leading-relaxed">
            Your trusted partner in finding the best car lease deals with unbeatable service in the NYC and Tri-State area.
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-blue-500" />
              <span className="text-white font-semibold">(718) 648-8822</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Brooklyn, New York (Tri-State Area Delivery)</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Best Lease Deals</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Applications</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Legal Policy */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal Policy</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Accessibility Statement</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get the Best Deals!</h4>
          <p className="text-sm mb-4">Only the good stuff – exclusive offers and deals, no spam, we promise!</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-blue-500 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 pt-8 text-xs leading-relaxed text-gray-500">
        <p className="mb-4">
          GRAND PRIX MOTORS, INC IS NOT A LICENSED NEW MOTOR VEHICLE DEALER. GRAND PRIX MOTORS INC, IS AN AUTOMOBILE BROKERAGE FIRM AND A USED CAR DEALERSHIP LICENSED AND BONDED IN THE STATE OF NEW YORK. FACILITY ID NO. 7124382. NO WARRANTY REPAIR SERVICES WILL BE PROVIDED. ALL NEW BROKERED VEHICLES ARE COVERED BY MANUFACTURER WARRANTY. GRAND PRIX MOTORS, INC DOES NOT CHARGE ANY FEES FOR ITS SERVICES.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Photos are generic and for reference only. Grand Prix Motors is a non franchise dealer.</p>
          <p>&copy; {new Date().getFullYear()} Grand Prix Motors. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);

// ==========================================
// 4. MAIN APPLICATION (The "Organism")
// Orchestrates all the independent organs.
// ==========================================

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-600 selection:text-white">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <BestDealsSection />
        <WhyChooseUs />
        <HowItWorks />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}