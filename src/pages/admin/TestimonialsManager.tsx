import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, Edit2, Star, Check, X, ShieldCheck } from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { Testimonial } from '../../types';

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Form
  const [clientName, setClientName] = useState('');
  const [eventType, setEventType] = useState('Wedding Celebration');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [dateString, setDateString] = useState('');
  const [isApproved, setIsApproved] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const data = await dataService.getTestimonials();
    setTestimonials(data);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setClientName('');
    setEventType('शाही विवाह समारोह');
    setRating(5);
    setReview('');
    setDateString(new Date().toLocaleDateString('hi-IN'));
    setIsApproved(true);
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem(t);
    setClientName(t.client_name);
    setEventType(t.event_type);
    setRating(t.rating);
    setReview(t.review);
    setDateString(t.date_string);
    setIsApproved(t.is_approved);
    setIsFeatured(t.is_featured);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !review) return;

    const payload: Testimonial = {
      id: editingItem ? editingItem.id : 't-' + Date.now(),
      client_name: clientName,
      event_type: eventType,
      rating,
      review,
      date_string: dateString || new Date().toLocaleDateString('hi-IN'),
      is_approved: isApproved,
      is_featured: isFeatured,
    };

    await dataService.saveTestimonial(payload);
    await loadTestimonials();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('क्या आप इस समीक्षा को हटाना चाहते हैं?')) {
      await dataService.deleteTestimonial(id);
      await loadTestimonials();
    }
  };

  return (
    <div className="space-y-8 bg-white text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider mb-1">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#F8D706]" />
            <span>ग्राहक समीक्षा प्रबंधन (Testimonials CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            समीक्षाएं एवं <span className="gradient-text-gold">प्रशंसापत्र</span>
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-1">
            विवाह परिवारों एवं आयोजकों द्वारा प्राप्त वास्तविक समीक्षाओं को स्वीकृत व प्रदर्शित करें
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>नई समीक्षा जोड़ें</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="card-hover-lift rounded-3xl p-6 border border-gray-200/90 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F8D706] text-[#F8D706]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400">{t.date_string}</span>
              </div>

              <p className="text-xs text-gray-700 italic leading-relaxed">
                "{t.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-[#111827]">{t.client_name}</h4>
                <p className="text-[10px] text-[#1F74BA] font-semibold">{t.event_type}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-[#1F74BA] text-[#1F74BA] hover:text-white transition"
                  title="संपादित करें"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition"
                  title="हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 border border-gray-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-[#111827] hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-[#1F74BA] font-extrabold uppercase tracking-wider">
                समीक्षा प्रबंधन
              </div>
              <h3 className="text-xl font-extrabold font-serif-luxury text-[#111827] mt-0.5">
                {editingItem ? 'समीक्षा संपादित करें' : 'नई समीक्षा जोड़ें'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  ग्राहक / परिवार का नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राजेश शर्मा एवं परिवार"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  आयोजन का प्रकार
                </label>
                <input
                  type="text"
                  placeholder="उदा. शाही विवाह एवं रिसेप्शन"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  रेटिंग (Stars: 1 - 5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl transition ${
                        rating >= star ? 'bg-amber-100 text-[#F09120]' : 'bg-gray-100 text-gray-300'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${rating >= star ? 'fill-[#F8D706]' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  समीक्षा संदेश (Review Text) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="ग्राहक द्वारा प्राप्त अनुभव..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-black" />
                  <span>{editingItem ? 'सेव करें' : 'समीक्षा जोड़ें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
