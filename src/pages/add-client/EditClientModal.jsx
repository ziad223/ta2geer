import React, { useState, useEffect } from 'react';

const EditClientModal = ({ isOpen, onClose, clientData, onUpdate }) => {
  const [formData, setFormData] = useState(clientData || {});

  useEffect(() => {
    setFormData(clientData || {});
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">تعديل بيانات العميل</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="الاسم" className="border p-2 rounded  outline-none" required />
          <input name="nationalId" value={formData.nationalId || ''} onChange={handleChange} placeholder="رقم هوية العميل" className="border p-2 rounded  outline-none" required />
          <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="الجوال" className="border p-2 rounded  outline-none" required />
          <input name="altPhone" value={formData.altPhone || ''} onChange={handleChange} placeholder="رقم جوال آخر" className="border p-2 rounded  outline-none" />
          <input name="createdAt" type="date" value={formData.createdAt || ''} onChange={handleChange} placeholder="تاريخ الإضافة" className="border p-2 rounded  outline-none" required />
          <input name="hall" value={formData.hall || ''} onChange={handleChange} placeholder="القاعة" className="border p-2 rounded  outline-none" required />
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">إلغاء</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">حفظ التغييرات</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
