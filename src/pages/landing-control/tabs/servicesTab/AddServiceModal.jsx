import React, { useState } from "react";

const AddServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: "", image: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", image: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">إضافة خدمة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="اسم الخدمة"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="رابط الصورة"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              إلغاء
            </button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
