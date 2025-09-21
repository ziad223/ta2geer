import React, { useState } from "react";
import CustomSelect from "../../../components/shared/CustomSelect";

const AddHallModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    logo: "",
    name: "",
    address: "",
    taxNumber: "",
    phone: "",
    status: "متاحة",
    prices: "",
    bookings: "0",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSelectChange = (selected) => {
    setForm({ ...form, status: selected ? selected.value : "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  const statusOptions = [
    { value: "متاحة", label: "متاحة" },
    { value: "مغلقة", label: "مغلقة" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">إضافة قاعة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="logo"
            placeholder="رابط شعار القاعة"
            className="border p-2 w-full rounded"
            value={form.logo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="اسم القاعة"
            className="border p-2 w-full rounded"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="العنوان"
            className="border p-2 w-full rounded"
            value={form.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="taxNumber"
            placeholder="الرقم الضريبي"
            className="border p-2 w-full rounded"
            value={form.taxNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="الجوال"
            className="border p-2 w-full rounded"
            value={form.phone}
            onChange={handleChange}
          />
         <CustomSelect
            options={statusOptions}
            value={statusOptions.find((opt) => opt.value === form.status)}
            onChange={handleSelectChange}
            placeholder="اختر الحالة"
            name="status"
            className="w-full"
          />
          <input
            type="text"
            name="prices"
            placeholder="الأسعار"
            className="border p-2 w-full rounded"
            value={form.prices}
            onChange={handleChange}
          />
          <input
            type="number"
            name="bookings"
            placeholder="عدد الحجوزات"
            className="border p-2 w-full rounded"
            value={form.bookings}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHallModal;
