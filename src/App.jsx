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
import Login from './pages/login/Login';
import VisitorsReservations from './pages/visitrors-reservations/VisitorsReservations';
import ProtectedRoute from './components/ProtectedRoute';


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
          <Route path='/login' element={<Login />} />
           <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
  <Route path='/add-client' element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
  <Route path='/reservations' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
  <Route path='/visitor-reservations' element={<ProtectedRoute><VisitorsReservations /></ProtectedRoute>} />
  <Route path='/invoices' element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
  <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
  <Route path='/settings/employees' element={<ProtectedRoute><Employees /></ProtectedRoute>} />
  <Route path='/settings/sections' element={<ProtectedRoute><Sections /></ProtectedRoute>} />
  <Route path='/settings/pay-ways' element={<ProtectedRoute><PayWays /></ProtectedRoute>} />
  <Route path='/settings/privacy-policy' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
  <Route path='/landing-control' element={<ProtectedRoute><LandingControl /></ProtectedRoute>} />
  <Route path='/occasions' element={<ProtectedRoute><Occasions /></ProtectedRoute>} />
  <Route path='/halls' element={<ProtectedRoute><Halls /></ProtectedRoute>} />
  <Route path='/services' element={<ProtectedRoute><Services /></ProtectedRoute>} />
  <Route path='/services/offers' element={<ProtectedRoute><Offers /></ProtectedRoute>} />
  <Route path='/services/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
  <Route path='/services/units' element={<ProtectedRoute><Units /></ProtectedRoute>} />
  <Route path='/contact-messages' element={<ProtectedRoute><ContactMessages /></ProtectedRoute>} />
  <Route path='/messages-settings' element={<ProtectedRoute><MessagesSettings /></ProtectedRoute>} />
  <Route path='/sending-marketing-messages' element={<ProtectedRoute><SendingMarketingMessages /></ProtectedRoute>} />
  <Route path='/whatsapp-settings' element={<ProtectedRoute><WhatsappSettings /></ProtectedRoute>} />
  <Route path='/program-additions' element={<ProtectedRoute><ProgramAdditions /></ProtectedRoute>} />
  <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
  <Route path='/clients' element={<ProtectedRoute><Clients /></ProtectedRoute>} />
  <Route path='/new-invoices' element={<ProtectedRoute><NewInvoices /></ProtectedRoute>} />
  <Route path='/photo-gallery' element={<ProtectedRoute><PhotoGallery /></ProtectedRoute>} />
  <Route path='/alerts' element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
