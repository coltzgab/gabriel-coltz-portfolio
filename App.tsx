import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { WebDesign } from './pages/WebDesign';
import { SocialMedia } from './pages/SocialMedia';
import { Branding } from './pages/Branding';
import { Contact } from './pages/Contact';
import { Coproduction } from './pages/Coproduction';

import { ShootingStars } from './components/ui/shooting-stars';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans antialiased text-organic-white selection:bg-organic-cyan selection:text-organic-black min-h-screen flex flex-col bg-organic-black relative">
        {/* Global Background Effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(71,228,190,0.05)_0%,rgba(0,0,0,0)_80%)]" />
          <div className="stars absolute inset-0" />

          <ShootingStars
            starColor="#47e4be"
            trailColor="#2EB9DF"
            minSpeed={15}
            maxSpeed={35}
            minDelay={1000}
            maxDelay={3000}
          />
          <ShootingStars
            starColor="#5a3d7f"
            trailColor="#47e4be"
            minSpeed={10}
            maxSpeed={25}
            minDelay={2000}
            maxDelay={4000}
          />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/web-design" element={<WebDesign />} />
              <Route path="/social-media" element={<SocialMedia />} />
              <Route path="/branding" element={<Branding />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/coproduction" element={<Coproduction />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;