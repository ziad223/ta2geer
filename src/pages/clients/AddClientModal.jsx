import React, { useState } from 'react';

const AddClientModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    nationalId: '',
    phone: '',
    altPhone: '',
    hall: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: '', nationalId: '', phone: '', altPhone: '', hall: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">أضف عميل جديد</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input name="name" placeholder="الاسم" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="nationalId" placeholder="رقم الهوية" value={form.nationalId} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="phone" placeholder="رقم الجوال" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="altPhone" placeholder="رقم جوال آخر" value={form.altPhone} onChange={handleChange} className="border rounded px-3 py-2" />
          <input name="hall" placeholder="القاعة" value={form.hall} onChange={handleChange} className="border rounded px-3 py-2" required />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded">إلغاء</button>
            <button type="submit" className="px-3 py-2 bg-[#2ba670] text-white rounded">إضافة</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
