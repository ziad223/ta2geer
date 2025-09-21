import React, { useState, useEffect } from 'react';
import CustomSelect from '../../components/shared/CustomSelect';

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

  const handleSelectChange = (name, selected) => {
    setFormData(prev => ({
      ...prev,
      [name]: selected ? selected.value : ''
    }));
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
            className="border p-2 rounded w-full outline-none"
          />
          <input
            name="hall"
            value={formData.hall}
            onChange={handleChange}
            placeholder="القاعة"
            className="border p-2 rounded w-full outline-none"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border p-2 rounded w-full outline-none"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border p-2 rounded w-full outline-none"
          />
          <input
            name="total"
            value={formData.total}
            onChange={handleChange}
            placeholder="الإجمالي"
            className="border p-2 rounded w-full outline-none"
          />
          <input
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            placeholder="المقدم"
            className="border p-2 rounded w-full outline-none"
          />
          <input
            name="paidTotal"
            value={formData.paidTotal}
            onChange={handleChange}
            placeholder="المدفوع"
            className="border p-2 rounded w-full outline-none"
          />
          <input
            name="remaining"
            value={formData.remaining}
            onChange={handleChange}
            placeholder="المتبقي"
            className="border p-2 rounded w-full outline-none"
          />

          {/* CustomSelect لحالة الحجز */}
          <CustomSelect
            value={
              formData.reservationStatus
                ? { label: formData.reservationStatus, value: formData.reservationStatus }
                : null
            }
            onChange={(selected) => handleSelectChange('reservationStatus', selected)}
            options={[
              { value: '', label: 'حالة الحجز' },
              { value: 'مؤكد', label: 'مؤكد' },
              { value: 'ملغي', label: 'ملغي' },
              { value: 'قيد الانتظار', label: 'قيد الانتظار' },
            ]}
            className="text-sm w-full"
            placeholder="حالة الحجز"
          />

          {/* CustomSelect لحالة الدفع */}
          <CustomSelect
            value={
              formData.paymentStatus
                ? { label: formData.paymentStatus, value: formData.paymentStatus }
                : null
            }
            onChange={(selected) => handleSelectChange('paymentStatus', selected)}
            options={[
              { value: '', label: 'حالة الدفع' },
              { value: 'مدفوع', label: 'مدفوع' },
              { value: 'جزئي', label: 'جزئي' },
              { value: 'غير مدفوع', label: 'غير مدفوع' },
            ]}
            className="text-sm w-full"
            placeholder="حالة الدفع"
          />

          {/* أزرار الحفظ والإلغاء */}
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
