import React, { useState, useEffect } from "react";

const EditCategoryModal = ({ category, onClose, onSubmit }) => {
  const [form, setForm] = useState({ ...category });

  useEffect(() => {
    if (category) setForm(category);
  }, [category]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("من فضلك أدخل اسم القسم");
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">تعديل القسم</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="اسم القسم"
            className="border px-3 py-2 rounded-md"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="parent"
            placeholder="فرعي من (اختياري)"
            className="border px-3 py-2 rounded-md"
            value={form.parent}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            تحديث
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
