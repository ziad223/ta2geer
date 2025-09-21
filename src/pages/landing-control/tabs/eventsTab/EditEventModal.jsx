import React, { useState, useEffect } from "react";

const EditEventModal = ({ isOpen, onClose, event, onSubmit }) => {
  const [form, setForm] = useState(event || { title: "", content: "", image: "", createdAt: "" });

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  if (!isOpen || !event) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[450px]">
        <h2 className="text-lg font-bold mb-4">تعديل المناسبة</h2>
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
          <input
            type="text"
            name="createdAt"
            placeholder="تاريخ الإنشاء"
            value={form.createdAt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              إلغاء
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
