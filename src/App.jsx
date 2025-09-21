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
import PrivacyPolicy from './pages/settings/PrivacyPolicy';
import LandingControl from './pages/landing-control/LandingControl';
import Occasions from './pages/occasions/Occasions';
import Halls from './pages/occasions/halls/Halls';
import Services from './pages/services/Services';
import Offers from './pages/services/offers/Offers';
import Categories from './pages/services/categories/Categories';
import ContactMessages from './pages/contact-messages/ContactMessages';
import MessagesSettings from './pages/messages/MessagesSettings';
import SendingMarketingMessages from './pages/messages/SendingMarketingMessages';
import WhatsappSettings from './pages/messages/WhatsappSettings';
import Units from './pages/services/units/Units';
import ProgramAdditions from './pages/program-additions/ProgramAdditions';
import Notifications from './pages/notifications/Notifications';
import Clients from './pages/clients/Clients';
import NewInvoices from './pages/new-invoices/NewInvoices';
import PhotoGallery from './pages/photo-gallery/PhotoGallery';
import Alerts from './pages/alerts/Alerts';


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
          <Route path='/settings/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/landing-control' element={<LandingControl />} />
          <Route path='/occasions' element={<Occasions />} />
          <Route path='/halls' element={<Halls />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/offers' element={<Offers />} />
          <Route path='/services/categories' element={<Categories />} />
          <Route path='/services/units' element={<Units />} />
          <Route path='/contact-messages' element={<ContactMessages />} />
          <Route path='/messages-settings' element={<MessagesSettings />} />
          <Route path='/sending-marketing-messages' element={<SendingMarketingMessages />} />
          <Route path='/whatsapp-settings' element={<WhatsappSettings />} />
          <Route path='/program-additions' element={<ProgramAdditions />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/new-invoices' element={<NewInvoices />} />
          <Route path='/photo-gallery' element={<PhotoGallery />} />
          <Route path='/alerts' element={<Alerts />} />

        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
