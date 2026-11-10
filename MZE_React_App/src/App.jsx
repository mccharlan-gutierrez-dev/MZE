
import { Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import Career from './pages/Career';

function App() {
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
    </>
  );
}

export default App;
