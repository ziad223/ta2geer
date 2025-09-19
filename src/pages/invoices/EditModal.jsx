import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, reservation, onSave }) => {
  const [formData, setFormData] = useState({
    client: '',
    hall: '',
    startDate: '',
    endDate: '',
    total: '',
    paid: '',
    paidTotal: '',
    remaining: '',
    reservationStatus: '',
    paymentStatus: '',
  });

  useEffect(() => {
    if (reservation) {
      setFormData({
        client: reservation.client || '',
        hall: reservation.hall || '',
        startDate: reservation.startDate || '',
        endDate: reservation.endDate || '',
        total: reservation.total || '',
        paid: reservation.paid || '',
        paidTotal: reservation.paidTotal || '',
        remaining: reservation.remaining || '',
        reservationStatus: reservation.reservationStatus || '',
        paymentStatus: reservation.paymentStatus || '',
      });
    }
  }, [reservation]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...reservation, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-bold mb-4">تعديل الحجز</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
  <input
    name="client"
    value={formData.client}
    onChange={handleChange}
    placeholder="العميل"
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    name="hall"
    value={formData.hall}
    onChange={handleChange}
    placeholder="القاعة"
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleChange}
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleChange}
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    name="total"
    value={formData.total}
    onChange={handleChange}
    placeholder="الإجمالي"
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    name="paid"
    value={formData.paid}
    onChange={handleChange}
    placeholder="المقدم"
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    name="paidTotal"
    value={formData.paidTotal}
    onChange={handleChange}
    placeholder="المدفوع"
    className="border p-2 rounded w-full  outline-none"
  />
  <input
    name="remaining"
    value={formData.remaining}
    onChange={handleChange}
    placeholder="المتبقي"
    className="border p-2 rounded w-full  outline-none"
  />
  <select
    name="reservationStatus"
    value={formData.reservationStatus}
    onChange={handleChange}
    className="border p-2 rounded w-full  outline-none"
  >
    <option value="">حالة الحجز</option>
    <option value="مؤكد">مؤكد</option>
    <option value="ملغي">ملغي</option>
    <option value="قيد الانتظار">قيد الانتظار</option>
  </select>
  <select
    name="paymentStatus"
    value={formData.paymentStatus}
    onChange={handleChange}
    className="border p-2 rounded w-full  outline-none"
  >
    <option value="">حالة الدفع</option>
    <option value="مدفوع">مدفوع</option>
    <option value="جزئي">جزئي</option>
    <option value="غير مدفوع">غير مدفوع</option>
  </select>

  {/* زر الحفظ والإلغاء بعرض كامل للصف */}
  <div className="col-span-2 flex justify-end gap-3">
    <button
      type="button"
      onClick={onClose}
      className="bg-gray-300 px-4 py-2 rounded"
    >
      إلغاء
    </button>
    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      حفظ
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default EditModal;
