import React, { useState } from "react";

const AddEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: "", content: "", image: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", content: "", image: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[450px]">
        <h2 className="text-lg font-bold mb-4">إضافة مناسبة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="العنوان"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="content"
            placeholder="المحتوى"
            value={form.content}
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

export default AddEventModal;
