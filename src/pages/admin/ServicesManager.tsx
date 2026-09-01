import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  Search, 
  RotateCcw,
  Eye,
  AlertCircle,
  FolderPlus,
  Tag,
  Smile
} from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { OccasionServiceCategory } from '../../data/eventServicesData';

export const ServicesManager: React.FC = () => {
  const [occasions, setOccasions] = useState<OccasionServiceCategory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<OccasionServiceCategory | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [titleHindi, setTitleHindi] = useState('');
  const [titleEnglish, setTitleEnglish] = useState('');
  const [categoryGroup, setCategoryGroup] = useState<'wedding' | 'party' | 'religious' | 'corporate' | 'production'>('wedding');
  const [emoji, setEmoji] = useState('🎪');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('10+ सेवाएं शामिल');
  
  // Facilities / Sub-services state
  const [facilities, setFacilities] = useState<string[]>([]);
  const [newFacilityInput, setNewFacilityInput] = useState('');

  // Gallery images state
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState('');

  const groupOptions = [
    { value: 'wedding', labelHindi: 'मांगलिक विवाह व सगाई', labelEng: 'Weddings & Engagement' },
    { value: 'party', labelHindi: 'पार्टी व पारिवारिक उत्सव', labelEng: 'Parties & Family' },
    { value: 'religious', labelHindi: 'धार्मिक कथा व सत्संग', labelEng: 'Religious & Spiritual' },
    { value: 'corporate', labelHindi: 'कॉर्पोरेट व सार्वजनिक', labelEng: 'Corporate & Public' },
    { value: 'production', labelHindi: 'उत्पादन, लाइट व साउंड', labelEng: 'Production & Rentals' },
  ];

  const popularEmojis = ['🎪', '💍', '🎉', '🍼', '🛕', '🪔', '🏢', '🗳️', '🏫', '🏛️', '🏪', '🏠', '👴', '🎤', '💡', '🔊', '🪑', '🌸', '🌧️', '📸', '🌺', '✨', '👑', '🔥'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await dataService.getOccasionServices();
    setOccasions(data);
  };

  const handleOpenAdd = () => {
    setEditingCard(null);
    setTitleHindi('');
    setTitleEnglish('');
    setCategoryGroup('wedding');
    setEmoji('🎪');
    setTagline('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80');
    setBadge('10+ सेवाएं शामिल');
    setFacilities([
      'वाटरप्रूफ जर्मन हैंगर शामियाना',
      'भव्य मंच व स्टेज डेकोरेशन',
      'शाही सोफा व वीआईपी सिटिंग',
      'डिजिटल साउंड व लाइटिंग'
    ]);
    setNewFacilityInput('');
    setGalleryImages([]);
    setNewGalleryInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (occ: OccasionServiceCategory) => {
    setEditingCard(occ);
    setTitleHindi(occ.titleHindi);
    setTitleEnglish(occ.titleEnglish);
    setCategoryGroup(occ.categoryGroup);
    setEmoji(occ.emoji);
    setTagline(occ.tagline);
    setDescription(occ.description);
    setImageUrl(occ.image_url);
    setBadge(occ.badge || `${occ.services.length}+ सेवाएं शामिल`);
    setFacilities([...occ.services]);
    setNewFacilityInput('');
    setGalleryImages(occ.gallery_images ? [...occ.gallery_images] : []);
    setNewGalleryInput('');
    setIsModalOpen(true);
  };

  const handleAddFacility = () => {
    const trimmed = newFacilityInput.trim();
    if (trimmed && !facilities.includes(trimmed)) {
      setFacilities([...facilities, trimmed]);
      setNewFacilityInput('');
    }
  };

  const handleRemoveFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const handleAddGalleryImage = () => {
    const trimmed = newGalleryInput.trim();
    if (trimmed && !galleryImages.includes(trimmed)) {
      setGalleryImages([...galleryImages, trimmed]);
      setNewGalleryInput('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleHindi) {
      alert('कृपया कार्ड का हिंदी शीर्षक दर्ज करें');
      return;
    }

    const categoryObj = groupOptions.find(g => g.value === categoryGroup);
    const categoryGroupHindi = categoryObj ? categoryObj.labelHindi : 'उत्सव एवं सेवा';

    const cardPayload: OccasionServiceCategory = {
      id: editingCard ? editingCard.id : 'occ-' + Date.now(),
      categoryGroup,
      categoryGroupHindi,
      emoji,
      titleHindi,
      titleEnglish: titleEnglish || titleHindi,
      tagline,
      description,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
      gallery_images: galleryImages,
      badge: badge || `${facilities.length}+ सेवाएं शामिल`,
      services: facilities.length > 0 ? facilities : ['सम्पूर्ण उत्सव व्यवस्था']
    };

    await dataService.saveOccasionService(cardPayload);
    await loadData();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await dataService.deleteOccasionService(id);
    await loadData();
    setDeleteConfirmId(null);
  };

  const handleResetDefault = async () => {
    if (window.confirm('क्या आप सभी कार्ड्स को डिफ़ॉल्ट 20 उत्सवों में रीसेट करना चाहते हैं?')) {
      await dataService.resetOccasionServices();
      await loadData();
    }
  };

  const filteredCards = occasions.filter(occ => {
    const matchesGroup = selectedGroup === 'all' || occ.categoryGroup === selectedGroup;
    const q = search.toLowerCase().trim();
    if (!q) return matchesGroup;

    const matchesTitle = occ.titleHindi.toLowerCase().includes(q) ||
      occ.titleEnglish.toLowerCase().includes(q) ||
      occ.tagline.toLowerCase().includes(q);

    const matchesFacility = occ.services.some(s => s.toLowerCase().includes(q));
    return matchesGroup && (matchesTitle || matchesFacility);
  });

  return (
    <div className="space-y-8 bg-white text-[#111827]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-[#F8D706]" />
            <span>उत्सव एवं सेवा कार्ड प्रबंधक (Services Catalog & Facility Manager)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            सेवा कार्ड जोड़ें, बदलें व <span className="gradient-text-gold">सुविधाएं प्रबंधित करें</span>
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-1">
            वेबसाइट के सर्विसेस पेज पर दिखने वाले सभी 20+ उत्सव कार्ड्स को लाइव कस्टमाइज़ करें
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleResetDefault}
            className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-extrabold transition-all flex items-center gap-1.5 border border-gray-200"
            title="मूल 20 कार्ड्स रीस्टोर करें"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>डिफ़ॉल्ट रीसेट</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>नया उत्सव कार्ड जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="card-hover-lift rounded-3xl p-4 sm:p-5 border border-gray-200/90 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="कार्ड नाम या सुविधा खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 text-xs text-[#111827] focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
              selectedGroup === 'all'
                ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            सभी ({occasions.length})
          </button>
          {groupOptions.map(grp => (
            <button
              key={grp.value}
              onClick={() => setSelectedGroup(grp.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                selectedGroup === grp.value
                  ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {grp.labelHindi}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid in Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((occ) => (
          <div
            key={occ.id}
            className="card-hover-lift rounded-3xl bg-white border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Card Thumbnail */}
            <div className="h-44 relative bg-gray-100 overflow-hidden">
              <img
                src={occ.image_url}
                alt={occ.titleHindi}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-extrabold">
                {occ.emoji} {occ.categoryGroupHindi}
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#F8D706] text-black text-[10px] font-extrabold shadow-2xs">
                {occ.badge || `${occ.services.length} सेवाएं`}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-extrabold font-serif-luxury truncate">
                  {occ.titleHindi}
                </h3>
                <p className="text-[10px] text-gray-300 truncate font-semibold">
                  {occ.titleEnglish}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-blue-50/70 text-[11px] font-bold text-[#1F74BA] truncate">
                  {occ.tagline}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 font-normal">
                  {occ.description}
                </p>

                {/* Facilities Preview */}
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">
                    शामिल सुविधाएं ({occ.services.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                    {occ.services.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-700 truncate max-w-[160px]">
                        ✓ {s}
                      </span>
                    ))}
                    {occ.services.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-extrabold text-[#1F74BA]">
                        +{occ.services.length - 4} और
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEdit(occ)}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-[#1F74BA] text-[#1F74BA] hover:text-white transition-all text-xs font-extrabold flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>संपादित करें (Edit)</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(occ.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-all text-xs font-extrabold"
                  title="कार्ड हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 space-y-4 border border-gray-200 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#111827]">क्या आप इस कार्ड को हटाना चाहते हैं?</h3>
            <p className="text-xs text-gray-500 font-normal">
              यह कार्ड और इसकी सभी सुविधाएं वेबसाइट के सर्विसेस पेज से हटा दी जाएंगी।
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
              >
                रद्द करें
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-extrabold hover:bg-rose-700 shadow-xs"
              >
                हाँ, कार्ड हटाएं
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Card Full Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
          <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[92vh] flex flex-col">
            {/* Modal Top Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1F74BA] flex items-center justify-center font-extrabold text-base">
                  {emoji}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-serif-luxury text-[#111827]">
                    {editingCard ? 'उत्सव कार्ड संपादित करें (Edit Card)' : 'नया उत्सव कार्ड जोड़ें (Add Card)'}
                  </h3>
                  <p className="text-xs text-gray-500">सभी जानकारी और सुविधाएं भरें</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-[#111827] hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Category Group & Emoji row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    उत्सव श्रेणी (Category Group)
                  </label>
                  <select
                    value={categoryGroup}
                    onChange={(e: any) => setCategoryGroup(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  >
                    {groupOptions.map(g => (
                      <option key={g.value} value={g.value}>
                        {g.labelHindi} ({g.labelEng})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    इमोजी आइकन (Emoji)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      className="w-16 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center text-base focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                    />
                    <div className="flex gap-1 overflow-x-auto py-1">
                      {popularEmojis.slice(0, 5).map((em, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setEmoji(em)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 text-xs flex items-center justify-center shrink-0"
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Titles Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    हिंदी शीर्षक (Hindi Title) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. शाही विवाह एवं मांगलिक उत्सव"
                    value={titleHindi}
                    onChange={(e) => setTitleHindi(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    अंग्रेजी शीर्षक (English Subtitle)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weddings & Marriages"
                    value={titleEnglish}
                    onChange={(e) => setTitleEnglish(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tagline & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    टैगलाइन सारांश (Tagline)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. भव्य वाटरप्रूफ जर्मन हैंगर, सुनहरे मंडप और सम्पूर्ण व्यवस्था"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                    बैज टेक्स्ट (Badge)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 25+ सेवाएं शामिल"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">
                  विस्तृत विवरण (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="कार्ड का विस्तृत विवरण दर्ज करें..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                />
              </div>

              {/* Image URL & Live Preview */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider flex items-center justify-between">
                  <span>मुख्य फोटो URL (Featured Image URL)</span>
                  <span className="text-[10px] text-gray-400 font-normal">Unsplash या डायरेक्ट इमेज लिंक</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                  {imageUrl && (
                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
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
              </div>

              {/* Facilities / Sub-Services Interactive Manager */}
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-[#1F74BA]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider block">
                      उत्सव में शामिल सुविधाएं (Included Facilities & Sub-Services)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      ग्राहक जब कार्ड पर क्लिक करेगा, तो ये सभी सुविधाएं दिखाई देंगी ({facilities.length})
                    </p>
                  </div>
                </div>

                {/* Input to Add Facility */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="नई सुविधा या उपकरण का नाम लिखें (उदा. 3D डांस फ्लोर, महाराजा सोफा, व्यास पीठ)..."
                    value={newFacilityInput}
                    onChange={(e) => setNewFacilityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFacility();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-[#111827] focus:border-[#1F74BA] focus:outline-none shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddFacility}
                    className="px-4 py-2.5 rounded-xl bg-[#1F74BA] text-white text-xs font-extrabold hover:bg-[#185e97] transition-all flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>सुविधा जोड़ें</span>
                  </button>
                </div>

                {/* Facilities Chip List */}
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pt-1">
                  {facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-gray-800 flex items-center gap-2 shadow-2xs group"
                    >
                      <span className="text-[#1F74BA]">✓</span>
                      <span>{fac}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(idx)}
                        className="text-gray-400 hover:text-rose-600 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {facilities.length === 0 && (
                    <p className="text-xs text-gray-400 italic">
                      कोई सुविधा नहीं जोड़ी गई। कृपया ऊपर लिखकर सुविधा जोड़ें।
                    </p>
                  )}
                </div>
              </div>

              {/* Gallery Images Manager */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-[#111827] uppercase tracking-wider block">
                  अतिरिक्त गैलरी तस्वीरें (Additional Photos for Modal Gallery)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="अतिरिक्त फोटो URL (उदा. https://images.unsplash.com/...)"
                    value={newGalleryInput}
                    onChange={(e) => setNewGalleryInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold transition"
                  >
                    + फोटो जोड़ें
                  </button>
                </div>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="h-16 rounded-xl overflow-hidden relative border border-gray-200 group">
                        <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-black" />
                  <span>{editingCard ? 'परिवर्तन सेव करें' : 'नया कार्ड जोड़ें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
