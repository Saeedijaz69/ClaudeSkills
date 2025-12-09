---
name: code-review
description: Perform comprehensive, expert-level code reviews with security, performance, maintainability, and best practice analysis. Use when reviewing PRs, auditing code, or improving code quality.
version: 1.0.0
dependencies: python>=3.8
---

# Code Review Skill

This skill provides a systematic, thorough approach to code review that covers security vulnerabilities, performance issues, maintainability concerns, and adherence to best practices. Reviews are constructive, educational, and actionable.

## Review Philosophy

### Core Principles

1. **Be Constructive, Not Destructive** - Focus on improving code, not criticizing developers
2. **Explain the "Why"** - Every suggestion should include reasoning
3. **Prioritize Issues** - Critical > Major > Minor > Nitpick
4. **Offer Solutions** - Don't just point out problems, suggest fixes
5. **Acknowledge Good Code** - Highlight well-written sections

### Review Mindset

- Assume positive intent from the author
- Consider the context and constraints
- Balance perfectionism with pragmatism
- Think about future maintainers
- Question your own assumptions

## Review Process

### Phase 1: Context Gathering

Before reviewing code, understand:

1. **Purpose** - What problem does this code solve?
2. **Scope** - What's the expected impact?
3. **Requirements** - What are the acceptance criteria?
4. **Architecture** - How does this fit into the larger system?
5. **History** - Is this a refactor, new feature, or bug fix?

### Phase 2: High-Level Review

Examine the overall structure:

- [ ] Does the approach make sense?
- [ ] Is the architecture appropriate?
- [ ] Are there any major design issues?
- [ ] Does it follow project conventions?
- [ ] Is the scope appropriate for a single PR?

### Phase 3: Detailed Review

Go through code systematically:

1. **Security Analysis** - See `docs/security-checklist.md`
2. **Performance Review** - See `docs/performance-checklist.md`
3. **Code Quality** - See `docs/quality-checklist.md`
4. **Testing Coverage** - See `docs/testing-checklist.md`

### Phase 4: Final Assessment

Provide overall feedback:

- Summary of findings
- Priority-ordered recommendations
- Approval status (Approve / Request Changes / Comment)

## Issue Severity Levels

### 🔴 CRITICAL (Must Fix)
- Security vulnerabilities
- Data loss potential
- Breaking changes without migration
- Production-breaking bugs

### 🟠 MAJOR (Should Fix)
- Performance degradation
- Missing error handling
- Logic errors
- Incomplete implementation

### 🟡 MINOR (Consider Fixing)
- Code style inconsistencies
- Missing documentation
- Suboptimal patterns
- Minor inefficiencies

### 🔵 NITPICK (Optional)
- Naming preferences
- Formatting choices
- Minor readability improvements
- Personal style preferences

## Review Categories

### 1. Security Review

**CRITICAL CHECKS:**

```
□ SQL Injection
  - Are queries parameterized?
  - Is user input sanitized?
  
□ XSS (Cross-Site Scripting)
  - Is output encoded?
  - Are dangerous HTML methods avoided?
  
□ Authentication & Authorization
  - Are permissions checked?
  - Is sensitive data protected?
  
□ Secrets Management
  - No hardcoded credentials?
  - Secrets in environment variables?
  
□ Input Validation
  - Is all input validated?
  - Are file uploads restricted?

□ Dependency Security
  - Known vulnerabilities?
  - Up-to-date packages?
```

### 2. Performance Review

**CHECKS:**

```
□ Database Queries
  - N+1 query problems?
  - Missing indexes?
  - Unnecessary data fetching?
  
□ Memory Usage
  - Memory leaks?
  - Large object allocations?
  - Proper cleanup?
  
□ Algorithm Complexity
  - Appropriate time complexity?
  - Unnecessary nested loops?
  
□ Caching
  - Repeated expensive operations?
  - Cache invalidation correct?
  
□ Async Operations
  - Blocking calls avoided?
  - Proper concurrency handling?
```

### 3. Code Quality Review

**CHECKS:**

```
□ Readability
  - Clear variable/function names?
  - Appropriate comments?
  - Logical organization?
  
□ Maintainability
  - Single responsibility?
  - DRY principle followed?
  - Appropriate abstractions?
  
□ Error Handling
  - Errors caught and handled?
  - Meaningful error messages?
  - Proper logging?
  
□ Type Safety
  - Types properly defined?
  - Null checks present?
  - Edge cases handled?
  
□ Testing
  - Unit tests present?
  - Edge cases covered?
  - Tests are meaningful?
```

