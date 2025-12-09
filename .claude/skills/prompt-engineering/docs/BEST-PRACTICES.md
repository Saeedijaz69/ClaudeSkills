# Prompt Engineering Best Practices

## The Golden Rules

### 1. Be Specific, Not Vague

**Bad:** "Write something about marketing"

**Good:** "Write a 500-word blog post explaining three inbound marketing strategies for B2B SaaS companies, targeting marketing managers, with a professional but approachable tone"

### 2. Provide Context

**Bad:** "Fix this code"

**Good:** "This Python function should calculate compound interest, but it's returning incorrect values for periods over 10 years. Here's the current code and expected vs actual outputs..."

### 3. Define the Output Format

**Bad:** "List some ideas"

**Good:** "Provide 5 ideas in a numbered list. For each idea, include: a) A one-line summary, b) Key benefits (2-3 bullet points), c) Potential challenges"

### 4. Use Examples (Few-Shot Learning)

**Bad:** "Categorize these products"

**Good:** 
```
Categorize products into Electronics, Clothing, or Home.

Examples:
- iPhone 15 → Electronics
- Wool sweater → Clothing  
- Throw pillow → Home

Now categorize:
- Samsung TV
- Running shoes
- Coffee maker
```

### 5. Set Constraints Explicitly

**Bad:** "Make it good"

**Good:** "Keep response under 200 words. Use simple language (8th grade reading level). Include one relevant statistic. Avoid jargon."

---

## Prompt Structure Framework

### The CRISP Framework

**C** - Context: Background and situation
**R** - Role: Who/what the AI should act as
**I** - Instructions: What to do (step by step)
**S** - Specifics: Details, constraints, format
**P** - Proof: Examples of desired output

```markdown
# CRISP Example

**Context:** We're launching a new project management tool for remote teams.

**Role:** You are a senior product marketing manager with 10 years of B2B SaaS experience.

**Instructions:** 
1. Identify the top 3 pain points for remote teams
2. Map each pain point to a feature of our tool
3. Write compelling value propositions for each

**Specifics:**
- Target audience: Engineering managers at companies with 50-200 employees
- Tone: Professional, empathetic, solution-focused
- Length: 50-75 words per value proposition
- Format: Use headers and bullet points

**Proof/Example:**
Pain Point: Unclear task ownership
Feature: Smart assignment with AI
Value Prop: "Never wonder who's handling what. Our AI automatically assigns tasks based on expertise and availability, ensuring every project has clear owners and deadlines."
```

---

## Common Mistakes to Avoid

### 1. Ambiguous Language

| Avoid | Use Instead |
|-------|-------------|
| "Make it better" | "Improve clarity by simplifying sentences to 15 words max" |
| "Be creative" | "Generate 5 unconventional solutions, one must be humorous" |
| "Soon" | "Within the next 2 weeks" |
| "Good quality" | "Meets these criteria: [list specific criteria]" |

### 2. Information Overload

**Problem:** Cramming too much into one prompt

**Solution:** Break complex tasks into steps
```markdown
Step 1: "First, analyze this dataset and identify the top 3 trends"
Step 2: "Based on your analysis, suggest strategies to address trend #1"
Step 3: "Now create an implementation plan for the recommended strategy"
```

### 3. Assuming Knowledge

**Problem:** "Use the standard format"

**Solution:** Provide the format explicitly
```markdown
Use this format:
## Title
**Summary:** [1-2 sentences]
**Details:** [3-5 bullet points]
**Next Steps:** [numbered list]
```

### 4. No Success Criteria

**Problem:** No way to evaluate output quality

**Solution:** Define what "good" looks like
```markdown
Success criteria:
- Addresses all 3 questions
- Includes at least 2 data points per section
- No technical jargon (explain any necessary terms)
- Actionable recommendations with specific next steps
```

---

## Advanced Techniques

### Chain of Thought (CoT)

Force step-by-step reasoning:

```markdown
Let's solve this step-by-step:

1. First, identify all the given information
2. Then, determine what we need to find
3. Next, choose the appropriate method
4. Finally, apply the method and verify the result

Show your reasoning at each step.
```

### Self-Consistency

Generate multiple solutions and compare:

```markdown
Generate 3 different approaches to solve this problem.
For each approach:
- Explain the methodology
- Apply it to get an answer
- Rate your confidence (1-10)

Then, compare the approaches and provide the most reliable answer.
```

### Reflection

Add self-evaluation:

```markdown
After completing your response:
1. Review for any errors or inconsistencies
2. Check that all requirements are met
3. Note any assumptions you made
4. Rate your confidence in the response
5. Suggest what additional information would improve your answer
```

### Tree of Thoughts

Explore multiple paths:

```markdown
Consider 3 different perspectives on this problem:

Perspective 1: [Approach A]
- Analyze from this angle
- Identify pros/cons
- Rate viability

Perspective 2: [Approach B]
- Analyze from this angle
- Identify pros/cons
- Rate viability

Perspective 3: [Approach C]
- Analyze from this angle
- Identify pros/cons
- Rate viability

Synthesize the best elements from each perspective.
```

---

## Testing Your Prompts

### Evaluation Checklist

- [ ] Does it produce consistent results across multiple runs?
- [ ] Does output meet all specified requirements?
- [ ] Is the format correct?
- [ ] Are edge cases handled?
- [ ] Is the quality acceptable?
- [ ] Is the response length appropriate?

### A/B Testing Prompts

```markdown
Version A: [Original prompt]
Version B: [Modified prompt with change X]

Run both 5 times, evaluate:
- Consistency (1-5)
- Quality (1-5)
- Relevance (1-5)
- Format compliance (pass/fail)
```

### Iteration Process

1. **Start Simple** - Basic prompt with core task
2. **Test** - Run and evaluate output
3. **Identify Gaps** - What's missing or wrong?
4. **Add Specificity** - Address gaps with clearer instructions
5. **Test Again** - Verify improvement
6. **Repeat** - Until satisfactory

---

## Prompt Templates by Use Case

### Analysis
```
Analyze [topic] from [perspective].
Consider: [factors]
Present findings as: [format]
Include: [specific elements]
```

### Creation
```
Create a [type] that [purpose].
For audience: [who]
Tone: [how]
Length: [constraints]
Must include: [elements]
```

### Problem-Solving
```
Problem: [description]
Context: [background]
Constraints: [limitations]
Goal: [desired outcome]
Provide: [solution format]
```

### Comparison
```
Compare [A] and [B] on:
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

Present as: [table/prose/bullets]
Conclude with: [recommendation/summary]
```

### Transformation
```
Transform this [input type]:
[input]

Into [output type] that:
- [Requirement 1]
- [Requirement 2]

Maintain: [what to preserve]
Change: [what to modify]
```

---

## Quick Reference Card

### Must-Haves
1. Clear task statement
2. Relevant context
3. Output format
4. Constraints

### Nice-to-Haves
1. Examples
2. Role definition
3. Success criteria
4. Edge case handling

### Power-Ups
1. Chain of thought
2. Self-reflection
3. Multiple perspectives
4. Iterative refinement
