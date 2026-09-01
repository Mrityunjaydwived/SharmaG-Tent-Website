import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Image as GalleryIcon, 
  Calendar, 
  Layers, 
  MessageSquareQuote, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Crown
} from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { Enquiry, EventItem, GalleryItem, ServiceItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    Promise.all([
      dataService.getEnquiries(),
      dataService.getEvents(),
      dataService.getGallery(),
      dataService.getServices(),
    ]).then(([enq, evts, gal, srvs]) => {
      setEnquiries(enq);
      setEvents(evts);
      setGallery(gal);
      setServices(srvs);
    });
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const confirmedCount = enquiries.filter((e) => e.status === 'Confirmed').length;

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Quoted':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 bg-white text-[#111827]">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider mb-1">
            <Crown className="w-3.5 h-3.5 text-[#F8D706]" />
            <span>प्रबंधन नियंत्रण कक्ष (Control Panel)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-luxury text-[#111827]">
            समीक्षा एवं पूछताछ डैशबोर्ड <span className="gradient-text-gold">(Operations)</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/enquiries"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Inbox className="w-4 h-4 text-black" />
            <span>पूछताछ प्रबंधित करें ({newEnquiriesCount} नई) →</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="card-hover-lift rounded-3xl p-5 sm:p-6 border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 space-y-2 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-extrabold">नई पूछताछ (New)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-2xs">
              <AlertCircle className="w-4 h-4 text-[#F09120]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-amber-700">
            {newEnquiriesCount}
          </div>
          <div className="text-[11px] font-bold text-amber-800/80">तत्काल कॉल बैक आवश्यक</div>
        </div>

        <div className="card-hover-lift rounded-3xl p-5 sm:p-6 border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 space-y-2 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-extrabold">पुष्टि कार्यक्रम (Confirmed)</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-emerald-700">
            {confirmedCount}
          </div>
          <div className="text-[11px] font-bold text-emerald-800/80">कैलेंडर में बुक किए गए</div>
        </div>

        <div className="card-hover-lift rounded-3xl p-5 sm:p-6 border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 space-y-2 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-extrabold">गैलरी संग्रह (Gallery)</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1F74BA] flex items-center justify-center shadow-2xs">
              <GalleryIcon className="w-4 h-4 text-[#1F74BA]" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-[#1F74BA]">
            {gallery.length}
          </div>
          <div className="text-[11px] font-bold text-blue-800/80">प्रकाशित हाई-डेफिनिशन चित्र</div>
        </div>

        <div className="card-hover-lift rounded-3xl p-5 sm:p-6 border border-purple-200/80 bg-gradient-to-br from-purple-50/70 via-white to-purple-50/30 space-y-2 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-extrabold">सेवाएं सूची (Services)</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-2xs">
              <Layers className="w-4 h-4 text-purple-700" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-purple-700">
            {services.length}
          </div>
          <div className="text-[11px] font-bold text-purple-800/80">सक्रिय सेवाएं एवं सुविधाएं</div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="card-hover-lift rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold font-serif-luxury text-[#111827]">ताजा ग्राहक पूछताछ (Recent Inquiries)</h3>
            <p className="text-xs text-gray-500 font-normal">वेबसाइट एवं कोटेशन प्लानर से प्राप्त हालिया अनुरोध</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-extrabold text-[#1F74BA] hover:text-[#0B4F8A] flex items-center gap-1.5 transition-colors"
          >
            <span>सभी देखें ({enquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-700 uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5 rounded-l-xl font-extrabold">ग्राहक का नाम</th>
                <th className="px-4 py-3.5 font-extrabold">फ़ोन एवं ईमेल</th>
                <th className="px-4 py-3.5 font-extrabold">कार्यक्रम का प्रकार</th>
                <th className="px-4 py-3.5 font-extrabold">संभावित तारीख</th>
                <th className="px-4 py-3.5 font-extrabold">बजट सीमा</th>
                <th className="px-4 py-3.5 rounded-r-xl font-extrabold">स्थिति (Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.slice(0, 5).map((enq) => (
                <tr key={enq.id} className="hover:bg-blue-50/40 transition">
                  <td className="px-4 py-3.5 font-extrabold text-[#111827]">
                    {enq.customer_name}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-extrabold text-[#111827]">{enq.phone}</div>
                    <div className="text-[10px] text-gray-500">{enq.email}</div>
                  </td>
                  <td className="px-4 py-3.5 font-extrabold text-[#1F74BA]">
                    {enq.event_type}
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-medium">
                    {enq.event_date}
                  </td>
                  <td className="px-4 py-3.5 font-extrabold text-gray-800">
                    {enq.budget_range}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Launch Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-hover-lift rounded-3xl p-6 space-y-3 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border border-[#1F74BA]/20 shadow-sm hover:shadow-md transition-all">
          <h4 className="text-base font-extrabold font-serif-luxury text-[#111827]">नई गैलरी फोटो जोड़ें</h4>
          <p className="text-xs text-gray-600 font-normal">विवाह मंडप, बरात डीजे गाड़ी और लाइटिंग के ताजा फोटो अपलोड करें।</p>
          <Link
            to="/admin/gallery"
            className="inline-block mt-2 px-4 py-2.5 rounded-xl bg-[#1F74BA] text-white hover:bg-[#185e97] transition-all hover:scale-105 active:scale-95 text-xs font-extrabold shadow-xs"
          >
            गैलरी स्टूडियो खोलें →
          </Link>
        </div>

        <div className="card-hover-lift rounded-3xl p-6 space-y-3 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border border-amber-200/80 shadow-sm hover:shadow-md transition-all">
          <h4 className="text-base font-extrabold font-serif-luxury text-[#111827]">व्यापार विवरण अपडेट करें</h4>
          <p className="text-xs text-gray-600 font-normal">आधिकारिक फ़ोन नंबर, व्हाट्सएप, पता एवं सेवा क्षेत्र बदलें।</p>
          <Link
            to="/admin/settings"
            className="inline-block mt-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all hover:scale-105 active:scale-95 text-xs font-extrabold border border-gray-200"
          >
            सेटिंग्स व संपर्क बदलें →
          </Link>
        </div>

        <div className="card-hover-lift rounded-3xl p-6 space-y-3 bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
          <h4 className="text-base font-extrabold font-serif-luxury text-[#111827]">ग्राहक समीक्षाएं (Testimonials)</h4>
          <p className="text-xs text-gray-600 font-normal">परिवारों एवं आयोजकों द्वारा प्राप्त प्रशंसापत्रों को स्वीकृत करें।</p>
          <Link
            to="/admin/testimonials"
            className="inline-block mt-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all hover:scale-105 active:scale-95 text-xs font-extrabold border border-gray-200"
          >
            समीक्षाएं प्रबंधित करें →
          </Link>
        </div>
      </div>
    </div>
  );
};
