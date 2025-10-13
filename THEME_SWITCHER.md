# Theme Switcher Feature

## Overview
Implemented a dual-theme system with a toggle button that allows switching between Professional (default) and Futuristic themes. User preference is saved in localStorage.

## Themes

### 1. Professional Theme (Default)
**Color Scheme:**
- Primary: Blue (#2563eb)
- Secondary: Dark Blue (#1e40af)
- Accent: Light Blue (#3b82f6)
- Background: White/Light Gray
- Text: Dark Gray (#1f2937)

**Design Features:**
- Clean, minimal design
- Standard rounded corners
- Subtle shadows
- Professional blue color palette
- Inter font family
- No particle effects or scan lines
- No custom cursor
- Traditional button styles

**Best For:**
- Job applications
- Professional networking
- Corporate presentations
- Formal contexts

### 2. Futuristic Theme
**Color Scheme:**
- Primary: Cyan (#00f0ff)
- Secondary: Purple (#a78bfa)
- Accent: Magenta (#ff00ff)
- Background: Dark gradients
- Text: White

**Design Features:**
- Sci-fi aesthetic
- Glowing borders and text
- Clip-path polygons
- Particle background animation
- CRT scan line effect
- Custom cursor with glow
- Orbitron/Rajdhani fonts
- Glassmorphism effects

**Best For:**
- Tech portfolios
- Creative showcases
- Personal branding
- Standing out

## Files Created

### JavaScript
1. **`static/js/theme-switcher.js`**
   - Theme toggle logic
   - localStorage management
   - Effect control (particles, scan lines)
   - Button creation and updates

### CSS
2. **`static/css/theme-professional.css`**
   - Professional theme overrides
   - All component styles for professional look
   - Responsive adjustments

### Modified Files
3. **`static/css/styles.css`**
   - Added theme toggle button styles
   - Added Inter font import
   - Responsive theme toggle styles

4. **`templates/base.html`**
   - Added theme-professional.css link
   - Added theme-switcher.js script

## How It Works

### Theme Storage
```javascript
localStorage.setItem('theme', 'professional'); // or 'futuristic'
```

### Theme Application
```html
<body data-theme="professional"> <!-- or "futuristic" -->
```

### CSS Targeting
```css
body[data-theme="professional"] .element {
  /* Professional styles */
}
```

## Toggle Button

**Location:** Fixed bottom-right corner

**Features:**
- Shows current theme icon (💼 Professional / 🎨 Futuristic)
- Shows next theme name
- Smooth rotation animation on click
- Persists across page loads
- Responsive positioning

**Desktop:** Bottom-right, 2rem padding
**Mobile:** Bottom-right, 1rem padding, smaller size

## Theme Effects Control

### Disabled in Professional Theme:
- ❌ Particle canvas animation
- ❌ CRT scan line effect
- ❌ Custom cursor
- ❌ Glowing text shadows
- ❌ Clip-path polygons

### Enabled in Futuristic Theme:
- ✅ All visual effects
- ✅ Particle background
- ✅ Scan lines
- ✅ Custom cursor
- ✅ Glow effects

## Usage

### For Users
1. Visit any page on the website
2. Click the theme toggle button (bottom-right)
3. Theme switches instantly
4. Preference is saved automatically

### For Developers
To add theme support to new components:

```css
/* Default (Futuristic) styles */
.my-component {
  color: var(--primary-glow);
  border: 2px solid var(--primary-glow);
}

/* Professional theme override */
body[data-theme="professional"] .my-component {
  color: #2563eb;
  border: 1px solid #e5e7eb;
}
```

## Browser Compatibility
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- Uses localStorage (supported by all modern browsers)

## Performance
- Instant theme switching
- No page reload required
- Minimal JavaScript overhead
- CSS-based styling (hardware accelerated)
- Effects disabled in professional theme for better performance

## Accessibility
- Button has aria-label
- Clear visual feedback
- High contrast in both themes
- Keyboard accessible
- Screen reader friendly

## Future Enhancements
Consider adding:
- More theme options (Dark Professional, Light Futuristic)
- System preference detection (prefers-color-scheme)
- Smooth transition animations between themes
- Theme preview before switching
- Custom theme builder

## Testing
1. **Default Load**: Should show Professional theme
2. **Toggle**: Click button to switch to Futuristic
3. **Persistence**: Refresh page, theme should remain
4. **Effects**: Verify particles/scan lines appear only in Futuristic
5. **Responsive**: Test on mobile devices
6. **All Pages**: Verify theme works on Home, Resume, Contact pages
