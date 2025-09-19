import React, { useState } from "react";

const AddPayWayModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    status: "نشط",
    cash: "لا",
    defaultPayment: "لا",
    employees: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">إضافة طريقة دفع</h3>

        <div className="flex flex-col gap-3">
          <input name="name" placeholder="الاسم" value={form.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="accountNumber" placeholder="رقم الحساب" value={form.accountNumber} onChange={handleChange} className="border p-2 rounded" />
          <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
            <option>نشط</option>
            <option>موقوف</option>
          </select>
          <select name="cash" value={form.cash} onChange={handleChange} className="border p-2 rounded">
            <option>نعم</option>
            <option>لا</option>
          </select>
          <select name="defaultPayment" value={form.defaultPayment} onChange={handleChange} className="border p-2 rounded">
            <option>نعم</option>
            <option>لا</option>
          </select>
          <input name="employees" placeholder="الموظفين" value={form.employees} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#2ba670] text-white rounded">حفظ</button>
        </div>
      </div>
    </div>
  );
};

export default AddPayWayModal;
