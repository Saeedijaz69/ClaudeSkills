#!/usr/bin/env node

/**
 * Particle System Generator
 * Generates particle animation code for various effects
 */

const effects = {
  confetti: {
    name: 'Confetti',
    description: 'Celebration confetti particles',
    config: {
      count: 150,
      gravity: 0.5,
      drag: 0.02,
      colors: ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1'],
      shapes: ['square', 'rectangle'],
      spread: 360,
      startVelocity: 30,
      decay: 0.95,
      scalar: 1
    }
  },
  snow: {
    name: 'Snow',
    description: 'Falling snowflakes',
    config: {
      count: 100,
      gravity: 0.3,
      wind: 0.5,
      colors: ['#ffffff', '#f0f8ff', '#e6f3ff'],
      size: { min: 2, max: 6 },
      opacity: { min: 0.3, max: 0.8 },
      sway: 2
    }
  },
  fireflies: {
    name: 'Fireflies',
    description: 'Glowing firefly particles',
    config: {
      count: 30,
      colors: ['#ffff00', '#ffd700', '#ffcc00'],
      glowIntensity: 20,
      size: { min: 2, max: 4 },
      speed: 0.5,
      blinkRate: 2
    }
  },
  stars: {
    name: 'Stars',
    description: 'Twinkling star field',
    config: {
      count: 200,
      colors: ['#ffffff', '#ffffd4', '#add8e6'],
      size: { min: 1, max: 3 },
      twinkleSpeed: 3,
      depth: true
    }
  },
  bubbles: {
    name: 'Bubbles',
    description: 'Rising bubble particles',
    config: {
      count: 50,
      colors: ['rgba(255,255,255,0.3)', 'rgba(173,216,230,0.3)'],
      size: { min: 10, max: 40 },
      riseSpeed: 2,
      wobble: 1.5
    }
  },
  smoke: {
    name: 'Smoke',
    description: 'Drifting smoke effect',
    config: {
      count: 30,
      colors: ['rgba(100,100,100,0.3)', 'rgba(150,150,150,0.2)'],
      size: { min: 20, max: 60 },
      expandRate: 1.02,
      drift: 0.5
    }
  },
  sparks: {
    name: 'Sparks',
    description: 'Flying spark particles',
    config: {
      count: 80,
      colors: ['#ff6b00', '#ff8c00', '#ffa500', '#ffcc00'],
      size: { min: 1, max: 3 },
      velocity: 8,
      gravity: 0.3,
      fadeRate: 0.02
    }
  }
};

function generateParticleClass(effect) {
  const config = effects[effect].config;
  
  return `
class ${effects[effect].name}Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = ${effect === 'bubbles' ? 'this.canvas.height + 50' : effect === 'snow' ? '-10' : 'Math.random() * this.canvas.height'};
    this.size = ${config.size ? `${config.size.min} + Math.random() * ${config.size.max - config.size.min}` : '3'};
    this.color = ${JSON.stringify(config.colors)}[Math.floor(Math.random() * ${config.colors.length})];
    this.vx = ${effect === 'snow' ? `(Math.random() - 0.5) * ${config.wind}` : effect === 'sparks' ? `(Math.random() - 0.5) * ${config.velocity}` : '0'};
    this.vy = ${effect === 'bubbles' ? `-${config.riseSpeed} - Math.random()` : effect === 'snow' ? `${config.gravity} + Math.random()` : effect === 'sparks' ? `-(Math.random() * ${config.velocity})` : '0'};
    this.opacity = ${config.opacity ? `${config.opacity.min} + Math.random() * ${config.opacity.max - config.opacity.min}` : '1'};
    this.life = 1;
    ${effect === 'fireflies' ? 'this.phase = Math.random() * Math.PI * 2;' : ''}
    ${effect === 'stars' ? 'this.twinkleOffset = Math.random() * Math.PI * 2;' : ''}
  }

  update(deltaTime) {
    ${generateUpdateLogic(effect, config)}
  }

  draw(ctx) {
    ctx.save();
    ${generateDrawLogic(effect, config)}
    ctx.restore();
  }
}`;
}

