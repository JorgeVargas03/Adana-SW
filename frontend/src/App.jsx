import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Instructors from './pages/Instructors';
import Wellness from './pages/Wellness';
import Faq from './pages/FAQ';
import Signin from './pages/Sign_in';
import Reservation from './pages/Reservation';
import SignUp from './pages/Sign_up';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <main style={{ flex: 1 }}>
            <div>
              <Routes>
                <Route path="/reservation" element={<Reservation/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/instructors" element={<Instructors/>} />
                <Route path="/wellness" element={<Wellness/>} />
                <Route path="/faq" element={<Faq/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<SignUp/>} />
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
