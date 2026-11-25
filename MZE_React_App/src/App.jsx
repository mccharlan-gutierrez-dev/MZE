
import { Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import Career from './pages/Career';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPromotions from './pages/admin/AdminPromotions';

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Admin pages - no public Navbar or Footer */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/promotions" element={<AdminPromotions />} />

      {/* Public website */}
      <Route path="/*" element={<PublicLayout />} />
    </Routes>
  );
}

export default App;

// hide comment
