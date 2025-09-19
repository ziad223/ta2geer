'use client';
import React, { useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown, FaCircleUser, FaMessage } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { FaPager } from 'react-icons/fa';
import Container from '../shared/Container';

const ToolBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: true });

  return (
    <div className='bg-[#09adce] relative z-50'>
      <Container>
        <div className="flex items-center justify-between mx-auto px-5 py-2 lg:w-full">

          <button onClick={toggleMenu} className="text-white text-2xl lg:hidden">
            <FiMenu />
          </button>

          <div className="flex items-center justify-end lg:justify-between w-full">

            {/* Nav - Only on Large Screens */}
            <ul className="hidden lg:flex flex-wrap items-center gap-5">
              <li
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <a href="#" className='text-sm whitespace-nowrap text-white flex items-center gap-1'>
                  الإدارة <FaChevronDown size={10} />
                </a>
                {showDropdown && (
                  <ul className="absolute top-full right-0 bg-white shadow-md rounded w-52 py-2 z-50">
                    <li><Link to="/settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">الأعدادات</Link></li>
                    <li><Link to="/ar/administration/transferred-patients" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">التحكم بالواجهة</Link></li>
                    <li><Link to="/ar/administration/treatment-plans" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">أنواع المناسبات</Link></li>
                    <li><Link to="/ar/administration/patient_groups" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">الخدمات</Link></li>
                    <li><Link to="/ar/administration/offers" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">رسائل تواصل معنا</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/ar/accounting" className='text-sm whitespace-nowrap text-white flex items-center gap-1'>
                  <span>اعدادات الرسائل</span>
                  <FaMessage className='mt-1' />
                </Link>
              </li>
              <li>
                <Link to="/ar/appointments-transferred" className='text-sm whitespace-nowrap text-white'>إعدادات SMS</Link>
              </li>
            </ul>

            <div className='hidden lg:block'>
              <h2 className='text-lg text-white font-bold'>مؤسسة حليمة محمد سالم جعفر التجارية</h2>
              <div className='flex items-center justify-between text-white text-sm'>
                <span className='border-l px-12 md:block hidden'>{formattedDate}</span>
                <span className=" border-white px-3">{formattedTime}</span>
              </div>
            </div>

            <ul className="flex items-center gap-4">

              {/* Small Screen: Left Icons Only */}
              <li className="lg:hidden">
                <a href="#" className='text-white'><IoNotifications className='text-xl' /></a>
              </li>
              <li className="lg:hidden bg-blue-500 w-7 h-7 rounded-sm flex items-center justify-center">
                <a href="#" className='text-white'><FaPager className='text-xl' /></a>
              </li>
              <li className="lg:hidden flex items-center gap-2 text-sm whitespace-nowrap">
                <FaCircleUser className='w-7 h-7 text-white' />
              </li>

              {/* Large Screen Icons */}
              <li className="hidden lg:block">
                <a href="#" className='text-sm text-white'><IoNotifications className='text-xl' /></a>
              </li>
              <li className="hidden lg:block bg-blue-500 w-7 h-7 rounded-sm lg:flex items-center justify-center">
                <a href="#" className='text-sm text-white'><FaPager className='text-xl' /></a>
              </li>
              <li className="hidden lg:flex items-center gap-2 text-sm whitespace-nowrap">
                <FaCircleUser className='w-7 h-7 text-white' />
                <span className='text-white'>ادارة القاعات/ الأستاذ نبيل</span>
                <FaChevronDown className='text-white' />
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-5 pb-4 text-black text-sm">
          <li><Link to="/settings">الإعدادات</Link></li>
          <li><Link to="/ar/administration/transferred-patients">التحكم بالواجهة</Link></li>
          <li><Link to="/ar/administration/treatment-plans">أنواع المناسبات</Link></li>
          <li><Link to="/ar/administration/patient_groups">الخدمات</Link></li>
          <li><Link to="/ar/administration/offers">رسائل تواصل معنا</Link></li>
          <li><Link to="/ar/accounting">التقارير المحاسبية</Link></li>
          <li><Link to="/ar/appointments-transferred">المرضى المحولين</Link></li>
          <li><Link to="/ar/consultations">الاستشارات</Link></li>
          <li><Link to="/ar/guides">الدليل الإرشادي</Link></li>
          <li><Link to="/ar/program-additions">إضافات البرنامج</Link></li>
          <li><Link to="/ar/services">الخدمات</Link></li>
        </ul>
      </div>

      {/* Backdrop when menu is open */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default ToolBar;
