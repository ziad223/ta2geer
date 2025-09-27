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
        <h3 className="text-lg font-bold mb-4">إضافة عميل</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">الاسم</label>
            <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الهوية</label>
            <input name="nationalId" value={form.nationalId} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم جوال آخر</label>
            <input name="altPhone" value={form.altPhone} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">القاعة</label>
            <input name="hall" value={form.hall} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>

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
