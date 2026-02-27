import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ShootingStars } from './components/ui/shooting-stars';

// Public pages
import { Home } from './pages/Home';
import { WebDesign } from './pages/WebDesign';
import { SocialMedia } from './pages/SocialMedia';
import { Branding } from './pages/Branding';
import { Contact } from './pages/Contact';
import { Coproduction } from './pages/Coproduction';

// Admin components
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Admin pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Public layout wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ========== ADMIN ROUTES ========== */}
          <Route path="/adminorg/login" element={<AdminLogin />} />
          <Route
            path="/adminorg"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            {/* Phase 2: Blog routes will go here */}
            {/* Phase 4: Proposal routes will go here */}
            {/* Phase 5: Team routes will go here */}
          </Route>

          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/web-design" element={<PublicLayout><WebDesign /></PublicLayout>} />
          <Route path="/social-media" element={<PublicLayout><SocialMedia /></PublicLayout>} />
          <Route path="/branding" element={<PublicLayout><Branding /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/coproduction" element={<PublicLayout><Coproduction /></PublicLayout>} />

          {/* Phase 2: /blog and /blog/:slug will go here */}
          {/* Phase 4: /proposta/:slug will go here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;