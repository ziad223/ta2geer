import React, { useState } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const AddReservationModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    eventType: "",
    startDate: "",
    endDate: "",
    hall: "",
    sections: "",
    amount: "",
    discount: "",
    paid: "",
    tax: "",
    cash: "",
    network: "",
    owner: "",
    reservationStatus: "مؤكد",
    paymentStatus: "",
    notes: "",
  });

  const eventOptions = [
    { value: "زفاف", label: "زفاف" },
    { value: "تخرج", label: "تخرج" },
    { value: "اجتماع", label: "اجتماع" },
  ];

  const ownerOptions = [
    { value: "نبيل 1", label: "نبيل 1" },
    { value: "نبيل 2", label: "نبيل 2" },
  ];

  const statusOptions = [
    { value: "مؤكد", label: "مؤكد" },
    { value: "معلق", label: "معلق" },
    { value: "ملغي", label: "ملغي" },
  ];

  const paymentOptions = [
    { value: "مدفوع", label: "مدفوع" },
    { value: "جزئي", label: "جزئي" },
    { value: "غير مدفوع", label: "غير مدفوع" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option?.value || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total =
      Number(formData.amount || 0) -
      Number(formData.discount || 0) +
      Number(formData.tax || 0);
    const paidTotal = Number(formData.cash || 0) + Number(formData.network || 0);
    const remaining = total - paidTotal;

    const newReservation = {
      ...formData,
      id: Date.now(),
      total,
      paidTotal,
      remaining,
      paymentStatus:
        remaining === 0 ? "مدفوع" : paidTotal > 0 ? "جزئي" : "غير مدفوع",
    };
    onAdd(newReservation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl p-6 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">إضافة حجز جديد</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">اسم العميل</label>
            <input
              name="client"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input
              name="phone"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          <div>
            <label className="block  mb-1 text-sm font-medium">نوع المناسبة</label>
            <CustomSelect
              options={eventOptions}
              value={eventOptions.find((opt) => opt.value === formData.eventType)}
              onChange={(opt) => handleSelectChange("eventType", opt)}
              placeholder="اختر نوع المناسبة"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ البداية</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ النهاية</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          {/* Hall */}
          <div>
            <label className="block mb-1 text-sm font-medium">القاعة</label>
            <input
              name="hall"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          {/* Sections */}
          <div>
            <label className="block mb-1 text-sm font-medium">الأقسام</label>
            <input
              name="sections"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm font-medium">المبلغ</label>
            <input
              name="amount"
              type="number"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
              required
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-1 text-sm font-medium">الخصم</label>
            <input
              name="discount"
              type="number"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
            />
          </div>

          {/* Tax */}
          <div>
            <label className="block mb-1 text-sm font-medium">الضريبة</label>
            <input
              name="tax"
              type="number"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
            />
          </div>

          {/* Cash */}
          <div>
            <label className="block mb-1 text-sm font-medium">نقدا</label>
            <input
              name="cash"
              type="number"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
            />
          </div>

          {/* Network */}
          <div>
            <label className="block mb-1 text-sm font-medium">شبكة</label>
            <input
              name="network"
              type="number"
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none"
            />
          </div>

          {/* Owner */}
          <div>
            <label className="block mb-1 text-sm font-medium">المالك</label>
            <CustomSelect
              options={ownerOptions}
              value={ownerOptions.find((opt) => opt.value === formData.owner)}
              onChange={(opt) => handleSelectChange("owner", opt)}
              placeholder="اختر المالك"
            />
          </div>

          {/* Reservation Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">حالة الحجز</label>
            <CustomSelect
              options={statusOptions}
              value={statusOptions.find((opt) => opt.value === formData.reservationStatus)}
              onChange={(opt) => handleSelectChange("reservationStatus", opt)}
              placeholder="اختر الحالة"
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">حالة الدفع</label>
            <CustomSelect
              options={paymentOptions}
              value={paymentOptions.find((opt) => opt.value === formData.paymentStatus)}
              onChange={(opt) => handleSelectChange("paymentStatus", opt)}
              placeholder="اختر الحالة"
            />
          </div>

          {/* Notes */}
          <div className="lg:col-span-3">
            <label className="block mb-1 text-sm font-medium">ملاحظات</label>
            <textarea
              name="notes"
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full min-h-[80px] resize-y outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#2ba670] text-white px-4 py-2 rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReservationModal;
