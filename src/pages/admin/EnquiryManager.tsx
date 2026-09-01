import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X,
  IndianRupee,
  Layers
} from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { Enquiry, EnquiryStatus } from '../../types';

export const EnquiryManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editingStatus, setEditingStatus] = useState<EnquiryStatus>('New');
  const [editingNotes, setEditingNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    const data = await dataService.getEnquiries();
    setEnquiries(data);
  };

  const handleOpenDetail = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setEditingStatus(enq.status);
    setEditingNotes(enq.admin_notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedEnquiry) return;
    setIsSaving(true);
    await dataService.updateEnquiryStatus(selectedEnquiry.id, editingStatus, editingNotes);
    await loadEnquiries();
    setIsSaving(false);
    setSelectedEnquiry(null);
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone.includes(search) ||
      enq.event_type.toLowerCase().includes(search.toLowerCase()) ||
      enq.event_location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/20 text-[#D4AF37] border-amber-500/30';
      case 'Contacted':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Quoted':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Confirmed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Completed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const allStatuses: EnquiryStatus[] = [
    'New',
    'Contacted',
    'Quoted',
    'Confirmed',
    'Completed',
    'Cancelled',
  ];

  return (
    <div className="space-y-6 bg-white text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            पूछताछ एवं कोटेशन प्रबंधन <span className="gradient-text-gold">(Enquiries CRM)</span>
          </h1>
          <p className="text-xs text-gray-500 font-normal">
            ग्राहकों की नई पूछताछ से लेकर कार्यक्रम संपन्न होने तक की प्रत्येक स्थिति ट्रैक करें
          </p>
        </div>
        <div className="text-xs font-extrabold text-[#1F74BA] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-2xs">
          कुल पूछताछ: {filteredEnquiries.length} / {enquiries.length}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card-hover-lift rounded-3xl p-4 sm:p-5 border border-gray-200/90 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="ग्राहक नाम, फ़ोन, या स्थान से खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 text-xs text-[#111827] focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-gray-500 font-bold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#1F74BA]" /> स्थिति:
          </span>
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all duration-200 ${
              statusFilter === 'All'
                ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-xs scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            सभी (All)
          </button>
          {allStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all duration-200 ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-xs scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="card-hover-lift rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-700 uppercase text-[10px] tracking-wider border-b border-gray-200 font-extrabold">
              <tr>
                <th className="px-4 py-3.5">ग्राहक व संपर्क</th>
                <th className="px-4 py-3.5">कार्यक्रम का प्रकार</th>
                <th className="px-4 py-3.5">मेहमान व बजट</th>
                <th className="px-4 py-3.5">स्थिति</th>
                <th className="px-4 py-3.5">आंतरिक नोट्स</th>
                <th className="px-4 py-3.5 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-4 py-3.5">
                    <div className="font-extrabold text-[#111827] text-sm">{enq.customer_name}</div>
                    <div className="text-gray-600 font-medium mt-0.5">{enq.phone}</div>
                    <div className="text-gray-400 text-[10px]">{enq.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-extrabold text-[#1F74BA]">{enq.event_type}</div>
                    <div className="text-gray-600 font-medium text-[11px]">{enq.event_date}</div>
                    <div className="text-gray-400 text-[10px] truncate max-w-[180px]">{enq.event_location}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-gray-800 font-bold">{enq.guest_count}</div>
                    <div className="text-[#F09120] font-extrabold">{enq.budget_range}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                      enq.status === 'New' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                      enq.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                      enq.status === 'Contacted' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                      'bg-gray-100 text-gray-800 border-gray-300'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-xs text-gray-500 italic max-w-[200px] truncate">
                      {enq.admin_notes || '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleOpenDetail(enq)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#1F74BA] text-[#1F74BA] hover:text-white transition-all text-xs font-extrabold shadow-2xs"
                    >
                      अपडेट करें
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-gray-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-[#111827] hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-[#1F74BA] font-extrabold uppercase tracking-wider">
                पूछताछ विवरण (Enquiry Details)
              </div>
              <h3 className="text-2xl font-extrabold font-serif-luxury text-[#111827] mt-1">
                {selectedEnquiry.customer_name}
              </h3>
              <p className="text-xs text-gray-500">
                दर्ज किया गया: {selectedEnquiry.created_at ? new Date(selectedEnquiry.created_at).toLocaleString('hi-IN') : 'हाल ही में'}
              </p>
            </div>

            {/* Spec details */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200 text-gray-700">
              <div>
                <span className="text-gray-500 font-bold block">फ़ोन नंबर:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-[#1F74BA] font-extrabold hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-500 font-bold block">ईमेल:</span>
                <span className="text-[#111827] font-semibold">{selectedEnquiry.email || '—'}</span>
              </div>
              <div>
                <span className="text-gray-500 font-bold block">कार्यक्रम का प्रकार:</span>
                <span className="text-[#1F74BA] font-extrabold">{selectedEnquiry.event_type}</span>
              </div>
              <div>
                <span className="text-gray-500 font-bold block">संभावित तारीख:</span>
                <span className="text-[#111827] font-semibold">{selectedEnquiry.event_date}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 font-bold block">आयोजन स्थल:</span>
                <span className="text-[#111827] font-semibold">{selectedEnquiry.event_location}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 font-bold block">वांछित सुविधाएं:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedEnquiry.required_services.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[11px] font-bold text-[#1F74BA] border border-blue-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {selectedEnquiry.message && (
                <div className="col-span-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-bold block">ग्राहक का संदेश:</span>
                  <p className="text-gray-800 italic mt-0.5 font-normal">{selectedEnquiry.message}</p>
                </div>
              )}
            </div>

            {/* Stage Updater */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                स्थिति अपडेट करें (Update Status)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {allStatuses.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setEditingStatus(st)}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      editingStatus === st
                        ? 'bg-[#1F74BA] text-white border-[#1F74BA] shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#1F74BA]/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                आंतरिक कोऑर्डिनेटर नोट्स (Internal Notes)
              </label>
              <textarea
                rows={3}
                placeholder="मीटिंग का सारांश, अग्रिम राशि या विशेष निर्देश लिखें..."
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-xs focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition"
              >
                रद्द करें
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveStatus}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-black" />
                <span>{isSaving ? 'सेव हो रहा है...' : 'सेव करें (Save Changes)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
