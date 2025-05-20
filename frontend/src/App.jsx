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
import InstructorMain from './pages/instructor/InstructorClasses';
import { CarritoProvider } from './context/CarritoContext'; 
import ReserClient from './pages/ReserClient';
import MyProfile from './pages/MyProfile';
import UsuariosRegistrados from './pages/admin/UsuariosRegistrados';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PagosRegistrados from './pages/admin/PagosRegistrados';
import Reportes from './pages/admin/Reportes';

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
                <Route path= "/instructorhome" element={<InstructorMain/>}/>
                <Route path= "/admin/usermanage" element={<UsuariosRegistrados/>}/>
                <Route path= "/instructor/home" element={<InstructorMain/>}/>
                <Route path= "/admin/payments" element={<PagosRegistrados/>}/>
                <Route path= "/admin/reports" element={<Reportes/>}/>
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right"
         autoClose={3000}
         theme="colored"
         newestOnTop />
      </CarritoProvider>
    </Router>
  );
};
///client/myreservation

export default App;
