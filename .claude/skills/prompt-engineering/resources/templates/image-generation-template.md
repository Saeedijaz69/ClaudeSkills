# Image Generation Prompt Templates

## Universal Structure

```
[SUBJECT] + [MEDIUM/STYLE] + [COMPOSITION] + [LIGHTING] + [MOOD] + [DETAILS] + [TECHNICAL]
```

---

## Core Templates

### Portrait Photography

```markdown
# Portrait Prompt

[Subject description], [age/appearance], [expression], [pose],
[clothing/accessories], [setting/background],
[lighting type] lighting, [camera details],
[color grading], [mood/atmosphere],
[quality modifiers]

## Example:
"Professional headshot of a confident woman in her 30s, warm genuine smile, 
three-quarter view, wearing charcoal blazer with subtle texture, 
against soft gradient gray background, 
Rembrandt lighting with subtle fill, Canon 85mm f/1.4 lens,
shallow depth of field, warm color grading,
approachable yet authoritative mood,
high resolution, commercial photography quality"
```

### Landscape Photography

```markdown
# Landscape Prompt

[Location/Scene], [time of day], [weather/atmosphere],
[foreground elements], [middle ground], [background],
[lighting conditions], [color palette],
[style reference], [quality modifiers]

## Example:
"Majestic alpine valley in the Swiss Alps at golden hour,
wispy clouds catching orange and pink light,
wildflower meadow in foreground with morning dew,
winding stream in middle ground reflecting sky,
snow-capped mountain peaks in background,
dramatic side lighting with volumetric god rays,
rich earth tones with vibrant sky contrast,
National Geographic style,
8K resolution, highly detailed, photorealistic"
```

### Product Photography

```markdown
# Product Prompt

[Product type and details], [material/finish],
[positioning/angle], [surface/setting],
[lighting setup], [background],
[style], [quality modifiers]

## Example:
"Luxury perfume bottle with faceted crystal design,
rose gold metallic cap, clear amber liquid visible,
45-degree angle hero shot, floating slightly above surface,
white marble pedestal with subtle veining,
three-point studio lighting with soft key and rim light,
clean white infinity background,
high-end advertising style,
sharp focus, photorealistic render, 8K"
```

### Digital Art / Illustration

```markdown
# Digital Art Prompt

[Subject], [art style], [color palette],
[composition], [mood/atmosphere],
[details/texture], [artist reference if applicable],
[quality modifiers]

## Example:
"Cyberpunk street vendor selling noodles from a hovering cart,
neon-lit rain-soaked alley, steam rising from pots,
digital painting style with visible brushstrokes,
vibrant neon pink, cyan, and purple against dark backgrounds,
Dutch angle composition with dramatic perspective,
moody noir atmosphere with optimistic undertones,
intricate mechanical details on the cart,
in the style of Syd Mead meets anime,
highly detailed, 4K, trending on ArtStation"
```

### Concept Art

```markdown
# Concept Art Prompt

[Subject type: character/environment/prop],
[design direction], [function/purpose],
[visual style], [material language],
[mood board references], [presentation style],
[quality modifiers]

## Example:
"Sci-fi exploration vehicle concept, 
modular all-terrain rover designed for alien planet surveys,
sleek but rugged aesthetic, orange and white color scheme,
visible wear and realistic weathering,
inspired by NASA designs meets Apple industrial design,
matte painting environment in background showing usage context,
orthographic views with detail callouts,
concept art presentation style,
professional quality, trending on ArtStation"
```

---

## Style Modifiers Library

### Art Styles
```
- Photorealistic
- Hyperrealistic
- Oil painting
- Watercolor
- Digital painting
- Vector art
- Pixel art
- Anime/Manga
- Comic book
- Art Nouveau
- Art Deco
- Impressionist
- Surrealist
- Minimalist
- Abstract
- Low poly
- Isometric
```

### Photography Styles
```
- Studio photography
- Street photography
- Fashion photography
- Documentary
- Editorial
- Commercial
- Fine art photography
- Cinematic
- Film noir
- High key
- Low key
- HDR
- Long exposure
- Macro
- Aerial/Drone
```