function generateUpdateLogic(effect, config) {
  switch (effect) {
    case 'confetti':
      return `
    this.vy += ${config.gravity} * 0.1;
    this.vx *= ${config.decay};
    this.vy *= ${config.decay};
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    
    if (this.y > this.canvas.height + 20) {
      this.reset();
    }`;
    
    case 'snow':
      return `
    this.x += this.vx + Math.sin(this.y * 0.01) * ${config.sway};
    this.y += this.vy;
    
    if (this.y > this.canvas.height + 10) {
      this.reset();
      this.y = -10;
    }
    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;`;
    
    case 'fireflies':
      return `
    this.phase += 0.05;
    this.x += Math.sin(this.phase) * ${config.speed};
    this.y += Math.cos(this.phase * 0.7) * ${config.speed};
    this.opacity = 0.3 + Math.abs(Math.sin(this.phase * ${config.blinkRate})) * 0.7;
    
    // Keep within bounds
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;`;
    
    case 'stars':
      return `
    this.twinkleOffset += 0.02;
    this.opacity = 0.5 + Math.sin(this.twinkleOffset * ${config.twinkleSpeed}) * 0.5;`;
    
    case 'bubbles':
      return `
    this.y += this.vy;
    this.x += Math.sin(this.y * 0.02) * ${config.wobble};
    this.size *= 0.999; // Slight shrink
    
    if (this.y < -this.size * 2) {
      this.reset();
    }`;
    
    case 'smoke':
      return `
    this.y -= ${config.drift};
    this.x += (Math.random() - 0.5) * 0.5;
    this.size *= ${config.expandRate};
    this.opacity *= 0.995;
    
    if (this.opacity < 0.01) {
      this.reset();
    }`;
    
    case 'sparks':
      return `
    this.vy += ${config.gravity};
    this.x += this.vx;
    this.y += this.vy;
    this.life -= ${config.fadeRate};
    
    if (this.life <= 0 || this.y > this.canvas.height) {
      this.reset();
      this.life = 1;
    }`;
    
    default:
      return '';
  }
}

function generateDrawLogic(effect, config) {
  switch (effect) {
    case 'confetti':
      return `
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);`;
    
    case 'snow':
      return `
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();`;
    
    case 'fireflies':
      return `
    ctx.globalAlpha = this.opacity;
    
    // Glow effect
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * ${config.glowIntensity / 4});
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * ${config.glowIntensity / 4}, 0, Math.PI * 2);
    ctx.fill();
    
    // Core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();`;
    
    case 'stars':
      return `
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();`;
    
    case 'bubbles':
      return `
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
    
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
    ctx.fill();`;
    
    case 'smoke':
      return `
    ctx.globalAlpha = this.opacity;
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();`;
    
    case 'sparks':
      return `
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();`;
    
    default:
      return '';
  }
}

function generateParticleSystem(effect) {
  const config = effects[effect].config;
  
  return `
/**
 * ${effects[effect].name} Particle System
 * ${effects[effect].description}
 * 
 * Generated by Creative Design Skill
 */

${generateParticleClass(effect)}

class ${effects[effect].name}System {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < ${config.count}; i++) {
      this.particles.push(new ${effects[effect].name}Particle(this.canvas));
    }
  }

  update(deltaTime) {
    this.particles.forEach(p => p.update(deltaTime));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => p.draw(this.ctx));
  }

  animate() {
    let lastTime = 0;
    
    const loop = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      this.update(deltaTime);
      this.draw();
      
      this.animationId = requestAnimationFrame(loop);
    };
    
    this.animationId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Emit particles at a specific point (for interactive effects)
  emit(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const particle = new ${effects[effect].name}Particle(this.canvas);
      particle.x = x;
      particle.y = y;
      this.particles.push(particle);
    }
  }
}

// Usage:
// const system = new ${effects[effect].name}System('canvas-id');
// system.animate();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ${effects[effect].name}System, ${effects[effect].name}Particle };
}
`;
}

// Main
const args = process.argv.slice(2);
const effect = args[0] || 'all';

if (effect === 'list') {
  console.log('\nAvailable Particle Effects:\n');
  Object.entries(effects).forEach(([key, value]) => {
    console.log(`  ${key.padEnd(12)} - ${value.description}`);
  });
  console.log('\nUsage: node generate-particles.js <effect-name>');
  console.log('       node generate-particles.js all');
} else if (effect === 'all') {
  console.log('// All Particle Systems');
  console.log('// Generated by Creative Design Skill\n');
  Object.keys(effects).forEach(key => {
    console.log(generateParticleSystem(key));
    console.log('\n// ' + '='.repeat(60) + '\n');
  });
} else if (effects[effect]) {
  console.log(generateParticleSystem(effect));
} else {
  console.log(`Unknown effect: ${effect}`);
  console.log('Run "node generate-particles.js list" to see available effects');
}
