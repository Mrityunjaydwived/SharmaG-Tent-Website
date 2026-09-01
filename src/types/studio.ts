/**
 * Types and interfaces for SharmaG AI Event Decor Studio
 */

export type StudioViewMode = '2d' | '3d' | 'floorplan' | 'camera';

export type EventCategoryType = 
  | 'wedding'
  | 'reception'
  | 'religious'
  | 'party'
  | 'corporate'
  | 'public'
  | 'festival'
  | 'custom';

export type TimeOfDay = 'day' | 'evening' | 'night';

export type AmbientLightingPreset = 
  | 'wedding-glow'
  | 'royal-gold'
  | 'blue-night'
  | 'corporate'
  | 'festival'
  | 'party'
  | 'traditional';

export type ElementCategory = 
  | 'tents'
  | 'stages'
  | 'mandap'
  | 'flowers'
  | 'lighting'
  | 'furniture'
  | 'entrance'
  | 'dancefloor'
  | 'dj'
  | 'led'
  | 'balloons'
  | 'plants'
  | 'backdrops'
  | 'effects'
  | 'vip'
  | 'dining';

export interface StudioElementDefinition {
  id: string;
  name: string;
  nameHindi: string;
  category: ElementCategory;
  thumbnail: string;
  description: string;
  defaultWidth: number;   // In pixels on 2D canvas
  defaultHeight: number;
  defaultDepth?: number;  // For 3D representation
  defaultColor?: string;
  colorCustomizable: boolean;
  model3DType?: string;   // Procedural 3D mesh type (tent, stage, mandap, sofa, arch, etc.)
  estimatedCost: number;  // Indicative cost in INR for estimation breakdown
}

export interface PlacedStudioElement {
  instanceId: string;
  assetId: string;
  name: string;
  category: ElementCategory;
  x: number;              // 2D Canvas X coordinate (center-based)
  y: number;              // 2D Canvas Y coordinate
  z?: number;             // 3D Canvas Z coordinate
  width: number;
  height: number;
  depth?: number;
  rotation: number;       // In degrees (0 - 360)
  rotation3D?: { x: number; y: number; z: number };
  scale: number;
  color?: string;
  secondaryColor?: string;
  isLocked: boolean;
  isHidden: boolean;
  zIndex: number;
  opacity: number;
  customLabel?: string;
}

export interface StudioVenueScene {
  id: string;
  name: string;
  nameHindi: string;
  type: 'indoor' | 'outdoor' | 'hall' | 'garden' | 'terrace' | 'custom';
  background2D: string;
  groundTexture3D?: string;
  skyColor?: string;
  defaultDimensions: { widthFt: number; lengthFt: number };
}

export interface DesignJSON {
  id: string;
  title: string;
  eventType: EventCategoryType;
  sceneId: string;
  themeStyle: string;
  guestCount: number;
  venueDimensions: { widthFt: number; lengthFt: number };
  timeOfDay: TimeOfDay;
  lightingPreset: AmbientLightingPreset;
  primaryColor: string;
  secondaryColor: string;
  elements: PlacedStudioElement[];
  uploadedVenueImage?: string | null;
  aiNotes?: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  createdAt: string;
  updatedAt: string;
}

export interface DesignTemplate {
  id: string;
  name: string;
  nameHindi: string;
  eventType: EventCategoryType;
  themeStyle: string;
  description: string;
  thumbnail: string;
  primaryColor: string;
  secondaryColor: string;
  guestCount: number;
  sceneId: string;
  elements: PlacedStudioElement[];
}

export interface AIAnalysisResult {
  floorAreaDetected: boolean;
  detectedZoneSuggestions: {
    stageArea: string;
    seatingArea: string;
    diningArea: string;
    entranceArea: string;
  };
  capacityEstimate: number;
  recommendations: string[];
}
