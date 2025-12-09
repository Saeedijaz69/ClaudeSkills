#!/usr/bin/env node

/**
 * SVG Generator
 * Creates SVG graphics, patterns, and animations
 */

// SVG Pattern Generators
const patterns = {
  dots: (options = {}) => {
    const { size = 20, radius = 2, fill = '#000', opacity = 0.5 } = options;
    return `
<pattern id="dots" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
  <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${fill}" opacity="${opacity}"/>
</pattern>`;
  },

  grid: (options = {}) => {
    const { size = 20, stroke = '#000', strokeWidth = 1, opacity = 0.2 } = options;
    return `
<pattern id="grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
  <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>
</pattern>`;
  },

  diagonalLines: (options = {}) => {
    const { size = 10, stroke = '#000', strokeWidth = 1, opacity = 0.3 } = options;
    return `
<pattern id="diagonalLines" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
  <path d="M 0 ${size} L ${size} 0" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>
</pattern>`;
  },

  waves: (options = {}) => {
    const { width = 100, height = 20, stroke = '#000', strokeWidth = 2 } = options;
    return `
<pattern id="waves" width="${width}" height="${height}" patternUnits="userSpaceOnUse">
  <path d="M 0 ${height / 2} Q ${width / 4} 0 ${width / 2} ${height / 2} T ${width} ${height / 2}" 
        fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/>
</pattern>`;
  },

  hexagons: (options = {}) => {
    const { size = 30, fill = 'none', stroke = '#000', strokeWidth = 1 } = options;
    const h = size * Math.sqrt(3) / 2;
    return `
<pattern id="hexagons" width="${size * 1.5}" height="${h * 2}" patternUnits="userSpaceOnUse">
  <polygon points="${size / 2},0 ${size},${h / 2} ${size},${h * 1.5} ${size / 2},${h * 2} 0,${h * 1.5} 0,${h / 2}"
           fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>
</pattern>`;
  },

  triangles: (options = {}) => {
    const { size = 20, fill = '#000', opacity = 0.3 } = options;
    return `
<pattern id="triangles" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
  <polygon points="${size / 2},0 ${size},${size} 0,${size}" fill="${fill}" opacity="${opacity}"/>
</pattern>`;
  },

  checkerboard: (options = {}) => {
    const { size = 20, fill1 = '#fff', fill2 = '#000' } = options;
    return `
<pattern id="checkerboard" width="${size * 2}" height="${size * 2}" patternUnits="userSpaceOnUse">
  <rect width="${size}" height="${size}" fill="${fill1}"/>
  <rect x="${size}" width="${size}" height="${size}" fill="${fill2}"/>
  <rect y="${size}" width="${size}" height="${size}" fill="${fill2}"/>
  <rect x="${size}" y="${size}" width="${size}" height="${size}" fill="${fill1}"/>
</pattern>`;
  },

  noise: () => `
<filter id="noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter>`,

  grain: (options = {}) => {
    const { intensity = 0.5 } = options;
    return `
<filter id="grain">
  <feTurbulence type="turbulence" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
  <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
  <feBlend in="SourceGraphic" in2="mono" mode="multiply"/>
</filter>`;
  }
};

