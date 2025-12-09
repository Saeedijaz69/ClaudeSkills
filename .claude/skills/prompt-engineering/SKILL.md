---
name: prompt-engineering
description: Generate ultra-detailed, high-quality prompts with precision and best practices. Use when creating prompts for AI systems, image generation, code tasks, or any scenario requiring optimized AI interactions.
version: 1.0.0
---

# Prompt Engineering Skill

This skill enables the creation of exceptionally crafted prompts that maximize AI effectiveness. Whether for text generation, image creation, code assistance, or complex reasoning tasks, this skill applies systematic techniques to produce precise, effective prompts.

## Prompt Engineering Philosophy

### Core Principles

1. **Clarity** - Unambiguous language with precise intent
2. **Specificity** - Detailed requirements, not vague requests
3. **Structure** - Organized information hierarchy
4. **Context** - Sufficient background for understanding
5. **Constraints** - Clear boundaries and limitations
6. **Examples** - Concrete demonstrations when helpful

### The Perfect Prompt Formula

```
PROMPT = Context + Role + Task + Format + Constraints + Examples
```

## Prompt Architecture Framework

### Level 1: Basic Prompt Structure

```markdown
[CONTEXT]
Background information that sets the scene

[TASK]
Clear description of what you want

[FORMAT]
How the output should be structured

[CONSTRAINTS]
Limitations, requirements, things to avoid
```

### Level 2: Enhanced Prompt Structure

```markdown
# Role Definition
You are a [specific role] with expertise in [domains].

# Context
[Background information]
[Current situation]
[Relevant details]

# Task
[Primary objective]
[Secondary objectives if any]

# Requirements
- Requirement 1
- Requirement 2
- Requirement 3

# Output Format
[Specific structure expected]

# Constraints
- Must: [requirements]
- Must Not: [restrictions]
- Prefer: [preferences]

# Examples (if applicable)
Input: [example input]
Output: [example output]
```

### Level 3: Advanced Prompt Structure

```markdown
<system>
You are an expert [role] with deep knowledge in [specific domains].
Your communication style is [style description].
You always [key behaviors].
</system>

<context>
## Background
[Comprehensive context]

## Current State
[What exists now]

## Goal State
[What we want to achieve]

## Constraints
[Technical/business constraints]
</context>

<task>
## Primary Objective
[Main goal with success criteria]

## Sub-tasks
1. [Sub-task 1]
2. [Sub-task 2]
3. [Sub-task 3]

## Priority
[What matters most]
</task>

<format>
## Structure
[Output organization]

## Style
[Tone, voice, formatting]

## Length
[Expected length/depth]
</format>

<examples>
### Example 1
**Input:** [input]
**Output:** [output]
**Explanation:** [why this is good]

### Example 2
**Input:** [input]
**Output:** [output]
</examples>

<validation>
## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Quality Checks
- [ ] Check 1
- [ ] Check 2
</validation>
```

## Prompt Types & Templates

### 1. Instruction Prompts

**Purpose:** Direct task execution

```markdown
# Task: [Task Name]

## Objective
[What needs to be done]

## Instructions
1. First, [step 1]
2. Then, [step 2]
3. Finally, [step 3]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Output
[Expected output format]
```

### 2. Analysis Prompts

**Purpose:** Deep examination of topics

```markdown
# Analysis Request: [Topic]

## Context
[Background on the subject]

## Analysis Framework
Analyze using the following dimensions:
1. [Dimension 1]: [What to examine]
2. [Dimension 2]: [What to examine]
3. [Dimension 3]: [What to examine]

## Depth Requirements
- Surface level: [brief overview needs]
- Deep dive: [detailed analysis needs]

## Output Structure
1. Executive Summary
2. Detailed Analysis by Dimension
3. Key Findings
4. Recommendations
```

### 3. Creative Prompts

**Purpose:** Generating creative content

```markdown
# Creative Brief: [Project Name]

## Vision
[Overall creative direction]

## Tone & Style
- Tone: [emotional quality]
- Voice: [personality]
- Style: [aesthetic approach]

## Audience
[Who this is for]

## Key Messages
1. [Primary message]
2. [Secondary message]

## Requirements
- Must include: [elements]
- Must avoid: [elements]
- Inspiration: [references]

## Format
[Output specifications]
```

### 4. Code Generation Prompts

**Purpose:** Generating high-quality code

```markdown
# Code Request: [Feature/Function Name]

## Context
- Language: [programming language]
- Framework: [if applicable]
- Environment: [runtime environment]
- Existing Code Context: [relevant code snippets]

## Requirements
### Functional
- [What it should do]

### Non-Functional
- Performance: [requirements]
- Security: [requirements]
- Maintainability: [requirements]

## Interface
### Input
```[language]
[input specification]
```

### Output
```[language]
[output specification]
```

## Constraints
- Must use: [required approaches/libraries]
- Must avoid: [anti-patterns/forbidden approaches]

## Examples
### Example 1
Input: [input]
Expected Output: [output]

## Quality Requirements
- [ ] Include error handling
- [ ] Add appropriate comments
- [ ] Follow [style guide]
- [ ] Include type annotations
```

### 5. Reasoning Prompts

**Purpose:** Complex problem-solving

```markdown
# Problem: [Problem Statement]

## Context
[Background and constraints]

## Approach
Please solve this step-by-step:

1. **Understand**: First, restate the problem in your own words
2. **Analyze**: Identify the key components and relationships
3. **Plan**: Outline your approach before solving
4. **Execute**: Work through the solution methodically
5. **Verify**: Check your work and validate the answer

## Constraints
- [Constraint 1]
- [Constraint 2]

## Show Your Work
Please explain each step of your reasoning.
```

