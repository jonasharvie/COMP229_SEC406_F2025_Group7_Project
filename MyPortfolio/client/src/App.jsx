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
import Login from './Login.jsx'
import CreateSurvey from './CreateSurvey.jsx'

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
        <Route path="/login" element={<Login />} />
        <Route path="/createsurvey" element={<CreateSurvey />} />
      </Routes>
    </Router>
  );
}

// export the App component as default
export default App