// SVG Shape Generators
const shapes = {
  blob: (options = {}) => {
    const { 
      points = 6, 
      radius = 50, 
      variance = 0.3,
      fill = '#3b82f6',
      cx = 100,
      cy = 100
    } = options;
    
    const angleStep = (Math.PI * 2) / points;
    let path = '';
    const pathPoints = [];
    
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const r = radius * (1 + (Math.random() - 0.5) * variance);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      pathPoints.push({ x, y });
    }
    
    // Create smooth curve through points
    path = `M ${pathPoints[0].x} ${pathPoints[0].y} `;
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const p0 = pathPoints[i];
      const p1 = pathPoints[(i + 1) % pathPoints.length];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      path += `Q ${p0.x} ${p0.y} ${midX} ${midY} `;
    }
    path += 'Z';
    
    return `<path d="${path}" fill="${fill}"/>`;
  },

  star: (options = {}) => {
    const {
      points = 5,
      outerRadius = 50,
      innerRadius = 25,
      fill = '#fbbf24',
      stroke = 'none',
      strokeWidth = 0,
      cx = 50,
      cy = 50
    } = options;
    
    let path = '';
    const angleStep = Math.PI / points;
    
    for (let i = 0; i < points * 2; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      path += (i === 0 ? 'M' : 'L') + ` ${x} ${y} `;
    }
    path += 'Z';
    
    return `<path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
  },

  heart: (options = {}) => {
    const { fill = '#ef4444', size = 100, cx = 50, cy = 50 } = options;
    const scale = size / 100;
    return `
<path transform="translate(${cx - 50 * scale}, ${cy - 45 * scale}) scale(${scale})" 
      d="M 50 90 
         C 20 60, 0 40, 0 25 
         C 0 10, 15 0, 30 0 
         C 40 0, 50 10, 50 20 
         C 50 10, 60 0, 70 0 
         C 85 0, 100 10, 100 25 
         C 100 40, 80 60, 50 90 Z" 
      fill="${fill}"/>`;
  },

  arrow: (options = {}) => {
    const {
      direction = 'right',
      size = 30,
      fill = '#000',
      cx = 50,
      cy = 50
    } = options;
    
    const rotations = { right: 0, down: 90, left: 180, up: 270 };
    const rotation = rotations[direction] || 0;
    
    return `
<g transform="translate(${cx}, ${cy}) rotate(${rotation})">
  <path d="M ${-size / 2} ${-size / 4} L ${size / 4} 0 L ${-size / 2} ${size / 4} L ${-size / 4} 0 Z" 
        fill="${fill}" transform="translate(${size / 4}, 0)"/>
</g>`;
  },

  wave: (options = {}) => {
    const {
      width = 200,
      height = 50,
      amplitude = 20,
      frequency = 2,
      fill = '#3b82f6',
      y = 100
    } = options;
    
    let path = `M 0 ${y + height} `;
    path += `L 0 ${y} `;
    
    for (let x = 0; x <= width; x += 5) {
      const waveY = y + Math.sin((x / width) * Math.PI * 2 * frequency) * amplitude;
      path += `L ${x} ${waveY} `;
    }
    
    path += `L ${width} ${y + height} Z`;
    
    return `<path d="${path}" fill="${fill}"/>`;
  }
};

// SVG Filter Effects
const filters = {
  glow: (options = {}) => {
    const { color = '#ffffff', intensity = 3, id = 'glow' } = options;
    return `
<filter id="${id}">
  <feGaussianBlur stdDeviation="${intensity}" result="coloredBlur"/>
  <feMerge>
    <feMergeNode in="coloredBlur"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>`;
  },

  dropShadow: (options = {}) => {
    const { dx = 2, dy = 2, blur = 4, color = 'rgba(0,0,0,0.3)', id = 'dropShadow' } = options;
    return `
<filter id="${id}">
  <feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${blur}" flood-color="${color}"/>
</filter>`;
  },

  blur: (options = {}) => {
    const { amount = 5, id = 'blur' } = options;
    return `
<filter id="${id}">
  <feGaussianBlur in="SourceGraphic" stdDeviation="${amount}"/>
</filter>`;
  },

  emboss: (options = {}) => {
    const { id = 'emboss' } = options;
    return `
<filter id="${id}">
  <feConvolveMatrix kernelMatrix="3 0 0 0 0 0 0 0 -3"/>
</filter>`;
  },

  duotone: (options = {}) => {
    const { color1 = '#000000', color2 = '#ffffff', id = 'duotone' } = options;
    return `
<filter id="${id}">
  <feColorMatrix type="matrix" values="
    0.33 0.33 0.33 0 0
    0.33 0.33 0.33 0 0
    0.33 0.33 0.33 0 0
    0    0    0    1 0"/>
  <feComponentTransfer>
    <feFuncR type="table" tableValues="0 1"/>
    <feFuncG type="table" tableValues="0 1"/>
    <feFuncB type="table" tableValues="0 1"/>
  </feComponentTransfer>
</filter>`;
  }
};

// SVG Gradient Generators
const gradients = {
  linear: (options = {}) => {
    const {
      id = 'linearGradient',
      colors = ['#3b82f6', '#8b5cf6'],
      angle = 0,
      stops = colors.map((c, i) => ({ offset: i / (colors.length - 1) * 100, color: c }))
    } = options;
    
    const rad = angle * Math.PI / 180;
    const x1 = 50 - Math.cos(rad) * 50;
    const y1 = 50 - Math.sin(rad) * 50;
    const x2 = 50 + Math.cos(rad) * 50;
    const y2 = 50 + Math.sin(rad) * 50;
    
    return `
<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
  ${stops.map(s => `<stop offset="${s.offset}%" stop-color="${s.color}"/>`).join('\n  ')}
</linearGradient>`;
  },

  radial: (options = {}) => {
    const {
      id = 'radialGradient',
      colors = ['#ffffff', '#3b82f6'],
      cx = 50,
      cy = 50,
      r = 50
    } = options;
    
    return `
<radialGradient id="${id}" cx="${cx}%" cy="${cy}%" r="${r}%">
  ${colors.map((c, i) => `<stop offset="${i / (colors.length - 1) * 100}%" stop-color="${c}"/>`).join('\n  ')}
</radialGradient>`;
  },

  mesh: (options = {}) => {
    const { colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96e6a1'] } = options;
    return `
<!-- Mesh gradient simulation with multiple radial gradients -->
<radialGradient id="mesh1" cx="0%" cy="0%" r="100%">
  <stop offset="0%" stop-color="${colors[0]}"/>
  <stop offset="100%" stop-color="transparent"/>
</radialGradient>
<radialGradient id="mesh2" cx="100%" cy="0%" r="100%">
  <stop offset="0%" stop-color="${colors[1]}"/>
  <stop offset="100%" stop-color="transparent"/>
</radialGradient>
<radialGradient id="mesh3" cx="0%" cy="100%" r="100%">
  <stop offset="0%" stop-color="${colors[2]}"/>
  <stop offset="100%" stop-color="transparent"/>
</radialGradient>
<radialGradient id="mesh4" cx="100%" cy="100%" r="100%">
  <stop offset="0%" stop-color="${colors[3]}"/>
  <stop offset="100%" stop-color="transparent"/>
</radialGradient>`;
  }
};

// Full SVG Generator
function generateSVG(options = {}) {
  const {
    width = 200,
    height = 200,
    viewBox = `0 0 ${width} ${height}`,
    background = 'transparent',
    elements = [],
    defs = []
  } = options;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
  <defs>
    ${defs.join('\n    ')}
  </defs>
  ${background !== 'transparent' ? `<rect width="100%" height="100%" fill="${background}"/>` : ''}
  ${elements.join('\n  ')}
</svg>`;
}

