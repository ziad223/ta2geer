import React from 'react';
import { FaChevronLeft, FaPrint } from 'react-icons/fa';
import logo from '../../../public/images/home/login-logo.png';

const Bond = () => {
  return (
    <div className="my-10 min-h-screen px-3 sm:px-5">
      <div className="w-full lg:w-[70%] mx-auto">
        {/* زر الطباعة والرجوع */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
          {/* زر الطباعة */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto justify-center"
          >
            <span>طباعة</span>
            <span className="text-sm">
              <FaPrint />
            </span>
          </button>

          {/* زر الرجوع */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto justify-center"
          >
            <span>رجوع</span>
            <span className="text-sm mt-1">
              <FaChevronLeft />
            </span>
          </button>
        </div>

        {/* البوكس الأساسي */}
        <div className="p-3 sm:p-5 border border-gray-500 rounded-lg mt-5">
          <div className="p-3 sm:p-5 border border-gray-500 rounded-lg mt-5">
            {/* لوجو + العنوان */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-3">
              <img src={logo} alt="" className="w-20 h-20 sm:w-24 sm:h-24" />
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">
                  قاعة المعالي الكبرئ
                </h2>
                <h3 className="text-base sm:text-lg font-bold">
                  للاحتفالات و المناسبات
                </h3>
              </div>
            </div>

            {/* عنوان السند */}
            <div className="mt-5 text-center font-bold text-lg sm:text-xl">
              <h2>سند قبض</h2>
              <h3>Receipt Voucher</h3>
              <h4 className="text-sm sm:text-base">رقم: 10</h4>
            </div>

            {/* الضريبي والتاريخ */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between w-full text-sm sm:text-base gap-2">
              <h3>الرقم الضريبي: 302214006200003</h3>
              <h4>التاريخ: 2025-09-18</h4>
            </div>
          </div>

          {/* تفاصيل الدفع */}
          <div className="flex flex-col gap-6 mt-5 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-2">
              <h2 className="font-bold">
                استلمنا من المكرم: <span className="font-normal">شيخ1</span>
              </h2>
              <span>:Received From</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-2">
              <h2 className="font-bold">
                مبلغ وقدره:{" "}
                <span className="font-normal">ألفان ريالًا فقط لا غير</span>
              </h2>
              <span>:The Sum of</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-2">
              <h2 className="font-bold">
                مبلغ وقدره: <span className="font-normal">2000 ريال</span>
              </h2>
              <span>:The Sum of</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-2">
              <h2 className="font-bold">
                طريقة الدفع :{" "}
                <span className="font-normal">
                  مناسبة زواج يوم 2025-09-18{" "}
                </span>
              </h2>
              <span>Payment Method:</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-right gap-2">
              <h2 className="font-bold">
                وذلك مقابل:{" "}
                <span className="font-normal">
                  مناسبة زواج يوم 2025-09-18{" "}
                </span>
              </h2>
              <span>:Paid For</span>
            </div>
          </div>

          {/* خط فاصل */}
          <div className="h-[1px] mt-5 bg-gray-700 w-full"></div>

          {/* التواقيع */}
          <div className="flex flex-col sm:flex-row items-center justify-around mt-5 gap-5 text-center text-sm sm:text-base">
            <div className="flex flex-col items-center">
              <h2 className="font-bold">المستلم</h2>
              <p>....................</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold">المدير</h2>
              <p>....................</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold">المستخدم</h2>
              <p>ادارة القاعات/ الأستاذ نبيل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bond;
