#!/usr/bin/env node

/**
 * Accessibility Checker
 * Validates color contrast, touch targets, and basic a11y requirements
 */

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast(foreground, background, options = {}) {
  const { isLargeText = false, level = 'AA' } = options;
  const ratio = getContrastRatio(foreground, background);
  
  if (!ratio) return { error: 'Invalid color format' };
  
  const requirements = {
    'AA': { normal: 4.5, large: 3 },
    'AAA': { normal: 7, large: 4.5 }
  };
  
  const required = requirements[level][isLargeText ? 'large' : 'normal'];
  const passes = ratio >= required;
  
  return {
    ratio: ratio.toFixed(2),
    required,
    passes,
    level,
    isLargeText,
    message: passes 
      ? `✓ Passes WCAG ${level} (${ratio.toFixed(2)}:1 >= ${required}:1)`
      : `✗ Fails WCAG ${level} (${ratio.toFixed(2)}:1 < ${required}:1)`
  };
}

function suggestAlternatives(foreground, background, targetRatio = 4.5) {
  const rgb = hexToRgb(foreground);
  if (!rgb) return null;
  
  const suggestions = [];
  
  // Try darkening
  for (let i = 1; i <= 10; i++) {
    const darker = {
      r: Math.max(0, rgb.r - i * 15),
      g: Math.max(0, rgb.g - i * 15),
      b: Math.max(0, rgb.b - i * 15)
    };
    const hex = `#${darker.r.toString(16).padStart(2, '0')}${darker.g.toString(16).padStart(2, '0')}${darker.b.toString(16).padStart(2, '0')}`;
    const ratio = getContrastRatio(hex, background);
    if (ratio >= targetRatio) {
      suggestions.push({ hex, ratio: ratio.toFixed(2), adjustment: 'darker' });
      break;
    }
  }
  
  // Try lightening
  for (let i = 1; i <= 10; i++) {
    const lighter = {
      r: Math.min(255, rgb.r + i * 15),
      g: Math.min(255, rgb.g + i * 15),
      b: Math.min(255, rgb.b + i * 15)
    };
    const hex = `#${lighter.r.toString(16).padStart(2, '0')}${lighter.g.toString(16).padStart(2, '0')}${lighter.b.toString(16).padStart(2, '0')}`;
    const ratio = getContrastRatio(hex, background);
    if (ratio >= targetRatio) {
      suggestions.push({ hex, ratio: ratio.toFixed(2), adjustment: 'lighter' });
      break;
    }
  }
  
  return suggestions;
}

function generateA11yChecklist() {
  return `
=== Accessibility Checklist ===

PERCEIVABLE
□ Text has sufficient color contrast (4.5:1 for normal, 3:1 for large)
□ Non-text elements have 3:1 contrast ratio
□ Color is not the only means of conveying information
□ Text can be resized to 200% without loss of content
□ Images have appropriate alt text
□ Audio/video has captions or transcripts

OPERABLE
□ All functionality available via keyboard
□ No keyboard traps
□ Focus order is logical
□ Focus indicators are visible
□ Touch targets are at least 44x44px
□ Users can pause, stop, or hide moving content
□ No content flashes more than 3 times per second

UNDERSTANDABLE
□ Language of page is identified
□ Navigation is consistent
□ Form labels are associated with inputs
□ Error messages are clear and specific
□ Instructions don't rely solely on sensory characteristics

ROBUST
□ HTML is valid and well-formed
□ Name, role, and value are programmatically determined
□ Status messages are announced to screen readers
□ Custom components have appropriate ARIA attributes
`;
}

function checkTouchTarget(width, height) {
  const MIN_SIZE = 44;
  const passes = width >= MIN_SIZE && height >= MIN_SIZE;
  
  return {
    width,
    height,
    minRequired: MIN_SIZE,
    passes,
    message: passes
      ? `✓ Touch target meets minimum size (${width}x${height}px >= ${MIN_SIZE}x${MIN_SIZE}px)`
      : `✗ Touch target too small (${width}x${height}px < ${MIN_SIZE}x${MIN_SIZE}px)`
  };
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

console.log('=== Accessibility Checker ===\n');

if (command === 'contrast') {
  const foreground = args[1] || '#333333';
  const background = args[2] || '#ffffff';
  const isLarge = args[3] === 'large';
  
  console.log(`Checking contrast: ${foreground} on ${background}\n`);
  
  const resultAA = checkContrast(foreground, background, { isLargeText: isLarge, level: 'AA' });
  const resultAAA = checkContrast(foreground, background, { isLargeText: isLarge, level: 'AAA' });
  
  console.log(`Contrast Ratio: ${resultAA.ratio}:1`);
  console.log(`Text Type: ${isLarge ? 'Large' : 'Normal'}\n`);
  console.log(resultAA.message);
  console.log(resultAAA.message);
  
  if (!resultAA.passes) {
    console.log('\n=== Suggested Alternatives ===\n');
    const suggestions = suggestAlternatives(foreground, background);
    suggestions?.forEach(s => {
      console.log(`${s.adjustment}: ${s.hex} (${s.ratio}:1)`);
    });
  }
  
} else if (command === 'touch') {
  const width = parseInt(args[1]) || 40;
  const height = parseInt(args[2]) || 40;
  
  const result = checkTouchTarget(width, height);
  console.log(result.message);
  
} else if (command === 'checklist') {
  console.log(generateA11yChecklist());
  
} else {
  console.log(`Usage:
  node accessibility-checker.js contrast <foreground> <background> [large]
  node accessibility-checker.js touch <width> <height>
  node accessibility-checker.js checklist

Examples:
  node accessibility-checker.js contrast #666666 #ffffff
  node accessibility-checker.js contrast #333333 #f5f5f5 large
  node accessibility-checker.js touch 40 40
  node accessibility-checker.js checklist
`);
}
