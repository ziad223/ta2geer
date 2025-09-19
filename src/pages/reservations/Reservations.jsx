import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import Table from '../../components/shared/Table';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditReservationModal from './EditReservationModal';
import DeleteReservationModal from './DeleteReservationModal';
import AddReservationModal from './AddReservationModal';

const Reservations = () => {
  const [searchId, setSearchId] = useState('');
  const [eventType, setEventType] = useState('');
  const [owner, setOwner] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [reservations, setReservations] = useState([
    {
      id: 1,
      client: "محمد علي",
      phone: "0551234567",
      eventType: "زفاف",
      startDate: "2025-09-20",
      endDate: "2025-09-21",
      hall: "قاعة الأندلس",
      sections: "الرجال, النساء",
      amount: "15000",
      discount: "1000",
      paid: "5000",
      tax: "750",
      total: "14750",
      paidTotal: "5000",
      cash: "3000",
      network: "2000",
      remaining: "9750",
      reservationStatus: "مؤكد",
      paymentStatus: "جزئي",
      notes: "يلزم التواصل قبل الموعد بـ 3 أيام",
      owner: "نبيل 1"
    },
    {
      id: 2,
      client: "سارة عبد الله",
      phone: "0567890123",
      eventType: "تخرج",
      startDate: "2025-10-01",
      endDate: "2025-10-01",
      hall: "قاعة الفيصل",
      sections: "النساء",
      amount: "10000",
      discount: "0",
      paid: "10000",
      tax: "500",
      total: "10500",
      paidTotal: "10500",
      cash: "10500",
      network: "0",
      remaining: "0",
      reservationStatus: "مؤكد",
      paymentStatus: "مدفوع",
      notes: "",
      owner: "نبيل 2"
    }
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setEditModalOpen(true);
  };
const handleAddReservation = (newRes) => {
  setReservations(prev => [...prev, newRes]);
};


  const openDeleteModal = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteModalOpen(true);
  };

  const handleUpdateReservation = (updated) => {
    setReservations(prev =>
      prev.map(r => (r.id === updated.id ? updated : r))
    );
  };

  const handleDeleteReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    setDeleteModalOpen(false);
    setSelectedReservation(null);
  };

  const columns = [
    { label: "رقم الحجز", key: "id" },
    { label: "العميل", key: "client" },
    { label: "جوال العميل", key: "phone" },
    { label: "نوع المناسبة", key: "eventType" },
    { label: "بداية الحجز", key: "startDate" },
    { label: "نهاية الحجز", key: "endDate" },
    { label: "القاعة", key: "hall" },
    { label: "الأقسام", key: "sections" },
    { label: "مبلغ الحجز", key: "amount" },
    { label: "الخصم", key: "discount" },
    { label: "المقدم", key: "paid" },
    { label: "الضريبة", key: "tax" },
    { label: "الاجمالي", key: "total" },
    { label: "المدفوع", key: "paidTotal" },
    { label: "نقدا", key: "cash" },
    { label: "شبكة", key: "network" },
    { label: "المتبقي", key: "remaining" },
    { label: "حالة الحجز", key: "reservationStatus" },
    { label: "حالة الدفع", key: "paymentStatus" },
    { label: "الملاحظات", key: "notes" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const matchesId = searchId ? r.id.toString().includes(searchId) : true;
      const matchesEvent = eventType ? r.eventType === eventType : true;
      const matchesOwner = owner ? r.owner === owner : true;
      const matchesFrom = dateFrom ? new Date(r.startDate) >= new Date(dateFrom) : true;
      const matchesTo = dateTo ? new Date(r.endDate) <= new Date(dateTo) : true;
      return matchesId && matchesEvent && matchesOwner && matchesFrom && matchesTo;
    });
  }, [searchId, eventType, owner, dateFrom, dateTo, reservations]);

  const dataWithActions = filteredReservations.map(r => ({
    ...r,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => openEditModal(r)}
          className="bg-[#0dcaf0] text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => openDeleteModal(r)}
          className="bg-red-500 text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    )
  }));

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">الحجوزات</h2>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          {/* فلاتر البحث */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 items-center">
  <select
    value={eventType}
    onChange={e => setEventType(e.target.value)}
    className="border h-[40px] outline-none px-3 rounded-lg text-sm w-full"
  >
    <option value="">كل المناسبات</option>
    <option value="زفاف">زفاف</option>
    <option value="تخرج">تخرج</option>
    <option value="اجتماع">اجتماع</option>
  </select>

  <input
    type="text"
    value={searchId}
    onChange={e => setSearchId(e.target.value)}
    placeholder="بحث برقم الحجز"
    className="border h-[40px] outline-none px-3 rounded-lg text-sm w-full"
  />

  <select
    value={owner}
    onChange={e => setOwner(e.target.value)}
    className="border h-[40px] outline-none px-3 rounded-lg text-sm w-full"
  >
    <option value="">اختر كواكب التقنية</option>
    <option value="نبيل 1">نبيل 1</option>
    <option value="نبيل 2">نبيل 2</option>
  </select>

  {/* التاريخ ياخد عمودين */}
  <div className="flex gap-2 col-span-2">
    <input
      type="date"
      value={dateFrom}
      onChange={e => setDateFrom(e.target.value)}
      className="border h-[40px] outline-none px-2 rounded-lg text-sm w-full"
    />
    <input
      type="date"
      value={dateTo}
      onChange={e => setDateTo(e.target.value)}
      className="border h-[40px] outline-none px-2 rounded-lg text-sm w-full"
    />
  </div>

  <button
    onClick={() => setAddModalOpen(true)}
    className="bg-[#2ba670] text-white rounded-lg text-sm h-[40px] outline-none w-full max-w-[120px]"
  >
    + إضافة حجز
  </button>
</div>


          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* مودال التعديل */}
      <EditReservationModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        reservation={selectedReservation}
        onSave={handleUpdateReservation}
      />

      {/* مودال الحذف */}
      <DeleteReservationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        reservation={selectedReservation}
        onDelete={handleDeleteReservation}
      />
      <AddReservationModal
  isOpen={isAddModalOpen}
  onClose={() => setAddModalOpen(false)}
  onAdd={handleAddReservation}
/>

    </Container>
  );
};

export default Reservations;