### Lighting Terms
```
- Natural light
- Golden hour
- Blue hour
- Overcast
- Studio lighting
- Rembrandt lighting
- Butterfly lighting
- Split lighting
- Rim lighting
- Backlighting
- Volumetric lighting
- God rays
- Neon lighting
- Candlelight
- Bioluminescent
```

### Camera/Lens Terms
```
- Wide angle (14-35mm)
- Normal (35-50mm)
- Portrait (85-135mm)
- Telephoto (200mm+)
- Macro lens
- Fisheye
- Tilt-shift
- Shallow depth of field
- Deep depth of field
- Bokeh
- Motion blur
- Long exposure
```

### Quality Modifiers
```
- 8K resolution
- Ultra detailed
- Highly detailed
- Photorealistic
- Sharp focus
- Professional
- Award-winning
- Trending on ArtStation
- Unreal Engine render
- Octane render
- Ray tracing
- Cinematic
```

### Mood/Atmosphere
```
- Serene
- Dramatic
- Mysterious
- Ethereal
- Melancholic
- Joyful
- Tense
- Peaceful
- Epic
- Intimate
- Nostalgic
- Futuristic
- Dystopian
- Utopian
```

---

## Platform-Specific Tips

### Midjourney

```markdown
## Structure
/imagine prompt: [description] --parameter value

## Key Parameters
--ar 16:9       # Aspect ratio
--v 6           # Version
--style raw     # Less stylized
--stylize 100   # Stylization amount (0-1000)
--chaos 50      # Variation (0-100)
--no [thing]    # Negative prompt
--seed 12345    # Reproducibility

## Example
/imagine prompt: ethereal forest spirit emerging from ancient oak tree, 
bioluminescent particles, mystical atmosphere, fantasy art style, 
highly detailed, dramatic lighting --ar 16:9 --v 6 --stylize 750
```

### DALL-E

```markdown
## Tips
- Be descriptive but concise
- Specify art style explicitly
- Include composition details
- Mention color palette
- Quality terms less necessary (handled internally)

## Example
"A cozy coffee shop interior at dusk, warm Edison bulb lighting, 
exposed brick walls, vintage wooden furniture, steam rising from 
ceramic cups, watercolor painting style with soft edges"
```

### Stable Diffusion

```markdown
## Structure
[Positive prompt]
Negative prompt: [things to avoid]

## Example
Positive: "Beautiful Japanese garden in autumn, red maple trees, 
koi pond with stone bridge, traditional architecture, 
morning mist, golden sunlight, highly detailed, 
8K, photorealistic, trending on artstation"

Negative: "blurry, low quality, distorted, ugly, 
bad anatomy, watermark, text, logo"

## Parameters
Steps: 30-50
CFG Scale: 7-12
Sampler: DPM++ 2M Karras
```

---

## Negative Prompt Library

### General Quality
```
blurry, low quality, low resolution, pixelated, 
compressed, artifacts, noise, grainy, 
out of focus, poorly drawn, amateur
```

### Anatomy/People
```
bad anatomy, deformed, disfigured, 
extra limbs, missing limbs, mutated,
bad proportions, clone, duplicate,
ugly, gross, malformed
```

### Composition
```
cropped, cut off, out of frame,
bad framing, poorly composed,
cluttered, messy, disorganized
```

### Style Issues
```
oversaturated, undersaturated,
overexposed, underexposed,
flat lighting, harsh shadows,
unrealistic, cartoonish (when not wanted)
```

### Unwanted Elements
```
watermark, signature, text, logo,
border, frame, username,
stock photo, shutterstock
```

---

## Tips for Better Results

1. **Be Specific** - "elderly woman with silver hair" > "old woman"
2. **Use Visual Language** - Describe what you SEE, not concepts
3. **Layer Details** - Subject → Style → Lighting → Mood → Technical
4. **Reference Artists** - "in the style of [artist]" when appropriate
5. **Iterate** - Start simple, add complexity
6. **Use Negative Prompts** - Exclude unwanted elements
7. **Experiment with Parameters** - Adjust stylization, chaos, etc.
8. **Save Successful Prompts** - Build a personal library
