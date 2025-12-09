# Analysis Prompt Template

## Quick Use Template

```markdown
# Analysis: [Topic/Subject]

## Context
[Provide background information, current situation, and why this analysis matters]

## Scope
Analyze the following aspects:
1. [Aspect 1]
2. [Aspect 2]
3. [Aspect 3]
4. [Aspect 4]

## Analysis Framework
For each aspect, provide:
- Current State: [What exists now]
- Key Findings: [Important observations]
- Implications: [What this means]
- Recommendations: [Suggested actions]

## Constraints
- Focus on: [specific areas]
- Time frame: [relevant period]
- Perspective: [stakeholder view]

## Output Format
1. Executive Summary (2-3 sentences)
2. Detailed Analysis by Aspect
3. Key Insights (top 3-5)
4. Recommendations (prioritized)
5. Next Steps

## Depth
[Surface/Moderate/Deep] analysis required
```

---

## Specialized Analysis Templates

### Competitive Analysis

```markdown
# Competitive Analysis: [Company/Product]

## Context
We need to understand [company/product]'s competitive position in the [market/industry].

## Competitors to Analyze
1. [Competitor 1]
2. [Competitor 2]
3. [Competitor 3]

## Analysis Dimensions
For each competitor, analyze:

### Market Position
- Market share
- Brand positioning
- Target segments

### Product/Service
- Core offerings
- Unique features
- Pricing strategy

### Strengths & Weaknesses
- Key advantages
- Notable gaps
- Opportunities to exploit

### Strategy
- Go-to-market approach
- Growth trajectory
- Recent moves

## Output Format
| Dimension | [Competitor 1] | [Competitor 2] | [Competitor 3] | Our Position |
|-----------|----------------|----------------|----------------|--------------|
| ...       | ...            | ...            | ...            | ...          |

## Deliverables
1. Competitive landscape overview
2. Detailed competitor profiles
3. Competitive advantages/gaps matrix
4. Strategic recommendations
```

### SWOT Analysis

```markdown
# SWOT Analysis: [Subject]

## Context
[Background and purpose of this analysis]

## Analysis Framework

### Strengths (Internal, Positive)
What advantages does [subject] have?
- Resources
- Capabilities
- Competitive advantages
- Unique assets

### Weaknesses (Internal, Negative)
What could be improved?
- Resource gaps
- Capability limitations
- Competitive disadvantages
- Areas needing development

### Opportunities (External, Positive)
What favorable external factors exist?
- Market trends
- Technological changes
- Regulatory shifts
- Partnership possibilities

### Threats (External, Negative)
What external challenges exist?
- Competitive threats
- Market changes
- Economic factors
- Regulatory risks

## Output Format
```
         | Positive      | Negative
---------|---------------|------------
Internal | Strengths     | Weaknesses
External | Opportunities | Threats
```

## Strategic Implications
Based on this SWOT, identify:
1. SO Strategies (use Strengths to capture Opportunities)
2. WO Strategies (overcome Weaknesses via Opportunities)
3. ST Strategies (use Strengths to mitigate Threats)
4. WT Strategies (minimize Weaknesses to avoid Threats)
```

### Root Cause Analysis

```markdown
# Root Cause Analysis: [Problem Statement]

## Problem Definition
[Clear, specific description of the problem]

### Symptoms
- [Observable symptom 1]
- [Observable symptom 2]
- [Observable symptom 3]

### Impact
- Business impact: [description]
- Customer impact: [description]
- Operational impact: [description]

## Analysis Method: 5 Whys

Starting with the problem, ask "Why?" five times:

1. Why did [problem] occur?
   → [Answer 1]

2. Why did [Answer 1] happen?
   → [Answer 2]

3. Why did [Answer 2] happen?
   → [Answer 3]

4. Why did [Answer 3] happen?
   → [Answer 4]

5. Why did [Answer 4] happen?
   → [Root Cause]

## Contributing Factors
- People: [human factors]
- Process: [procedural factors]
- Technology: [technical factors]
- Environment: [contextual factors]

## Output
1. Root Cause Statement
2. Contributing Factor Map
3. Corrective Actions (immediate)
4. Preventive Actions (long-term)
5. Verification Plan
```

### Data Analysis

```markdown
# Data Analysis: [Dataset/Topic]

## Context
[What data is being analyzed and why]

## Data Description
- Source: [where data comes from]
- Time period: [date range]
- Sample size: [n = X]
- Variables: [key fields]

## Analysis Objectives
1. [Objective 1]: [specific question to answer]
2. [Objective 2]: [specific question to answer]
3. [Objective 3]: [specific question to answer]

## Analysis Requirements

### Descriptive Statistics
- Central tendency (mean, median, mode)
- Dispersion (range, std dev, variance)
- Distribution shape

### Pattern Analysis
- Trends over time
- Correlations between variables
- Anomalies and outliers

### Segmentation
- Group by: [segmentation criteria]
- Compare: [comparison dimensions]

## Output Format
1. Key Metrics Summary Table
2. Visualizations (describe chart types)
3. Statistical Findings
4. Patterns and Insights
5. Recommendations

## Constraints
- Confidence level: [95%, 99%]
- Significance threshold: [p < 0.05]
- Known limitations: [list any]
```

### Technical Analysis

```markdown
# Technical Analysis: [System/Architecture/Code]

## Context
[Background on what is being analyzed]

## Scope
- Components: [what's included]
- Depth: [surface/detailed/comprehensive]
- Focus areas: [specific concerns]

## Analysis Dimensions

### Architecture
- Design patterns used
- Component relationships
- Data flow
- Integration points

### Code Quality
- Maintainability
- Readability
- Test coverage
- Documentation

### Performance
- Time complexity
- Space complexity
- Bottlenecks
- Optimization opportunities

### Security
- Vulnerabilities
- Authentication/Authorization
- Data protection
- Attack surface

### Scalability
- Current capacity
- Growth limitations
- Scaling strategies

## Output Format
1. Architecture Overview Diagram
2. Component Analysis Table
3. Risk Assessment Matrix
4. Recommendations (prioritized)
5. Technical Debt Inventory
```

---

## Tips for Analysis Prompts

1. **Be specific about scope** - Define what's in/out of analysis
2. **Provide context** - Background helps frame analysis appropriately
3. **Specify framework** - Name the analytical approach (SWOT, Porter's, etc.)
4. **Request structure** - Define output format clearly
5. **Set depth expectations** - Surface scan vs. deep dive
6. **Include constraints** - Time, resources, data limitations
