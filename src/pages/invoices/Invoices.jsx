import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import Table from '../../components/shared/Table';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import CustomSelect from '../../components/shared/CustomSelect';

const Invoices = () => {
  const [searchClientOrHall, setSearchClientOrHall] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState('');

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
    },
    {
      id: 3,
      client: "أحمد حسن",
      phone: "0559988776",
      eventType: "عيد ميلاد",
      startDate: "2025-09-25",
      endDate: "2025-09-25",
      hall: "قاعة الورد",
      sections: "النساء",
      amount: "8000",
      discount: "500",
      paid: "4000",
      tax: "400",
      total: "7900",
      paidTotal: "4000",
      cash: "4000",
      network: "0",
      remaining: "3900",
      reservationStatus: "قيد الانتظار",
      paymentStatus: "جزئي",
      notes: "",
      owner: "نبيل 3"
    },
    {
      id: 4,
      client: "ليلى محمد",
      phone: "0544433221",
      eventType: "مؤتمر",
      startDate: "2025-09-28",
      endDate: "2025-09-28",
      hall: "قاعة الفيصل",
      sections: "الرجال",
      amount: "12000",
      discount: "0",
      paid: "12000",
      tax: "600",
      total: "12600",
      paidTotal: "12600",
      cash: "8000",
      network: "4000",
      remaining: "0",
      reservationStatus: "مؤكد",
      paymentStatus: "مدفوع",
      notes: "",
      owner: "نبيل 4"
    }
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const columns = [
    { label: "#", key: "id" },
    { label: "القاعة", key: "hall" },
    { label: "العميل", key: "client" },
    { label: "تاريخ الحجز", key: "startDate" },
    { label: "تاريخ المناسبة", key: "endDate" },
    { label: "الإجمالي", key: "total" },
    { label: "المقدم", key: "paid" },
    { label: "المدفوع", key: "paidTotal" },
    { label: "المتبقي", key: "remaining" },
    { label: "حالة الحجز", key: "reservationStatus" },
    { label: "حالة الدفع", key: "paymentStatus" },
    { label: "الإجراءات", key: "actions" },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const searchText = searchClientOrHall.trim().toLowerCase();
      const matchesClientOrHall =
        searchText === '' ||
        r.client.toLowerCase().includes(searchText) ||
        r.hall.toLowerCase().includes(searchText);

      const matchesFrom = dateFrom ? new Date(r.startDate) >= new Date(dateFrom) : true;
      const matchesTo = dateTo ? new Date(r.startDate) <= new Date(dateTo) : true;

      const matchesPaymentStatus = paymentStatusFilter
        ? (paymentStatusFilter === "مدفوعة" && r.paymentStatus === "مدفوع") ||
          (paymentStatusFilter === "مدفوعة جزئيا" && r.paymentStatus === "جزئي") ||
          (paymentStatusFilter === "غير مدفوعة" && r.paymentStatus !== "مدفوع" && r.paymentStatus !== "جزئي")
        : true;

      const matchesReservationStatus = reservationStatusFilter
        ? r.reservationStatus === reservationStatusFilter
        : true;

      return (
        matchesClientOrHall &&
        matchesFrom &&
        matchesTo &&
        matchesPaymentStatus &&
        matchesReservationStatus
      );
    });
  }, [searchClientOrHall, dateFrom, dateTo, paymentStatusFilter, reservationStatusFilter, reservations]);

  const dataWithActions = filteredReservations.map(r => ({
    ...r,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedReservation(r);
            setEditModalOpen(true);
          }}
          className="bg-[#0dcaf0] text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => {
            setSelectedReservation(r);
            setDeleteModalOpen(true);
          }}
          className="bg-red-500 text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    )
  }));

  const handleUpdateReservation = (updated) => {
    setReservations(prev =>
      prev.map(r => (r.id === updated.id ? updated : r))
    );
  };

  const handleDeleteReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    setSelectedReservation(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <h2 className="text-xl font-bold mb-4">الفواتير</h2>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          {/* فلاتر البحث */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 items-center">
  <input
    type="text"
    value={searchClientOrHall}
    onChange={e => setSearchClientOrHall(e.target.value)}
    placeholder="بحث عن عميل أو قاعة"
    className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
  />

  <div className="flex gap-2 col-span-2">
    <input
      type="date"
      value={dateFrom}
      onChange={e => setDateFrom(e.target.value)}
      className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
    />
    <input
      type="date"
      value={dateTo}
      onChange={e => setDateTo(e.target.value)}
      className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
    />
  </div>

  <CustomSelect
    value={
      paymentStatusFilter
        ? { label: paymentStatusFilter, value: paymentStatusFilter }
        : null
    }
    onChange={(selected) =>
      setPaymentStatusFilter(selected ? selected.value : "")
    }
    options={[
      { value: "", label: "كل حالات الفاتورة" },
      { value: "مدفوعة", label: "مدفوعة" },
      { value: "مدفوعة جزئيا", label: "مدفوعة جزئيا" },
      { value: "غير مدفوعة", label: "غير مدفوعة" },
    ]}
    className="text-sm w-full md:w-[200px]"
    placeholder="كل حالات الفاتورة"
  />

  <CustomSelect
    value={
      reservationStatusFilter
        ? {
            label: reservationStatusFilter,
            value: reservationStatusFilter,
          }
        : null
    }
    onChange={(selected) =>
      setReservationStatusFilter(selected ? selected.value : "")
    }
    options={[
      { value: "", label: "كل حالات الحجز" },
      { value: "مؤكد", label: "مؤكد" },
      { value: "ملغي", label: "ملغي" },
      { value: "قيد الانتظار", label: "قيد الانتظار" },
    ]}
    className="text-sm w-full md:w-[200px]"
    placeholder="كل حالات الحجز"
  />
</div>


          {/* جدول الحجوزات */}
          <Table columns={columns} data={dataWithActions} />
        </div>

        {/* مودال التعديل */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          reservation={selectedReservation}
          onSave={handleUpdateReservation}
        />

        {/* مودال الحذف */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          reservation={selectedReservation}
          onDelete={handleDeleteReservation}
        />
      </div>
    </Container>
  );
};

export default Invoices;

