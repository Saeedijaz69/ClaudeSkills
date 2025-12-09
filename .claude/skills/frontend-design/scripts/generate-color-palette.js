#!/usr/bin/env node

/**
 * Color Palette Generator
 * Generates accessible color palettes with proper contrast ratios
 */

const fs = require('fs');
const path = require('path');

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generatePalette(baseHue, name = 'primary') {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const lightness = [97, 94, 86, 74, 60, 48, 40, 32, 26, 22, 12];
  const saturation = [95, 90, 85, 80, 75, 70, 75, 80, 85, 90, 95];
  
  const palette = {};
  
  shades.forEach((shade, i) => {
    const [r, g, b] = hslToRgb(baseHue, saturation[i], lightness[i]);
    const hex = rgbToHex(r, g, b);
    const luminance = getLuminance(r, g, b);
    
    palette[shade] = {
      hex,
      hsl: `hsl(${baseHue}, ${saturation[i]}%, ${lightness[i]}%)`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      luminance: luminance.toFixed(4),
      contrastOnWhite: getContrastRatio(luminance, 1).toFixed(2),
      contrastOnBlack: getContrastRatio(luminance, 0).toFixed(2)
    };
  });
  
  return palette;
}

function generateCSSVariables(palettes) {
  let css = ':root {\n';
  
  Object.entries(palettes).forEach(([name, palette]) => {
    css += `  /* ${name.charAt(0).toUpperCase() + name.slice(1)} Palette */\n`;
    Object.entries(palette).forEach(([shade, values]) => {
      css += `  --color-${name}-${shade}: ${values.hex};\n`;
    });
    css += '\n';
  });
  
  css += '}\n';
  return css;
}

function generateTailwindConfig(palettes) {
  const colors = {};
  
  Object.entries(palettes).forEach(([name, palette]) => {
    colors[name] = {};
    Object.entries(palette).forEach(([shade, values]) => {
      colors[name][shade] = values.hex;
    });
  });
  
  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 6).replace(/"([^"]+)":/g, '$1:')}
    }
  }
}`;
}

// Main execution
const args = process.argv.slice(2);
const baseHue = parseInt(args[0]) || 220; // Default to blue
const outputDir = args[1] || './output';

console.log(`Generating color palette with base hue: ${baseHue}`);

const palettes = {
  primary: generatePalette(baseHue, 'primary'),
  secondary: generatePalette((baseHue + 180) % 360, 'secondary'),
  accent: generatePalette((baseHue + 45) % 360, 'accent'),
  neutral: generatePalette(baseHue, 'neutral').map ? 
    generatePalette(baseHue, 'neutral') : 
    generatePalette(0, 'neutral') // Desaturated for neutrals
};

// Generate neutral with low saturation
const neutralShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const neutralLightness = [98, 96, 90, 83, 64, 45, 32, 25, 15, 9, 4];
palettes.neutral = {};
neutralShades.forEach((shade, i) => {
  const [r, g, b] = hslToRgb(baseHue, 5, neutralLightness[i]);
  const hex = rgbToHex(r, g, b);
  const luminance = getLuminance(r, g, b);
  palettes.neutral[shade] = {
    hex,
    hsl: `hsl(${baseHue}, 5%, ${neutralLightness[i]}%)`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    luminance: luminance.toFixed(4),
    contrastOnWhite: getContrastRatio(luminance, 1).toFixed(2),
    contrastOnBlack: getContrastRatio(luminance, 0).toFixed(2)
  };
});

// Output results
console.log('\n=== Generated Palette ===\n');
console.log(JSON.stringify(palettes, null, 2));

console.log('\n=== CSS Variables ===\n');
console.log(generateCSSVariables(palettes));

console.log('\n=== Tailwind Config ===\n');
console.log(generateTailwindConfig(palettes));

// Accessibility check
console.log('\n=== Accessibility Check ===\n');
Object.entries(palettes.primary).forEach(([shade, values]) => {
  const passesAA = parseFloat(values.contrastOnWhite) >= 4.5 || parseFloat(values.contrastOnBlack) >= 4.5;
  const passesAAA = parseFloat(values.contrastOnWhite) >= 7 || parseFloat(values.contrastOnBlack) >= 7;
  console.log(`${shade}: ${values.hex} | White: ${values.contrastOnWhite}:1 | Black: ${values.contrastOnBlack}:1 | AA: ${passesAA ? '✓' : '✗'} | AAA: ${passesAAA ? '✓' : '✗'}`);
});
