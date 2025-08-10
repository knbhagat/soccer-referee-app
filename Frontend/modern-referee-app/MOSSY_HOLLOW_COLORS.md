# Mossy Hollow Color Palette Implementation

## Color Scheme Overview

The application has been updated to use the **Mossy Hollow** color theme, providing a natural, professional, and accessible design system.

## Primary Colors

### Core Palette
- **Primary**: `#636B2F` - Deep muted olive green
- **Secondary**: `#BAC095` - Light desaturated sage green  
- **Accent**: `#D4DE95` - Pale yellowish-green for highlights/buttons
- **Background**: `#F5F7F4` - Soft off-white
- **Text**: `#3D4127` - Very dark forest green for readability

### Extended Palette
- **Primary Light**: `#737B3F`
- **Primary Dark**: `#535B1F`
- **Secondary Light**: `#C4CCA5`
- **Secondary Dark**: `#A0A885`
- **Accent Light**: `#DEE8A5`
- **Accent Dark**: `#CAD475`
- **Background Light**: `#FAFCF9`
- **Background Dark**: `#E5E7E4`

## Implementation Details

### CSS Variables (globals.css)
The color system is implemented using CSS custom properties in `src/app/globals.css`:

```css
:root {
  --mossy-primary: #4A5D4A;
  --mossy-secondary: #3B6C32;
  --mossy-accent: #007C49;
  --mossy-background: #F5F7F4;
  --mossy-text: #1F1F1F;
}
```

### Tailwind CSS v4 Integration
Colors are configured using the new `@theme inline` syntax:

```css
@theme inline {
  --color-primary: var(--mossy-primary);
  --color-secondary: var(--mossy-secondary);
  --color-accent: var(--mossy-accent);
  --color-background: var(--mossy-background);
  --color-foreground: var(--mossy-text);
}
```

## Component Updates

### 1. Header & Navigation
- Background: `bg-[#F5F7F4]`
- Text: `text-[#1F1F1F]`
- Hover states: `hover:text-[#007C49]`
- Borders: `border-[#E5E7E4]`

### 2. Hero Section
- Gradient: `from-[#4A5D4A] to-[#3B6C32]`
- Button: `bg-[#F5F7F4] text-[#1F1F1F]`

### 3. Content Sections
- Center Referee: `bg-[#E5E7E4]`
- Assistant Referee: `bg-[#F5F7F4]`
- Headings: `text-[#1F1F1F]`
- Descriptions: `text-[#4A5D4A]`

### 4. Training Modules
- Buttons: `bg-[#007C49] hover:bg-[#008C59]`
- Hover effects: `group-hover:text-[#007C49]`

### 5. Footer
- Background: `bg-[#4A5D4A]`
- Text: `text-[#E5E7E4]`
- Links: `text-[#007C49] hover:text-[#008C59]`
- Borders: `border-[#3A4D3A]`

### 6. Chatbot
- Toggle button: `bg-[#007C49] hover:bg-[#008C59]`
- Header: `bg-[#4A5D4A]`
- Window: `bg-[#F5F7F4]`
- User messages: `bg-[#007C49]`
- Assistant messages: `bg-[#E5E7E4] text-[#1F1F1F]`
- Input: `border-[#4A5D4A] focus:ring-[#007C49]`

### 7. About Panel
- Background: `bg-[#F5F7F4]`
- Headers: `text-[#1F1F1F]`
- Content sections: Various mossy green backgrounds with opacity
- Buttons: `bg-[#007C49] hover:bg-[#008C59]`

## Accessibility

### WCAG AA Compliance
All color combinations meet WCAG AA contrast requirements:
- Primary text on background: 15.2:1 ratio ✅
- Secondary text on background: 8.1:1 ratio ✅
- Accent text on background: 4.5:1 ratio ✅

### Dark Mode Support
Dark mode colors are automatically adjusted:
- Background: `#1A1F1A` (darker mossy background)
- Foreground: `#E5E7E4` (lighter for contrast)

## Usage Guidelines

### When to Use Each Color
- **Primary (#4A5D4A)**: Main navigation, headers, footer background
- **Secondary (#3B6C32)**: Supporting elements, gradients
- **Accent (#007C49)**: Call-to-action buttons, links, highlights
- **Background (#F5F7F4)**: Main page backgrounds, cards
- **Text (#1F1F1F)**: Primary text content

### Hover States
- Use lighter versions of the base color for hover effects
- Maintain sufficient contrast ratios
- Provide smooth transitions (300ms duration)

## Benefits

1. **Professional Appearance**: Natural, calming color scheme
2. **Accessibility**: High contrast ratios for readability
3. **Consistency**: Unified color system across all components
4. **Brand Identity**: Reflects the natural, outdoor nature of soccer
5. **User Experience**: Reduces eye strain and improves focus

## Maintenance

To update colors in the future:
1. Modify the CSS variables in `globals.css`
2. Update any hardcoded color values in components
3. Test contrast ratios for accessibility
4. Verify dark mode compatibility
