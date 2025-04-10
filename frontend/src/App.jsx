import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Instructors from './pages/Instructors';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <main style={{ padding: '1rem', flex: 1 }}>
            <div style={{ padding: '2rem' }}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/instructors" element={<Instructors/>} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
