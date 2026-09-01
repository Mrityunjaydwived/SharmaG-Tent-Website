import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { dataService } from '../lib/dataService';
import { EventItem, EventCategory } from '../types';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    dataService.getEvents().then(setEvents);
  }, []);

  const categories: EventCategory[] = [
    'Weddings',
    'Religious Events',
    'Parties & Celebrations',
    'Corporate Events',
    'Political Events',
    'Festivals',
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white text-[#111827]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-[#1F74BA]/20 text-[#1F74BA] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          संपन्न आयोजन केस स्टडीज (Portfolio)
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          विशाल विवाह, कथा एवं उत्सव पोर्टफोलियो
        </h1>
        <p className="text-base text-gray-600">
          शर्माजी टेंट हाउस द्वारा आयोजित भव्य मांगलिक उत्सवों, वाटरप्रूफ जर्मन हैंगर्स और सांस्कृतिक आयोजनों के विवरण देखें।
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#1F74BA] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          सभी आयोजन ({events.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((item) => (
          <div
            key={item.id}
            className="group card-hover-lift rounded-3xl bg-white border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div className="h-60 overflow-hidden relative">
              <img
                src={item.cover_image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 text-[#1F74BA] text-[11px] font-bold shadow-sm">
                {item.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-serif-luxury text-[#111827] group-hover:text-[#1F74BA] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs metadata */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1F74BA]" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#1F74BA]" />
                    <span>{item.guest_count}</span>
                  </div>
                </div>

                {/* Scope of execution */}
                {item.services_provided && item.services_provided.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#1F74BA]">Delivered Scope:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.services_provided.map((sc, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-blue-50 text-[11px] text-[#1F74BA] font-semibold">
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/quote"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-amber-50/50 hover:from-[#1F74BA] hover:to-[#0B4F8A] text-[#1F74BA] hover:text-white border border-[#1F74BA]/20 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Inquire Similar Setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
