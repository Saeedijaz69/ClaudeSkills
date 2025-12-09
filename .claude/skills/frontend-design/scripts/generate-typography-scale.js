#!/usr/bin/env node

/**
 * Typography Scale Generator
 * Generates fluid typography using clamp() with customizable ratios
 */

const RATIOS = {
  'minor-second': 1.067,
  'major-second': 1.125,
  'minor-third': 1.2,
  'major-third': 1.25,
  'perfect-fourth': 1.333,
  'augmented-fourth': 1.414,
  'perfect-fifth': 1.5,
  'golden-ratio': 1.618
};

function generateScale(options = {}) {
  const {
    baseSize = 16,
    ratio = 'perfect-fourth',
    minViewport = 320,
    maxViewport = 1280,
    steps = [-2, -1, 0, 1, 2, 3, 4, 5]
  } = options;

  const r = typeof ratio === 'string' ? RATIOS[ratio] : ratio;
  const scale = {};

  steps.forEach(step => {
    const minSize = baseSize * Math.pow(r, step) * 0.8;
    const maxSize = baseSize * Math.pow(r, step);
    
    const slope = (maxSize - minSize) / (maxViewport - minViewport);
    const yAxisIntersection = minSize - slope * minViewport;
    
    const clampMin = (minSize / 16).toFixed(2);
    const clampPreferred = `${(yAxisIntersection / 16).toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw`;
    const clampMax = (maxSize / 16).toFixed(2);

    scale[`step-${step}`] = {
      min: `${minSize.toFixed(2)}px`,
      max: `${maxSize.toFixed(2)}px`,
      clamp: `clamp(${clampMin}rem, ${clampPreferred}, ${clampMax}rem)`,
      rem: `${(maxSize / 16).toFixed(3)}rem`
    };
  });

  return scale;
}

function generateLineHeights() {
  return {
    'tight': 1.1,
    'snug': 1.25,
    'normal': 1.5,
    'relaxed': 1.625,
    'loose': 2
  };
}

function generateLetterSpacing() {
  return {
    'tighter': '-0.05em',
    'tight': '-0.025em',
    'normal': '0',
    'wide': '0.025em',
    'wider': '0.05em',
    'widest': '0.1em'
  };
}

function generateFontWeights() {
  return {
    'thin': 100,
    'extralight': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900
  };
}

function generateCSS(scale, options = {}) {
  const { prefix = 'step' } = options;
  
  let css = `/* Typography Scale - Generated */
/* Base: ${options.baseSize || 16}px | Ratio: ${options.ratio || 'perfect-fourth'} */

:root {
  /* Font Sizes */
`;

  Object.entries(scale).forEach(([name, values]) => {
    css += `  --${name}: ${values.clamp};\n`;
  });

  css += `
  /* Line Heights */
`;
  Object.entries(generateLineHeights()).forEach(([name, value]) => {
    css += `  --leading-${name}: ${value};\n`;
  });

  css += `
  /* Letter Spacing */
`;
  Object.entries(generateLetterSpacing()).forEach(([name, value]) => {
    css += `  --tracking-${name}: ${value};\n`;
  });

  css += `
  /* Font Weights */
`;
  Object.entries(generateFontWeights()).forEach(([name, value]) => {
    css += `  --font-${name}: ${value};\n`;
  });

  css += `}

/* Utility Classes */
`;

  Object.keys(scale).forEach(name => {
    css += `.text-${name} { font-size: var(--${name}); }\n`;
  });

  return css;
}

function generateTailwindConfig(scale) {
  const fontSize = {};
  
  Object.entries(scale).forEach(([name, values]) => {
    const cleanName = name.replace('step-', '');
    fontSize[cleanName] = values.clamp;
  });

  return `// Tailwind Typography Config
module.exports = {
  theme: {
    extend: {
      fontSize: ${JSON.stringify(fontSize, null, 8).replace(/"([^"]+)":/g, "'$1':")},
      lineHeight: ${JSON.stringify(generateLineHeights(), null, 8)},
      letterSpacing: ${JSON.stringify(generateLetterSpacing(), null, 8)},
      fontWeight: ${JSON.stringify(generateFontWeights(), null, 8)}
    }
  }
}`;
}

// Main execution
const args = process.argv.slice(2);
const options = {
  baseSize: parseInt(args[0]) || 16,
  ratio: args[1] || 'perfect-fourth',
  minViewport: parseInt(args[2]) || 320,
  maxViewport: parseInt(args[3]) || 1280
};

console.log('=== Typography Scale Generator ===\n');
console.log(`Base Size: ${options.baseSize}px`);
console.log(`Ratio: ${options.ratio} (${RATIOS[options.ratio] || options.ratio})`);
console.log(`Viewport Range: ${options.minViewport}px - ${options.maxViewport}px\n`);

const scale = generateScale(options);

console.log('=== Scale Values ===\n');
Object.entries(scale).forEach(([name, values]) => {
  console.log(`${name}:`);
  console.log(`  Min: ${values.min}`);
  console.log(`  Max: ${values.max}`);
  console.log(`  Clamp: ${values.clamp}\n`);
});

console.log('=== CSS Output ===\n');
console.log(generateCSS(scale, options));

console.log('\n=== Tailwind Config ===\n');
console.log(generateTailwindConfig(scale));

console.log('\n=== Available Ratios ===');
Object.entries(RATIOS).forEach(([name, value]) => {
  console.log(`  ${name}: ${value}`);
});