// Main
const args = process.argv.slice(2);
const command = args[0];

const help = `
SVG Generator - Create SVG graphics, patterns, and animations

Commands:
  pattern <name> [options]  - Generate SVG pattern
  shape <name> [options]    - Generate SVG shape
  filter <name> [options]   - Generate SVG filter
  gradient <name> [options] - Generate SVG gradient
  list                      - List all available generators

Patterns: ${Object.keys(patterns).join(', ')}
Shapes: ${Object.keys(shapes).join(', ')}
Filters: ${Object.keys(filters).join(', ')}
Gradients: ${Object.keys(gradients).join(', ')}

Example:
  node svg-generator.js pattern dots
  node svg-generator.js shape star
  node svg-generator.js filter glow
`;

if (!command || command === 'help') {
  console.log(help);
} else if (command === 'list') {
  console.log('\nAvailable Patterns:', Object.keys(patterns).join(', '));
  console.log('Available Shapes:', Object.keys(shapes).join(', '));
  console.log('Available Filters:', Object.keys(filters).join(', '));
  console.log('Available Gradients:', Object.keys(gradients).join(', '));
} else if (command === 'pattern' && patterns[args[1]]) {
  console.log(patterns[args[1]]());
} else if (command === 'shape' && shapes[args[1]]) {
  console.log(shapes[args[1]]());
} else if (command === 'filter' && filters[args[1]]) {
  console.log(filters[args[1]]());
} else if (command === 'gradient' && gradients[args[1]]) {
  console.log(gradients[args[1]]());
} else {
  console.log(`Unknown command or generator: ${args.join(' ')}`);
  console.log('Run "node svg-generator.js help" for usage');
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { patterns, shapes, filters, gradients, generateSVG };
}
