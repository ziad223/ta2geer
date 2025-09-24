import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const AddBookingForm = () => {
  // States للبيانات
  const [formData, setFormData] = useState({
    // معلومات العميل
    client: '',
    hall: '',
    departments: [],
    occasion: '',
    price: '',
    
    // تفاصيل الحجز
    startDate: '',
    days: 1,
    endDate: '',
    hijriStartDate: '',
    hijriEndDate: '',
    
    // الخدمات
    services: [],
    selectedService: '',
    
    // طرق الدفع
    cashAmount: 0,
    networkAmount: 0,
    
    // التفاصيل المالية
    bookingAmount: 0,
    discount: 0,
    afterDiscount: 0,
    tax: 0,
    total: 0,
    paymentStatus: 'غير مدفوع',
    
    // حالة الحجز
    contractCreated: { date: '09/24/2025', status: 'تم' },
    contractSigned: { date: '09/24/2025', status: 'تم' },
    deposit: { date: '09/24/2025', status: 'تم' },
    bookingCompleted: { date: '09/24/2025', status: 'تم' },
    
    // الملاحظات
    notes: ''
  });

  // Options للسيليكت
  const clientOptions = [
    { value: 'client1', label: 'عميل ١' },
    { value: 'client2', label: 'عميل ٢' },
    { value: 'client3', label: 'عميل ٣' }
  ];

  const hallOptions = [
    { value: 'hall1', label: 'قاعة الأفراح' },
    { value: 'hall2', label: 'قاعة المؤتمرات' },
    { value: 'hall3', label: 'قاعة المناسبات' }
  ];

  const departmentOptions = [
    { value: 'men', label: 'قسم الرجال' },
    { value: 'women', label: 'قسم النساء' }
  ];

  const occasionOptions = [
    { value: 'wedding', label: 'زفاف' },
    { value: 'birthday', label: 'عيد ميلاد' },
    { value: 'conference', label: 'مؤتمر' },
    { value: 'party', label: 'حفلة' }
  ];

  const serviceOptions = [
    { value: 'catering', label: 'خدمات الطعام' },
    { value: 'decoration', label: 'الديكور' },
    { value: 'photography', label: 'التصوير' },
    { value: 'music', label: 'الموسيقى' },
    { value: 'lighting', label: 'الإضاءة' }
  ];

  // معالجة التغييرات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: selectedOption 
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: selectedOptions || [] 
    }));
  };

  const handleDepartmentChange = (selectedOptions) => {
    setFormData(prev => ({ 
      ...prev, 
      departments: selectedOptions || [] 
    }));
  };

  // إضافة خدمة
  const addService = () => {
    if (formData.selectedService && !formData.services.some(s => s.value === formData.selectedService.value)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, formData.selectedService],
        selectedService: ''
      }));
    }
  };

  // إزالة خدمة
  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // حساب التواريخ والمبالغ تلقائياً
  useEffect(() => {
    // حساب تاريخ النهاية بناءً على تاريخ البداية وعدد الأيام
    if (formData.startDate && formData.days) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(formData.days));
      setFormData(prev => ({ 
        ...prev, 
        endDate: endDate.toISOString().split('T')[0] 
      }));
    }

    // حساب المبالغ المالية
    const bookingAmount = parseFloat(formData.price) || 0;
    const servicesAmount = formData.services.length * 100; // افتراضي 100 لكل خدمة
    const totalBeforeDiscount = bookingAmount + servicesAmount;
    const afterDiscount = totalBeforeDiscount - (parseFloat(formData.discount) || 0);
    const taxAmount = afterDiscount * 0.15; // افتراضي 15%
    const totalAmount = afterDiscount + taxAmount;

    setFormData(prev => ({
      ...prev,
      bookingAmount: totalBeforeDiscount,
      afterDiscount: afterDiscount,
      tax: taxAmount,
      total: totalAmount
    }));

    // حساب المتبقي
    const paidAmount = (parseFloat(formData.cashAmount) || 0) + (parseFloat(formData.networkAmount) || 0);
    const remaining = totalAmount - paidAmount;
    setFormData(prev => ({ 
      ...prev, 
      paymentStatus: remaining <= 0 ? 'مدفوع' : 'غير مدفوع' 
    }));

  }, [formData.price, formData.days, formData.startDate, formData.services, formData.discount, formData.cashAmount, formData.networkAmount]);

  // تنسيق السيليكت
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      padding: '0.25rem',
      textAlign: 'right'
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: 'right'
    })
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">إضافة حجز جديد</h1>

      {/* معلومات العميل */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">معلومات العميل</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* العميل */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">العميل *</label>
            <Select
              options={clientOptions}
              value={formData.client}
              onChange={(selected) => handleSelectChange('client', selected)}
              placeholder="اختر العميل"
              styles={customStyles}
              className="text-right"
            />
          </div>

          {/* القاعة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">القاعة *</label>
            <Select
              options={hallOptions}
              value={formData.hall}
              onChange={(selected) => handleSelectChange('hall', selected)}
              placeholder="اختر القاعة"
              styles={customStyles}
            />
          </div>

          {/* الأقسام */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الأقسام</label>
            <Select
              options={departmentOptions}
              value={formData.departments}
              onChange={handleDepartmentChange}
              isMulti
              placeholder="اختر الأقسام"
              styles={customStyles}
            />
          </div>

          {/* المناسبة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المناسبة *</label>
            <Select
              options={occasionOptions}
              value={formData.occasion}
              onChange={(selected) => handleSelectChange('occasion', selected)}
              placeholder="اختر المناسبة"
              styles={customStyles}
            />
          </div>

          {/* السعر */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              السعر * <span className="text-xs text-gray-500">يمكنك هنا تعديل سعر القاعة فقط</span>
            </label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                placeholder="0"
              />
              <span className="absolute left-3 top-2 text-gray-500">ر.س</span>
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل الحجز */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">تفاصيل الحجز</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* تاريخ بداية الحجز */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ بداية الحجز *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          {/* عدد الأيام */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عدد الأيام *</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleInputChange}
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          {/* تاريخ نهاية الحجز */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ نهاية الحجز *</label>
            <input
              type="date"
              value={formData.endDate}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-right text-gray-600"
            />
          </div>

          {/* تاريخ بداية الحجز الهجري */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ بداية الحجز الهجري *</label>
            <input
              type="text"
              name="hijriStartDate"
              value={formData.hijriStartDate}
              onChange={handleInputChange}
              placeholder="اختر التاريخ"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          {/* تاريخ نهاية الحجز الهجري */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ نهاية الحجز الهجري *</label>
            <input
              type="text"
              name="hijriEndDate"
              value={formData.hijriEndDate}
              onChange={handleInputChange}
              placeholder="اختر التاريخ"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
        </div>
      </div>

      {/* الخدمات */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">الخدمات</h2>
        
        <div className="mb-4">
          {formData.services.length > 0 ? (
            <div className="space-y-2">
              {formData.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span>{service.label}</span>
                  <button
                    onClick={() => removeService(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">لم يتم إضافة أي خدمات بعد</p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 ">
           <div className="flex flex-col md:flex-row gap-5">
             <Select
              options={serviceOptions}
              value={formData.selectedService}
              onChange={(selected) => handleSelectChange('selectedService', selected)}
              placeholder="اختر خدمة من القائمة أعلاه لإضافتها"
              styles={customStyles}
            />
              <button
            onClick={addService}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md whitespace-nowrap"
          >
            إضافة خدمة
          </button>
          </div>
        
           </div>
        </div>
      </div>

      {/* طرق الدفع */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">
          طرق الدفع <span className="text-sm font-normal text-gray-500">المتبقي: {formData.total - (formData.cashAmount + formData.networkAmount)} ر.س</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* نقدا */}
          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نقدا</label>
            <div className="relative">
              <input
                type="number"
                name="cashAmount"
                value={formData.cashAmount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
              <span className="absolute left-3 top-2 text-gray-500">ر.س</span>
            </div>
          </div>

          {/* شبكة */}
          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">شبكة</label>
            <div className="relative">
              <input
                type="number"
                name="networkAmount"
                value={formData.networkAmount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
              <span className="absolute left-3 top-2 text-gray-500">ر.س</span>
            </div>
          </div>
        </div>
      </div>

      {/* التفاصيل المالية */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">التفاصيل المالية</h2>
        
        <div className="space-y-3">
          {/* مبلغ الحجز + مبلغ الخدمات */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">مبلغ الحجز + مبلغ الخدمات *</span>
            <span className="font-medium">{formData.bookingAmount} ر.س</span>
          </div>

          {/* الخصم */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">الخصم</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-24 border border-gray-300 rounded-md px-2 py-1 text-right"
              />
              <span>ر.س</span>
            </div>
          </div>

          {/* المبلغ بعد الخصم */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">المبلغ بعد الخصم</span>
            <span className="font-medium">{formData.afterDiscount} ر.س</span>
          </div>

          {/* الضريبة */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">الضريبة</span>
            <span className="font-medium">{formData.tax.toFixed(2)} ر.س</span>
          </div>

          {/* الإجمالي */}
          <div className="flex justify-between items-center border-t pt-2">
            <span className="text-gray-700 font-semibold">الإجمالي</span>
            <span className="font-bold text-lg">{formData.total.toFixed(2)} ر.س</span>
          </div>

          {/* حالة الدفع */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">حالة الدفع</span>
            <span className={`font-medium ${formData.paymentStatus === 'مدفوع' ? 'text-green-600' : 'text-red-600'}`}>
              {formData.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* حالة الحجز */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">حالة الحجز</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* إنشاء العقد */}
          <div className="flex justify-between items-center border rounded-lg p-3">
            <span className="text-gray-700">إنشاء العقد</span>
            <div className="text-right">
              <div className="text-sm">{formData.contractCreated.date}</div>
              <div className={`text-xs ${formData.contractCreated.status === 'تم' ? 'text-green-600' : 'text-gray-600'}`}>
                {formData.contractCreated.status}
              </div>
            </div>
          </div>

          {/* توقيع العقد */}
          <div className="flex justify-between items-center border rounded-lg p-3">
            <span className="text-gray-700">توقيع العقد</span>
            <div className="text-right">
              <div className="text-sm">{formData.contractSigned.date}</div>
              <div className={`text-xs ${formData.contractSigned.status === 'تم' ? 'text-green-600' : 'text-gray-600'}`}>
                {formData.contractSigned.status}
              </div>
            </div>
          </div>

          {/* العربون */}
          <div className="flex justify-between items-center border rounded-lg p-3">
            <span className="text-gray-700">العربون</span>
            <div className="text-right">
              <div className="text-sm">{formData.deposit.date}</div>
              <div className={`text-xs ${formData.deposit.status === 'تم' ? 'text-green-600' : 'text-gray-600'}`}>
                {formData.deposit.status}
              </div>
            </div>
          </div>

          {/* تم الحجز */}
          <div className="flex justify-between items-center border rounded-lg p-3">
            <span className="text-gray-700">تم الحجز</span>
            <div className="text-right">
              <div className="text-sm">{formData.bookingCompleted.date}</div>
              <div className={`text-xs ${formData.bookingCompleted.status === 'تم' ? 'text-green-600' : 'text-gray-600'}`}>
                {formData.bookingCompleted.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الملاحظات */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-right border-b pb-2">الملاحظات</h2>
        
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="4"
          placeholder="أضف أي ملاحظات خاصة بالحجز هنا..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        />
      </div>

      <div className="flex justify-end gap-4">
        
        <button className="bg-[#09adce] hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
          حفظ الحجز
        </button>
      </div>
    </div>
  );
};

export default AddBookingForm;