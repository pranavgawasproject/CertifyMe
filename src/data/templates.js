// Registry of all 12 certificate templates.
// Each entry has: id, name, category, accent (tailwind-ish hex), description
// The `Component` is wired up in TemplateRenderer.jsx to avoid circular imports.

export const TEMPLATES = [
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
];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
