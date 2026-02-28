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
import { BlogList } from './pages/BlogList';
import { BlogPostPage } from './pages/BlogPostPage';

// Admin components
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Admin pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBlogPosts } from './pages/admin/AdminBlogPosts';
import { AdminBlogForm } from './pages/admin/AdminBlogForm';
import { AdminBlogCategories } from './pages/admin/AdminBlogCategories';
import { AdminProposals } from './pages/admin/AdminProposals';
import { AdminProposalForm } from './pages/admin/AdminProposalForm';
import { AdminProposalTemplates } from './pages/admin/AdminProposalTemplates';
import { AdminBlogTopics } from './pages/admin/AdminBlogTopics';
import { ProposalPage } from './pages/ProposalPage';

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

            {/* Blog Management */}
            <Route path="blog" element={<AdminBlogPosts />} />
            <Route path="blog/novo" element={<AdminBlogForm />} />
            <Route path="blog/editar/:id" element={<AdminBlogForm />} />
            <Route path="categorias" element={<AdminBlogCategories />} />
            <Route path="topicos" element={<AdminBlogTopics />} />

            {/* Proposal Management (Phase 4) */}
            <Route path="propostas" element={<AdminProposals />} />
            <Route path="propostas/nova" element={<AdminProposalForm />} />
            <Route path="propostas/editar/:id" element={<AdminProposalForm />} />
            <Route path="templates" element={<AdminProposalTemplates />} />
            {/* Phase 5: Team routes will go here */}
          </Route>

          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/web-design" element={<PublicLayout><WebDesign /></PublicLayout>} />
          <Route path="/social-media" element={<PublicLayout><SocialMedia /></PublicLayout>} />
          <Route path="/branding" element={<PublicLayout><Branding /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/coproduction" element={<PublicLayout><Coproduction /></PublicLayout>} />

          {/* Blog Pages */}
          <Route path="/blog" element={<PublicLayout><BlogList /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
          <Route path="/blog/categoria/:categorySlug" element={<PublicLayout><BlogList /></PublicLayout>} />

          {/* Proposal Public Page */}
          <Route path="/proposta/:slug" element={<ProposalPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;