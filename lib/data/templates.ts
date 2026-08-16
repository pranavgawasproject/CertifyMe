import type { TemplateMeta } from '@/lib/types';

// Registry of all 20 certificate templates.
// Each entry has: id, name, category, accent (tailwind-ish hex), description
// The `Component` is wired up in TemplateRenderer.tsx to avoid circular imports.

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'classic-gold',
    name: 'Classic Gold',
    category: 'Formal',
    accent: '#B8860B',
    description: 'Timeless black & gold with ornate border',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    category: 'Formal',
    accent: '#1E3A8A',
    description: 'Deep blue with gold accents, traditional',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Minimal',
    accent: '#0F172A',
    description: 'Clean white with thin accent line',
  },
  {
    id: 'botanical',
    name: 'Botanical Sage',
    category: 'Nature',
    accent: '#4A6741',
    description: 'Soft sage with leaf decorations',
  },
  {
    id: 'geometric-purple',
    name: 'Geometric Pulse',
    category: 'Modern',
    accent: '#7C3AED',
    description: 'Bold geometric shapes, purple gradient',
  },
  {
    id: 'vintage-kraft',
    name: 'Vintage Kraft',
    category: 'Vintage',
    accent: '#8B5A2B',
    description: 'Kraft paper texture with retro stamp',
  },
  {
    id: 'elegant-rose',
    name: 'Elegant Rose',
    category: 'Elegant',
    accent: '#BE185D',
    description: 'Soft rose with script typography',
  },
  {
    id: 'tech-neon',
    name: 'Tech Neon',
    category: 'Modern',
    accent: '#06B6D4',
    description: 'Dark with neon cyan glow',
  },
  {
    id: 'marble-black',
    name: 'Marble Noir',
    category: 'Luxury',
    accent: '#D4AF37',
    description: 'Black marble with luxurious gold',
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Wave',
    category: 'Modern',
    accent: '#F97316',
    description: 'Warm sunset gradient, celebratory',
  },
  {
    id: 'navy-corporate',
    name: 'Corporate Navy',
    category: 'Formal',
    accent: '#1E293B',
    description: 'Professional navy with crisp white',
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    category: 'Luxury',
    accent: '#D4AF37',
    description: '1920s geometric gold on black',
  },
  {
    id: 'midnight-galaxy',
    name: 'Midnight Galaxy',
    category: 'Modern',
    accent: '#A78BFA',
    description: 'Dark space theme with stars and moon',
  },
  {
    id: 'forest-green',
    name: 'Forest Pine',
    category: 'Nature',
    accent: '#8FBC8F',
    description: 'Deep forest with pine tree silhouettes',
  },
  {
    id: 'crimson-heritage',
    name: 'Crimson Heritage',
    category: 'Formal',
    accent: '#8B0000',
    description: 'Harvard-style crimson formal',
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    category: 'Modern',
    accent: '#FB923C',
    description: 'Bright tropical with palm leaves',
  },
  {
    id: 'pure-monochrome',
    name: 'Pure Monochrome',
    category: 'Minimal',
    accent: '#000000',
    description: 'Strictly black & white minimal',
  },
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    category: 'Elegant',
    accent: '#7C3AED',
    description: 'Soft pastel watercolor splotches',
  },
  {
    id: 'industrial-steel',
    name: 'Industrial Steel',
    category: 'Modern',
    accent: '#F59E0B',
    description: 'Metallic grey with rivets, urban',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'Luxury',
    accent: '#C0C0C0',
    description: 'Royal purple with silver crown accents',
  },
];

export const getTemplateById = (id: string): TemplateMeta =>
  TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
