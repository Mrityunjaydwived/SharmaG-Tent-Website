export type EventCategory = 
  | 'Weddings'
  | 'Religious Events'
  | 'Parties & Celebrations'
  | 'Corporate Events'
  | 'Political Events'
  | 'Festivals';

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Quoted'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface BusinessSettings {
  business_name: string;
  founder_name?: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  phone: string;
  secondary_phone?: string;
  whatsapp: string;
  email: string;
  address: string;
  landmark: string;
  service_area: string;
  business_hours: string;
  google_maps_embed_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  about_intro: string;
  about_mission: string;
  about_vision: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  image_url: string;
}

export interface ServiceItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  features: string[];
  image_url: string;
  is_published: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date_string: string;
  location: string;
  description: string;
  services_provided: string[];
  guest_count: string;
  cover_image: string;
  gallery_images: string[];
  is_featured: boolean;
  is_published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  is_featured: boolean;
  is_published: boolean;
  before_image?: string;
  after_image?: string;
  created_at?: string;
}

export interface Enquiry {
  id: string;
  customer_name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  event_location: string;
  guest_count: string;
  required_services: string[];
  budget_range: string;
  message: string;
  status: EnquiryStatus;
  admin_notes: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  event_type: string;
  rating: number;
  review: string;
  date_string: string;
  is_approved: boolean;
  is_featured: boolean;
}
