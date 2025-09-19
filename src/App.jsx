import React, { useEffect, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Loader from './components/shared/Loader';
import Home from './pages/Home';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import AddClient from './pages/add-client/AddClient';
import Reservations from './pages/reservations/Reservations';
import Invoices from './pages/invoices/Invoices';
import Settings from './pages/settings/Settings';
import Employees from './pages/settings/Employees';
import Sections from './pages/settings/Sections';
import PayWays from './pages/settings/PayWays';


const App = () => {
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  return (
    <HelmetProvider>
    <BrowserRouter basename='/'>
    <Navbar/>
      <Suspense
        fallback={ <Loader/> }  >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-client' element={<AddClient />} />
          <Route path='/reservations' element={<Reservations />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/settings/employees' element={<Employees />} />
          <Route path='/settings/sections' element={<Sections />} />
          <Route path='/settings/pay-ways' element={<PayWays />} />
        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
