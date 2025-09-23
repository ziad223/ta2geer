import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaEdit, FaTrashAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import CustomSelect from '../../components/shared/CustomSelect';
import { Link } from 'react-router-dom';


const Settings = () => {
const currencyOptions = useMemo(() => [
  { value: 'SAR', label: 'ريال سعودي' },
  { value: 'USD', label: 'دولار أمريكي' },
  { value: 'EUR', label: 'يورو' },
], []);

const paymentMethodOptions = useMemo(() => [
  { value: 'cash', label: 'نقدًا' },
  { value: 'card', label: 'بطاقة' },
  { value: 'bank', label: 'تحويل بنكي' },
], []);

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <div className='flex items-center flex-col lg:flex-row  justify-between w-full mt-10'>
             <h2 className="text-xl font-bold">الاعدادات</h2>
             <div className='flex items-center gap-2 flex-col lg:flex-row'>
            <Link to='/settings/employees' className='flex items-center  gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الموظفين</span>
                <FaUsers/>
            </Link>
             <Link to = '/settings/sections' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الأقسام</span>
                <FaBuffer/>
            </Link>
            <Link to='/settings/privacy-policy' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>سياسة الخصوصية</span>
                <FaUserShield/>
            </Link>
            <Link to='/settings/pay-ways' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>طرق الدفع</span>
                <FaCreditCard/>
            </Link>
             </div>
        </div>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* اسم النشاط التجاري */}
  <input
    type="text"
    name="businessName"
    placeholder="اسم النشاط التجاري"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* الرقم الضريبي */}
  <input
    type="text"
    name="taxNumber"
    placeholder="الرقم الضريبي (15 رقم)"
    maxLength={15}
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* العنوان */}
  <input
    type="text"
    name="address"
    placeholder="العنوان"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* رقم المبنى */}
  <input
    type="text"
    name="buildingNumber"
    placeholder="رقم المبنى"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* الشارع */}
  <input
    type="text"
    name="street"
    placeholder="الشارع"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* الجوال */}
  <input
    type="text"
    name="mobile"
    placeholder="رقم الجوال"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* رابط الفيس بوك */}
  <input
    type="text"
    name="facebook"
    placeholder="رابط الفيس بوك"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* رابط التويتر */}
  <input
    type="text"
    name="twitter"
    placeholder="رابط التويتر"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* رابط الانستجرام */}
  <input
    type="text"
    name="instagram"
    placeholder="رابط الانستجرام"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* رابط لينكدإن */}
  <input
    type="text"
    name="linkedin"
    placeholder="رابط لينكدإن"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

 <CustomSelect
  options={currencyOptions}
  placeholder="اختر العملة الافتراضية"
/>
 <CustomSelect
  options={paymentMethodOptions}
  placeholder="اختر طريقة الدفع الافتراضية"
/>


  <input
    type="text"
    name="latitude"
    placeholder="خط العرض"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

  {/* خطوط الطول */}
  <input
    type="text"
    name="longitude"
    placeholder="خط الطول"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />

 <div>
    <div className="relative">
      <input
        type="file"
        name="logo"
        className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
      />
      <div className="flex items-center justify-between border rounded px-3 py-2 text-sm text-gray-600 bg-white">
        <span className="text-gray-500">تحميل صورة الشعار</span>
        <FiUpload className="text-xl text-gray-500" />
      </div>
    </div>
  </div>

  {/* أيقونة المتصفح */}
  <div>
    <div className="relative">
      <input
        type="file"
        name="favicon"
        className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
      />
      <div className="flex items-center justify-between border rounded px-3 py-2 text-sm text-gray-600 bg-white">
        <span className="text-gray-500">تحميل أيقونة المتصفح</span>
        <FiUpload className="text-xl text-gray-500" />
      </div>
    </div>
  </div>

  {/* نسبة الضريبة */}
  <input
    type="number"
    name="taxRate"
    placeholder="نسبة الضريبة %"
    className="outline-none h-[40px] border px-3 rounded-lg"
  />
</div>

{/* Textareas منفصلة تحت الشبكة */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
  <textarea
    name="invoiceTerms"
    placeholder="شروط الفاتورة"
    rows="3"
    className="border p-3 rounded-lg w-full"
  />
  <textarea
    name="quotationTerms"
    placeholder="شروط عرض السعر"
    rows="3"
    className="border p-3 rounded-lg w-full"
  />
  <textarea
    name="contractTerms"
    placeholder="شروط عقد تأجير قاعة أفراح"
    rows="3"
    className="border p-3 rounded-lg w-full"
  />
  <textarea
    name="workingHoursMessage"
    placeholder="رسالة أوقات العمل"
    rows="3"
    className="border p-3 rounded-lg w-full"
  />
  <textarea
    name="siteWelcomeMessage"
    placeholder="رسالة واجهة الموقع"
    rows="3"
    className="border p-3 rounded-lg w-full"
  />

</div>
  <button className='bg-green-600 lg:mt-10 mt-5  lg:w-[300px] w-full h-[50px] rounded-lg text-white text-xl hover:bg-green-500 '>
    حفظ
  </button>
        </div>
      </div>

    </Container>
  );
};

export default Settings;
