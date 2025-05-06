import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Instructors from './pages/Instructors';
import Wellness from './pages/Wellness';
import Faq from './pages/Faq';
import Signin from './pages/Sign_in';
import Reservation from './pages/Reservation';
import SignUp from './pages/Sign_up';
import CompleteRegister from './pages/CompleteRegistration';
import ReserClient from './pages/ReserClient';
import MyProfile from './pages/MyProfile';
import UsuariosRegistrados from './pages/UsuariosRegistrados';
import { CarritoProvider } from './context/CarritoContext'; 


//envueltos con el carrito para que se puedan pasar la información sin problemas
const App = () => {
  return (
    <Router>
      <CarritoProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <div>
              <Routes>
                <Route path="/reservation" element={<Reservation/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/instructors" element={<Instructors/>} />
                <Route path="/wellness" element={<Wellness/>} />
                <Route path="/faq" element={<Faq/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/register" element={<CompleteRegister/>} />
                <Route path= "/myprofile" element={<MyProfile/>}/>
                <Route path= "/client/myreservation" element={<ReserClient/>}/> 
                <Route path= "/admin/usermanage" element={<UsuariosRegistrados/>}/> 
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </CarritoProvider>
    </Router>
  );
};
///client/myreservation

export default App;