## Review Comment Templates

### Security Issue
```markdown
🔴 **CRITICAL - Security Issue**

**Issue:** [Description of the vulnerability]

**Risk:** [Potential impact if exploited]

**Location:** `file.js:42`

**Current Code:**
```[language]
// Problematic code
```

**Recommended Fix:**
```[language]
// Fixed code
```

**Reference:** [Link to security best practice or documentation]
```

### Performance Issue
```markdown
🟠 **MAJOR - Performance Issue**

**Issue:** [Description of the performance problem]

**Impact:** [Expected performance degradation]

**Location:** `file.js:42`

**Suggestion:** [How to fix or improve]

**Benchmark:** [If applicable, expected improvement]
```

### Code Quality Issue
```markdown
🟡 **MINOR - Code Quality**

**Observation:** [What could be improved]

**Suggestion:** [Recommended change]

**Reason:** [Why this matters]
```

### Positive Feedback
```markdown
✅ **Nice!** Great use of [pattern/technique]. This makes the code [benefit].
```

## Language-Specific Checks

### JavaScript/TypeScript

```
□ Proper async/await usage
□ Memory leak prevention (event listeners, subscriptions)
□ Type safety (for TypeScript)
□ Proper error boundaries
□ No console.log in production code
□ Proper dependency management
□ ESLint/Prettier compliance
```

### Python

```
□ PEP 8 compliance
□ Type hints present
□ Proper exception handling
□ Context managers for resources
□ No mutable default arguments
□ Proper imports organization
□ Docstrings present
```

### React/Frontend

```
□ Proper component composition
□ Hooks rules followed
□ Memoization where needed
□ Accessibility (a11y) compliance
□ No prop drilling
□ State management appropriate
□ Event handler cleanup
```

### SQL/Database

```
□ Parameterized queries
□ Proper indexing
□ Transaction handling
□ Deadlock prevention
□ Query optimization
□ Proper data types
□ Migration safety
```

## Review Output Format

### Summary Template

```markdown
## Code Review Summary

### Overview
- **Files Reviewed:** [count]
- **Lines Changed:** +[additions] / -[deletions]
- **Overall Assessment:** [Approve / Request Changes / Comment]

### Key Findings

#### 🔴 Critical Issues ([count])
1. [Issue summary with link to comment]

#### 🟠 Major Issues ([count])
1. [Issue summary with link to comment]

#### 🟡 Minor Issues ([count])
1. [Issue summary with link to comment]

#### ✅ Highlights
- [Positive observation]

### Recommendations
1. [Priority action item]
2. [Secondary action item]

### Notes for Future
- [Suggestions for follow-up work]
```

## Review Workflow Integration

### Pre-Review Checklist
```
□ CI/CD pipeline passing
□ Tests written and passing
□ Code compiles/builds
□ Documentation updated
□ PR description complete
□ Linked issues/tickets
```

### Post-Review Actions
```
□ All critical issues addressed
□ Major issues addressed or tracked
□ Author responded to feedback
□ Re-review completed if needed
□ Approval given
□ Merge strategy appropriate
```

## Tools and Automation

### Static Analysis
- ESLint / Prettier (JavaScript)
- Pylint / Black / MyPy (Python)
- SonarQube (Multi-language)
- CodeClimate (Quality metrics)

### Security Scanning
- Snyk (Dependency vulnerabilities)
- npm audit / pip-audit
- SAST tools (Static Application Security Testing)
- Secret scanning (git-secrets, truffleHog)

### Performance Analysis
- Lighthouse (Web performance)
- Bundle analyzers
- Profiling tools
- Load testing results

## Best Practices

### DO:
- Review in small batches (< 400 lines ideal)
- Take breaks between large reviews
- Use a checklist
- Ask questions when unclear
- Suggest, don't demand
- Follow up on your own reviews

### DON'T:
- Nitpick excessively
- Be condescending
- Ignore context
- Rush through reviews
- Make it personal
- Block on style preferences

---

**Remember:** A code review is a collaborative process to improve code quality and share knowledge. The goal is better software, not perfect software.
