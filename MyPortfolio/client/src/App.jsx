// import the useState hook from React
import { useState } from 'react'
// import routing components for client-side navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import CSS style sheet
import './styles.css'
// import components
import Head from './Head.jsx'
import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Projects from './Projects.jsx'
import Services from './Services.jsx'
import Contact from './Contact.jsx'

function App() {
  // declare 'count' state variable
  const [count, setCount] = useState(0)

  return (
    // set up Router for navigation
    <Router>
      {/*add metadata */}
      <Head/>
      {/*render the NavBar at the top */}
      <NavBar/>
      <Routes>
        {/* oute for each page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

// export the App component as default
export default App
