import React, { useState, useEffect } from "react";

const EditServiceModal = ({ isOpen, onClose, service, onUpdate }) => {
  const [form, setForm] = useState(service || {});

  useEffect(() => {
    if (service) setForm(service);
  }, [service]);

  if (!isOpen || !service) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">تعديل الخدمة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.keys(form).map((key) => (
            <input key={key} type="text" name={key} value={form[key]}
              onChange={handleChange} className="border p-2 w-full rounded" />
          ))}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
