import ClassicGold from './ClassicGold';
import RoyalBlue from './RoyalBlue';
import ModernMinimal from './ModernMinimal';
import Botanical from './Botanical';
import GeometricPurple from './GeometricPurple';
import VintageKraft from './VintageKraft';
import ElegantRose from './ElegantRose';
import TechNeon from './TechNeon';
import MarbleBlack from './MarbleBlack';
import SunsetGradient from './SunsetGradient';
import NavyCorporate from './NavyCorporate';
import ArtDeco from './ArtDeco';

const TEMPLATE_MAP = {
  'classic-gold': ClassicGold,
  'royal-blue': RoyalBlue,
  'modern-minimal': ModernMinimal,
  'botanical': Botanical,
  'geometric-purple': GeometricPurple,
  'vintage-kraft': VintageKraft,
  'elegant-rose': ElegantRose,
  'tech-neon': TechNeon,
  'marble-black': MarbleBlack,
  'sunset-gradient': SunsetGradient,
  'navy-corporate': NavyCorporate,
  'art-deco': ArtDeco,
};

export default function TemplateRenderer({ templateId, data }) {
  const Component = TEMPLATE_MAP[templateId] || ClassicGold;
  return <Component data={data} />;
}
