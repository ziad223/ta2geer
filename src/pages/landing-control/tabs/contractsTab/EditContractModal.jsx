import React, { useState, useEffect } from "react";

const EditContractModal = ({ onClose, onSubmit, contract }) => {
  const [form, setForm] = useState(contract || {});

  useEffect(() => {
    if (contract) setForm(contract);
  }, [contract]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0].name : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">تعديل العقد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="clientName"
            placeholder="اسم العميل"
            value={form.clientName || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="contractTitle"
            placeholder="عنوان العقد"
            value={form.contractTitle || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="amount"
            placeholder="المبلغ"
            value={form.amount || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="remainingDays"
            placeholder="المتبقي بالأيام"
            value={form.remainingDays || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              تحديث
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContractModal;
