import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {   FaUser, FaBuilding, FaFileAlt, FaChartLine, FaMoneyBill, FaFileSignature, FaCalendar } from 'react-icons/fa';
import {  IoMdHome, IoMdNotifications } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import ToolBar from './ToolBar';
import Container from '../shared/Container';
import { FaBarsProgress } from 'react-icons/fa6';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const hideNavbarPaths = ['/login', '/family-login', '/ar'];
  const shouldHideNavbar = hideNavbarPaths.some(path => pathname.startsWith(path));

  if (shouldHideNavbar) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <ToolBar />
         <div className='bg-white'>
        <div className='lg:w-full mx-auto px-5 py-4'>
          <div className='flex justify-between items-center lg:hidden'>
            <button onClick={toggleMenu} className='text-2xl text-black'>
              <FiMenu />
            </button>
          </div>
          <ul className={`flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 ${menuOpen ? 'block' : 'hidden'} lg:flex justify-center items-center`}>
            <li>
              <Link to="/ar" className='text-black flex items-center gap-1 text-sm '>
                 الرئيسية <IoMdHome className='text-gray-500' size={20} />
              </Link>
            </li>
            <li>
              <Link to="/ar" className='text-black flex items-center gap-1 text-sm'>
                 العملاء <FaUser  className='text-gray-500' size={18} />
              </Link>
            </li>
            <li>
              <Link to="/ar" className='text-black flex items-center gap-1 text-sm'>
                 القاعات <FaBuilding   className='text-gray-500' size={18} />
              </Link>
            </li>
            <li>
              <Link to="/ar/patients" className='text-black flex items-center gap-1 text-sm'>
                الحجوزات <FaFileAlt className='text-gray-500'  size={18} />
              </Link>
            </li>
            <li>
              <Link to="/ar/appointments" className='text-black flex items-center gap-1 text-sm'>
                الفواتير <FaChartLine  className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/ar/appointments" className='text-black flex items-center gap-1 text-sm'>
                الفواتير المبسطة <FaMoneyBill  className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/ar/invoices" className='text-black flex items-center gap-1 text-sm'>
                الفواتير <LiaFileInvoiceSolid className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/ar/pay-visit" className='text-black flex items-center gap-1 text-sm'>
                 التقارير والمحاسبة <FaBarsProgress  className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/ar/treatment-plans" className='text-black flex items-center gap-1 text-sm'>
                المعرض <FaFileSignature  className='text-gray-500' size={18}  />
              </Link>
            </li>
           
            <li>
              <Link to="/ar/pay_package" className='text-black flex items-center gap-1 text-sm'>
                 التنبيهات <IoMdNotifications  className='text-gray-500' size={20} />
              </Link>
            </li>
              <li>
              <button className='text-white  flex items-center gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg'>
                 <IoMdNotifications size={20}/>
                 <span>حجوزات الزوار</span>
              </button>
              
            </li>
             <li>
              <button className='text-white  flex items-center gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg'>
                 <FaCalendar/>
                 <span>جدول الحجوزات</span>
              </button>
              
            </li>
          </ul>
        </div>
        <div className='w-full h-2 bg-[#09adce]'></div>

      </div>
    </>
  );
};

export default Navbar;
