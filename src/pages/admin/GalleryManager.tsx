import React, { useState, useEffect } from 'react';
import { Image as GalleryIcon, Plus, Trash2, Edit2, Sparkles, Check, X, Eye, EyeOff } from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { GalleryItem } from '../../types';

export const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Modal Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Weddings');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const data = await dataService.getGallery();
    setItems(data);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Weddings');
    setImageUrl('');
    setDescription('');
    setIsFeatured(false);
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.image_url);
    setDescription(item.description || '');
    setIsFeatured(item.is_featured);
    setIsPublished(item.is_published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const payload: GalleryItem = {
      id: editingItem ? editingItem.id : 'gal-' + Date.now(),
      title,
      category,
      image_url: imageUrl,
      description,
      is_featured: isFeatured,
      is_published: isPublished,
    };

    await dataService.saveGalleryItem(payload);
    await loadGallery();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('क्या आप इस फोटो को गैलरी से हटाना चाहते हैं?')) {
      await dataService.deleteGalleryItem(id);
      await loadGallery();
    }
  };

  const categories = [
    'Weddings',
    'Reception',
    'Religious Events',
    'Parties',
    'Corporate Events',
    'Political Events',
    'Festivals',
    'Stage Decoration',
    'Lighting',
    'DJ',
    'Tents',
    'Mandap',
    'Before/After',
  ];

  return (
    <div className="space-y-8 bg-white text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider mb-1">
            <GalleryIcon className="w-3.5 h-3.5 text-[#F8D706]" />
            <span>गैलरी फोटो प्रबंधक (Gallery Studio CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            तस्वीरें एवं <span className="gradient-text-gold">पोर्टफोलियो स्टूडियो</span>
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-1">
            वेबसाइट की गैलरी में उच्च-गुणवत्ता वाली तस्वीरें जोड़ें, श्रेणीबद्ध करें व प्रदर्शित करें
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>नई फोटो जोड़ें</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="card-hover-lift rounded-3xl overflow-hidden border border-gray-200/90 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-all group relative"
          >
            <div className="h-48 overflow-hidden relative bg-gray-100">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-extrabold text-[#F8D706]">
                {item.category}
              </div>
              {item.is_featured && (
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#F8D706] text-black shadow-xs">
                  <Sparkles className="w-3 h-3 text-black" />
                </div>
              )}
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-[#111827] font-serif-luxury line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-normal">
                  {item.description || 'कोई विवरण नहीं'}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                  {item.is_published ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span>{item.is_published ? 'प्रकाशित' : 'छिपा हुआ'}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-[#1F74BA] text-[#1F74BA] hover:text-white transition"
                    title="संपादित करें"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition"
                    title="हटाएं"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                गैलरी स्टूडियो
              </div>
              <h3 className="text-xl font-extrabold font-serif-luxury text-[#111827] mt-0.5">
                {editingItem ? 'फोटो विवरण अपडेट करें' : 'नई गैलरी फोटो जोड़ें'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  फोटो शीर्षक (Photo Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. शाही जर्मन हैंगर विवाह पंडाल"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  श्रेणी (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  फोटो URL (Image Link) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
                {imageUrl && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  विवरण (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="लोकेशन, तारीख या विशेष आकर्षण..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#1F74BA] focus:ring-[#1F74BA]"
                  />
                  <span>होमपेज पर फीचर करें</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-[#1F74BA] focus:ring-[#1F74BA]"
                  />
                  <span>लाइव प्रकाशित करें</span>
                </label>
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
                  <span>{editingItem ? 'सेव करें' : 'फोटो जोड़ें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
