// Client-Side Data & Content Service (Pure Static & Local Storage Provider)
import { 
  initialSettings, 
  initialCategories, 
  initialServices, 
  initialEvents, 
  initialGallery, 
  initialTestimonials, 
  initialEnquiries 
} from '../data/initialData';
import { allOccasionServices, OccasionServiceCategory } from '../data/eventServicesData';
import { 
  BusinessSettings, 
  ServiceCategory, 
  ServiceItem, 
  EventItem, 
  GalleryItem, 
  Testimonial, 
  Enquiry 
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'sharmag_settings_v3',
  CATEGORIES: 'sharmag_categories_v2',
  SERVICES: 'sharmag_services_v2',
  OCCASION_SERVICES: 'sharmag_occasion_services_v2',
  EVENTS: 'sharmag_events_v2',
  GALLERY: 'sharmag_gallery_v4',
  TESTIMONIALS: 'sharmag_testimonials',
  ENQUIRIES: 'sharmag_enquiries',
};

// Helper for local storage
const getLocalData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
};

export const dataService = {
  // Business Settings
  async getSettings(): Promise<BusinessSettings> {
    return getLocalData<BusinessSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  async updateSettings(settings: BusinessSettings): Promise<boolean> {
    setLocalData(STORAGE_KEYS.SETTINGS, settings);
    return true;
  },

  // Service Categories
  async getCategories(): Promise<ServiceCategory[]> {
    return getLocalData<ServiceCategory[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  // Services
  async getServices(): Promise<ServiceItem[]> {
    return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
  },

  async saveService(service: ServiceItem): Promise<boolean> {
    const list = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    const existingIndex = list.findIndex(s => s.id === service.id);
    if (existingIndex >= 0) {
      list[existingIndex] = service;
    } else {
      list.push(service);
    }
    setLocalData(STORAGE_KEYS.SERVICES, list);
    return true;
  },

  async deleteService(id: string): Promise<boolean> {
    const list = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
    const filtered = list.filter(s => s.id !== id);
    setLocalData(STORAGE_KEYS.SERVICES, filtered);
    return true;
  },

  // Occasion & Production Services
  async getOccasionServices(): Promise<OccasionServiceCategory[]> {
    return getLocalData<OccasionServiceCategory[]>(STORAGE_KEYS.OCCASION_SERVICES, allOccasionServices);
  },

  async saveOccasionService(service: OccasionServiceCategory): Promise<boolean> {
    const list = getLocalData<OccasionServiceCategory[]>(STORAGE_KEYS.OCCASION_SERVICES, allOccasionServices);
    const existingIndex = list.findIndex(s => s.id === service.id);
    if (existingIndex >= 0) {
      list[existingIndex] = service;
    } else {
      list.unshift(service);
    }
    setLocalData(STORAGE_KEYS.OCCASION_SERVICES, list);
    return true;
  },

  async deleteOccasionService(id: string): Promise<boolean> {
    const list = getLocalData<OccasionServiceCategory[]>(STORAGE_KEYS.OCCASION_SERVICES, allOccasionServices);
    const filtered = list.filter(s => s.id !== id);
    setLocalData(STORAGE_KEYS.OCCASION_SERVICES, filtered);
    return true;
  },

  async resetOccasionServices(): Promise<OccasionServiceCategory[]> {
    setLocalData(STORAGE_KEYS.OCCASION_SERVICES, allOccasionServices);
    return allOccasionServices;
  },

  // Events / Portfolio
  async getEvents(): Promise<EventItem[]> {
    return getLocalData<EventItem[]>(STORAGE_KEYS.EVENTS, initialEvents);
  },

  async saveEvent(event: EventItem): Promise<boolean> {
    const list = getLocalData<EventItem[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const existingIndex = list.findIndex(e => e.id === event.id);
    if (existingIndex >= 0) {
      list[existingIndex] = event;
    } else {
      list.push(event);
    }
    setLocalData(STORAGE_KEYS.EVENTS, list);
    return true;
  },

  async deleteEvent(id: string): Promise<boolean> {
    const list = getLocalData<EventItem[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const filtered = list.filter(e => e.id !== id);
    setLocalData(STORAGE_KEYS.EVENTS, filtered);
    return true;
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    return getLocalData<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  },

  async saveGalleryItem(item: GalleryItem): Promise<boolean> {
    const list = getLocalData<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    const existingIndex = list.findIndex(g => g.id === item.id);
    if (existingIndex >= 0) {
      list[existingIndex] = item;
    } else {
      list.unshift(item);
    }
    setLocalData(STORAGE_KEYS.GALLERY, list);
    return true;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    const list = getLocalData<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    const filtered = list.filter(g => g.id !== id);
    setLocalData(STORAGE_KEYS.GALLERY, filtered);
    return true;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },

  async saveTestimonial(test: Testimonial): Promise<boolean> {
    const list = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const existingIndex = list.findIndex(t => t.id === test.id);
    if (existingIndex >= 0) {
      list[existingIndex] = test;
    } else {
      list.unshift(test);
    }
    setLocalData(STORAGE_KEYS.TESTIMONIALS, list);
    return true;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const list = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const filtered = list.filter(t => t.id !== id);
    setLocalData(STORAGE_KEYS.TESTIMONIALS, filtered);
    return true;
  },

  // Inquiries / Lead Form
  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>): Promise<boolean> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      created_at: new Date().toISOString(),
    };

    const list = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    list.unshift(newEnquiry);
    setLocalData(STORAGE_KEYS.ENQUIRIES, list);
    return true;
  },

  async getEnquiries(): Promise<Enquiry[]> {
    return getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status'], notes?: string): Promise<boolean> {
    const list = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    const item = list.find(e => e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.admin_notes = notes;
      setLocalData(STORAGE_KEYS.ENQUIRIES, list);
      return true;
    }
    return false;
  },
};
