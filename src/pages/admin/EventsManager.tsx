import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Edit2, Check, X, Users, MapPin } from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { EventItem, EventCategory } from '../../types';

export const EventsManager: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Weddings');
  const [dateString, setDateString] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await dataService.getEvents();
    setEvents(data);
  };

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setTitle('');
    setCategory('Weddings');
    setDateString('[EVENT DATE PLACEHOLDER]');
    setLocation('[VENUE LOCATION PLACEHOLDER]');
    setDescription('');
    setServicesInput('Waterproof Tent Hangar, Mandap Decoration, Moving Head Lights');
    setGuestCount('1,000+ Guests');
    setCoverImage('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80');
    setIsFeatured(false);
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: EventItem) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setCategory(evt.category);
    setDateString(evt.date_string);
    setLocation(evt.location);
    setDescription(evt.description);
    setServicesInput(evt.services_provided.join(', '));
    setGuestCount(evt.guest_count);
    setCoverImage(evt.cover_image);
    setIsFeatured(evt.is_featured);
    setIsPublished(evt.is_published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const payload: EventItem = {
      id: editingEvent ? editingEvent.id : 'evt-' + Date.now(),
      title,
      category,
      date_string: dateString,
      location,
      description,
      services_provided: servicesInput.split(',').map((s) => s.trim()).filter(Boolean),
      guest_count: guestCount,
      cover_image: coverImage,
      gallery_images: [coverImage],
      is_featured: isFeatured,
      is_published: isPublished,
    };

    await dataService.saveEvent(payload);
    await loadEvents();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this event portfolio entry?')) {
      await dataService.deleteEvent(id);
      await loadEvents();
    }
  };

  const categories: EventCategory[] = [
    'Weddings',
    'Religious Events',
    'Parties & Celebrations',
    'Corporate Events',
    'Political Events',
    'Festivals',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif-luxury text-white">Event Portfolio Manager</h1>
          <p className="text-xs text-gray-400">Curate showcase events, attendee counts, and structural scope</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs shadow-md hover:bg-[#E2C366] transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Portfolio Event</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={evt.cover_image}
                alt={evt.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-amber-500/30">
                {evt.category}
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white font-serif-luxury line-clamp-1">
                  {evt.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {evt.guest_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="truncate max-w-[120px]">{evt.location}</span>
                  </span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {evt.is_published ? '🟢 Published' : '⚪ Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(evt)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="max-w-xl w-full glass-card-gold rounded-3xl p-6 sm:p-8 space-y-4 border border-amber-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/40 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-luxury text-white">
              {editingEvent ? 'Edit Portfolio Event' : 'Add New Portfolio Event'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-medium">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Heritage Wedding Pavilion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EventCategory)}
                    className="w-full px-4 py-2 rounded-xl bg-[#181820] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Guest Count</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,500+ Guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Event Date</label>
                  <input
                    type="text"
                    placeholder="[EVENT DATE PLACEHOLDER]"
                    value={dateString}
                    onChange={(e) => setDateString(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Event Location</label>
                  <input
                    type="text"
                    placeholder="[VENUE LOCATION PLACEHOLDER]"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-medium">Cover Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-medium">Services Provided (comma separated)</label>
                <input
                  type="text"
                  placeholder="Waterproof Tent Hangar, Mandap Decoration, Moving Head Lights"
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-medium">Event Description</label>
                <textarea
                  rows={2}
                  placeholder="Details of the setup, themes, and special requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-white/20 text-[#D4AF37] focus:ring-0"
                  />
                  <span>Feature Event</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded border-white/20 text-[#D4AF37] focus:ring-0"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-white/[0.05] text-gray-300 text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs shadow-md"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
