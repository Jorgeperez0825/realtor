# Hero Section Components

This directory contains all the components that make up the hero section of the Orlando Dream Properties website.

## Components Structure

```
src/components/hero/
├── index.ts              # Export all components
├── HeroSection.tsx       # Main hero container component
├── VideoBackground.tsx   # Animated background with particles
├── HeroTitle.tsx         # Main title with gradient text
├── HeroSubtitle.tsx      # Subtitle description
├── FeatureTags.tsx       # Feature tags (Disney, Universal, etc.)
├── CTAButtons.tsx        # Call-to-action buttons
├── Stats.tsx             # Statistics grid
├── ScrollIndicator.tsx   # Animated scroll indicator
└── README.md            # This documentation
```

## Usage

### Import the main component:
```tsx
import { HeroSection } from '@/components/hero';

export default function Home() {
  return <HeroSection />;
}
```

### Import individual components:
```tsx
import { 
  VideoBackground, 
  HeroTitle, 
  FeatureTags 
} from '@/components/hero';
```

## Component Descriptions

### `HeroSection`
Main container component that combines all hero elements with proper layout and z-index management.

### `VideoBackground` 
- Animated background with space-themed gradient
- Particle effects (50 animated stars)
- Ready for video integration (commented code included)
- Multiple overlay gradients for text readability

### `HeroTitle`
- Large responsive typography (5xl to 8xl)
- Gradient text effect on "Orlando"
- Clean white text for "Dream Properties"

### `HeroSubtitle`
- Descriptive text about the service
- Responsive sizing (xl to 2xl)
- Orlando theme parks focus

### `FeatureTags`
- Interactive feature badges
- Hover effects with backdrop blur
- Orlando-themed icons and text

### `CTAButtons`
- Primary: "Start AI Property Search" (gradient button)
- Secondary: "Explore Properties" (glass morphism)
- Hover animations and scaling effects

### `Stats`
- 4-column responsive grid (2 cols on mobile)
- Key metrics display
- Clean typography hierarchy

### `ScrollIndicator`
- Animated scroll hint at bottom
- Bounce animation
- Subtle pulsing effect

## Customization

Each component is self-contained and can be easily customized:

1. **Colors**: Modify Tailwind classes or CSS variables
2. **Content**: Update text, icons, or data arrays
3. **Animations**: Adjust duration, delays, or effects
4. **Layout**: Change responsive breakpoints or spacing

## Future Enhancements

- Add video background support
- Implement intersection observer for scroll animations
- Add accessibility improvements (ARIA labels, keyboard navigation)
- Create variants for different themes or seasons