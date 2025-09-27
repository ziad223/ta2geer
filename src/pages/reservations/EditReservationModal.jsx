import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const EditReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
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

  // تحميل بيانات الحجز الحالي في الفورم
  useEffect(() => {
    if (reservation) {
      setFormData({
        client: reservation.client || "",
        phone: reservation.phone || "",
        eventType: reservation.eventType || "",
        startDate: reservation.startDate || "",
        endDate: reservation.endDate || "",
        hall: reservation.hall || "",
        sections: reservation.sections || "",
        amount: reservation.amount || "",
        discount: reservation.discount || "",
        paid: reservation.paid || "",
        tax: reservation.tax || "",
        cash: reservation.cash || "",
        network: reservation.network || "",
        owner: reservation.owner || "",
        reservationStatus: reservation.reservationStatus || "مؤكد",
        paymentStatus: reservation.paymentStatus || "",
        notes: reservation.notes || "",
      });
    }
  }, [reservation]);

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
    const paidTotal =
      Number(formData.cash || 0) + Number(formData.network || 0);
    const remaining = total - paidTotal;

    const updatedReservation = {
      ...reservation,
      ...formData,
      total,
      paidTotal,
      remaining,
      paymentStatus:
        remaining === 0 ? "مدفوع" : paidTotal > 0 ? "جزئي" : "غير مدفوع",
    };

    onSave(updatedReservation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">تعديل الحجز</h2>
        <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
>
  <input
    name="client"
    value={formData.client}
    placeholder="اسم العميل"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />
  <input
    name="phone"
    value={formData.phone}
    placeholder="رقم الجوال"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />

  <CustomSelect
    options={eventOptions}
    value={
      eventOptions.find((opt) => opt.value === formData.eventType) || null
    }
    onChange={(opt) => handleSelectChange("eventType", opt)}
    placeholder="نوع المناسبة"
  />

  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />
  <input
    name="hall"
    value={formData.hall}
    placeholder="القاعة"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />
  <input
    name="sections"
    value={formData.sections}
    placeholder="الأقسام"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
  />

  <input
    name="amount"
    type="number"
    value={formData.amount}
    placeholder="المبلغ"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
    required
  />
  <input
    name="discount"
    type="number"
    value={formData.discount}
    placeholder="الخصم"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
  />
  <input
    name="tax"
    type="number"
    value={formData.tax}
    placeholder="الضريبة"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
  />

  <input
    name="cash"
    type="number"
    value={formData.cash}
    placeholder="نقدا"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
  />
  <input
    name="network"
    type="number"
    value={formData.network}
    placeholder="شبكة"
    onChange={handleChange}
    className="border px-3 h-10 rounded outline-none w-full"
  />

  <CustomSelect
    options={ownerOptions}
    value={ownerOptions.find((opt) => opt.value === formData.owner) || null}
    onChange={(opt) => handleSelectChange("owner", opt)}
    placeholder="اختر المالك"
  />

  <CustomSelect
    options={statusOptions}
    value={
      statusOptions.find(
        (opt) => opt.value === formData.reservationStatus
      ) || null
    }
    onChange={(opt) => handleSelectChange("reservationStatus", opt)}
    placeholder="حالة الحجز"
  />

  <CustomSelect
    options={paymentOptions}
    value={
      paymentOptions.find(
        (opt) => opt.value === formData.paymentStatus
      ) || null
    }
    onChange={(opt) => handleSelectChange("paymentStatus", opt)}
    placeholder="حالة الدفع"
  />

  <textarea
    name="notes"
    value={formData.notes}
    placeholder="ملاحظات"
    onChange={handleChange}
    className="lg:col-span-3 border px-3 py-2 rounded outline-none w-full min-h-[80px] resize-y"
  />

  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={onClose}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
    >
      إلغاء
    </button>
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      حفظ التغييرات
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default EditReservationModal;
