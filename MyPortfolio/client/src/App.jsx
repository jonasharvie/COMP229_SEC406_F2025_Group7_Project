import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles.css';

import Head from './Head.jsx';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import CreateSurvey from './CreateSurvey.jsx';
import Surveyanswers from './Surveyanswers.jsx';   // ✅ ADD THIS

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Head />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createsurvey" element={<CreateSurvey />} />
        <Route path="/surveyanswers" element={<Surveyanswers />} />  {/* ✅ ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
