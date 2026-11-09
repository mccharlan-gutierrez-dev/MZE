import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'


import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Branches from './pages/Branches'
import Contact from './pages/Contact'







function App() {
  return (
    <>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/branches" element={<Branches/>} />
      <Route path="/contact" element={<Contact/>} />
      
    </Routes>

    
    </>
  )
}

export default App