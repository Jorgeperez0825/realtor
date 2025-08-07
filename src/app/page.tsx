import { HeroSection } from '@/components/hero';
import { PropertiesShowcase } from '@/components/properties';
import { InteractiveSection } from '@/components/interactive';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropertiesShowcase />
      <InteractiveSection />
      <Footer />
    </>
  );
}