### 6. Image Generation Prompts

**Purpose:** AI image generation (Midjourney, DALL-E, Stable Diffusion)

```markdown
# Image Prompt Structure

[Subject] + [Style] + [Composition] + [Lighting] + [Mood] + [Technical Parameters]

## Components

### Subject (Who/What)
- Main subject with specific details
- Pose, expression, action
- Clothing, accessories if applicable

### Style
- Art style: photorealistic, illustration, oil painting, watercolor
- Artist reference: "in the style of [artist]"
- Era: vintage, modern, futuristic

### Composition
- Camera angle: low angle, bird's eye, eye level
- Shot type: close-up, medium shot, wide shot
- Framing: rule of thirds, centered, golden ratio

### Lighting
- Type: natural, studio, dramatic, soft
- Direction: backlit, side lit, front lit
- Quality: harsh, diffused, volumetric

### Mood/Atmosphere
- Emotional tone: serene, dramatic, mysterious
- Color palette: warm, cool, vibrant, muted
- Time of day: golden hour, blue hour, midday

### Technical
- Quality: 8k, highly detailed, photorealistic
- Render: octane render, unreal engine, ray tracing
- Aspect ratio: --ar 16:9, --ar 1:1

## Example Prompts

### Portrait
"Professional headshot of a confident businesswoman, 30s, natural smile, wearing navy blazer, soft studio lighting, shallow depth of field, Canon 85mm f/1.4, warm color grading, corporate but approachable"

### Landscape
"Majestic mountain valley at golden hour, alpine meadow with wildflowers in foreground, snow-capped peaks in background, dramatic clouds, volumetric god rays, National Geographic style, 8k, highly detailed"

### Product
"Minimalist product photography of luxury perfume bottle, white marble surface, soft shadows, elegant composition, high-end advertising style, clean background, professional studio lighting"
```

## Advanced Techniques

### Chain of Thought (CoT)

```markdown
Let's approach this step-by-step:

1. First, I'll [initial analysis]
2. Then, I'll consider [relevant factors]
3. Next, I'll [process/calculate]
4. Finally, I'll [conclude/recommend]

Please show your reasoning at each step.
```

### Few-Shot Learning

```markdown
Here are examples of the task:

Example 1:
Input: [input1]
Output: [output1]

Example 2:
Input: [input2]
Output: [output2]

Example 3:
Input: [input3]
Output: [output3]

Now, apply the same pattern to:
Input: [new input]
```

### Role Prompting

```markdown
You are [specific expert role] with [years] of experience in [domain].

Your expertise includes:
- [Skill 1]
- [Skill 2]
- [Skill 3]

Your communication style is [characteristics].

When answering, you always [behaviors].
```

### Constraint Prompting

```markdown
## Hard Constraints (Must Follow)
- Maximum [X] words/characters
- Must include [elements]
- Format must be [specification]

## Soft Constraints (Prefer)
- Aim for [preference]
- When possible, [approach]

## Anti-Constraints (Must Avoid)
- Never [prohibited action]
- Do not include [forbidden elements]
- Avoid [undesired patterns]
```

### Self-Consistency

```markdown
Generate [N] different approaches to this problem.
For each approach:
1. Explain the methodology
2. Apply the approach
3. Evaluate the result

Then, synthesize the most reliable answer based on consistency across approaches.
```

### Meta-Prompting

```markdown
Before answering, please:
1. Identify what type of task this is
2. Consider what approach would be most effective
3. Note any ambiguities that need clarification
4. Then proceed with your response

If the request is unclear, ask clarifying questions before proceeding.
```

## Prompt Optimization Checklist

### Before Writing
- [ ] Clearly understand the goal
- [ ] Identify the target AI system
- [ ] Determine required specificity level
- [ ] Gather necessary context/examples

### While Writing
- [ ] Use clear, unambiguous language
- [ ] Structure information logically
- [ ] Include relevant context
- [ ] Specify format requirements
- [ ] Add constraints and boundaries
- [ ] Include examples if helpful

### After Writing
- [ ] Remove unnecessary words
- [ ] Check for ambiguities
- [ ] Verify completeness
- [ ] Test with variations
- [ ] Iterate based on results

## Common Prompt Patterns

### The Persona Pattern
```
Act as a [role] who [characteristics]. 
[Task description]
```

### The Template Pattern
```
I will provide [input type]. 
For each [input], generate [output] in this format:
[Template structure]
```

### The Reflection Pattern
```
[Task]
After completing, review your output:
- Does it meet all requirements?
- What could be improved?
- Rate confidence: [low/medium/high]
```

### The Refinement Pattern
```
Generate an initial [output type].
Then improve it by:
1. [Improvement criterion 1]
2. [Improvement criterion 2]
3. [Improvement criterion 3]
```

## Quality Indicators

### Signs of a Good Prompt
- Single, clear objective
- Appropriate level of detail
- Relevant context included
- Format clearly specified
- Constraints explicitly stated
- Examples when beneficial

### Signs of a Poor Prompt
- Vague or ambiguous language
- Missing context
- No format specification
- Conflicting requirements
- Too broad or too narrow
- Assumes AI knowledge

## Prompt Templates Library

See `resources/templates/` for ready-to-use prompt templates:
- `analysis-template.md`
- `code-generation-template.md`
- `creative-writing-template.md`
- `image-generation-template.md`
- `reasoning-template.md`

---

**Remember:** The best prompt is one that produces the desired output consistently. Iterate, test, and refine until you achieve reliable results.
