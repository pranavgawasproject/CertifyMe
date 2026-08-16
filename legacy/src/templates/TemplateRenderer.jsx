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
import MidnightGalaxy from './MidnightGalaxy';
import ForestGreen from './ForestGreen';
import CrimsonHeritage from './CrimsonHeritage';
import TropicalParadise from './TropicalParadise';
import PureMonochrome from './PureMonochrome';
import WatercolorSplash from './WatercolorSplash';
import IndustrialSteel from './IndustrialSteel';
import RoyalPurple from './RoyalPurple';

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
  'midnight-galaxy': MidnightGalaxy,
  'forest-green': ForestGreen,
  'crimson-heritage': CrimsonHeritage,
  'tropical-paradise': TropicalParadise,
  'pure-monochrome': PureMonochrome,
  'watercolor-splash': WatercolorSplash,
  'industrial-steel': IndustrialSteel,
  'royal-purple': RoyalPurple,
};

export default function TemplateRenderer({ templateId, data, logoUrl }) {
  const Component = TEMPLATE_MAP[templateId] || ClassicGold;
  return <Component data={data} logoUrl={logoUrl} />;
}
