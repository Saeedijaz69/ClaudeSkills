# Code Quality Review Checklist

## Quick Reference

Use this checklist to ensure code quality, maintainability, and best practices.

---

## 1. Code Readability

### Naming Conventions
- [ ] Variable names are descriptive and meaningful
- [ ] Function names describe what they do (verb + noun)
- [ ] Class names are nouns describing the entity
- [ ] Constants are UPPER_SNAKE_CASE
- [ ] No single-letter variables (except loops/lambdas)
- [ ] No abbreviations unless universally understood

### Code Structure
- [ ] Functions are short and focused (< 30 lines ideal)
- [ ] Classes have single responsibility
- [ ] Nesting depth is manageable (< 4 levels)
- [ ] Related code is grouped together
- [ ] Imports are organized and minimal

### Comments & Documentation
- [ ] Complex logic is explained
- [ ] Public APIs have documentation
- [ ] Comments explain "why" not "what"
- [ ] Outdated comments removed
- [ ] TODOs have ticket references

---

## 2. Code Design

### SOLID Principles
- [ ] **S**ingle Responsibility - Each class/function does one thing
- [ ] **O**pen/Closed - Open for extension, closed for modification
- [ ] **L**iskov Substitution - Subtypes are substitutable
- [ ] **I**nterface Segregation - No forced unused dependencies
- [ ] **D**ependency Inversion - Depend on abstractions

### Design Patterns
- [ ] Appropriate patterns used (not forced)
- [ ] Factory patterns for complex object creation
- [ ] Strategy pattern for interchangeable algorithms
- [ ] Observer for event-driven communication
- [ ] Dependency injection for testability

### Coupling & Cohesion
- [ ] Low coupling between modules
- [ ] High cohesion within modules
- [ ] Clear module boundaries
- [ ] Minimal public interface exposed

---

## 3. Error Handling

### Exception Handling
- [ ] Specific exceptions caught (not bare except)
- [ ] Errors handled at appropriate level
- [ ] Resources cleaned up in finally blocks
- [ ] Custom exceptions for domain errors
- [ ] Error context preserved (chained exceptions)

### Error Messages
- [ ] Error messages are actionable
- [ ] Sensitive data not exposed
- [ ] Error codes for programmatic handling
- [ ] User-facing messages are friendly
- [ ] Debug info available in development

### Graceful Degradation
- [ ] Fallback behavior defined
- [ ] Partial failures handled
- [ ] Circuit breakers for external services
- [ ] Timeout handling implemented

---

## 4. Testing

### Test Coverage
- [ ] Unit tests for business logic
- [ ] Integration tests for workflows
- [ ] Edge cases covered
- [ ] Error paths tested
- [ ] Happy path tested

### Test Quality
- [ ] Tests are independent
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test names describe the scenario
- [ ] Arrange-Act-Assert pattern followed
- [ ] Mocks used appropriately

### Test Maintainability
- [ ] Test code is clean and readable
- [ ] Test utilities are reusable
- [ ] Test data is meaningful
- [ ] No testing implementation details

---

## 5. Code Duplication

### DRY Principle
- [ ] No copy-pasted code blocks
- [ ] Common logic extracted to functions
- [ ] Shared utilities centralized
- [ ] Configuration not duplicated
- [ ] Constants defined once

### When Duplication is OK
- Test code (readability > DRY)
- Very simple expressions
- Code that might diverge
- Cross-boundary code (microservices)

---

## 6. Type Safety

### Type Annotations
- [ ] Public functions have type hints
- [ ] Complex types are documented
- [ ] Nullability is explicit
- [ ] Generic types used appropriately
- [ ] Type narrowing used where needed

### Null Safety
- [ ] Null checks before dereferencing
- [ ] Optional types used for nullable values
- [ ] Default values provided where appropriate
- [ ] Null object pattern considered

---

## 7. API Design

### Function Signatures
- [ ] Minimal parameters (< 4 ideal)
- [ ] Optional parameters at end
- [ ] Default values are safe
- [ ] Return types are consistent
- [ ] No boolean parameters (use enums)

### Class Design
- [ ] Immutability preferred
- [ ] Required fields in constructor
- [ ] Validation in constructor
- [ ] Builder pattern for complex construction
- [ ] Fluent interfaces where appropriate

---

## 8. Logging

### Log Levels
- [ ] ERROR: System failures, exceptions
- [ ] WARN: Recoverable issues, deprecations
- [ ] INFO: Significant events, state changes
- [ ] DEBUG: Detailed diagnostic info
- [ ] Appropriate level used for each log

### Log Content
- [ ] Context included (user, request ID)
- [ ] Structured logging used
- [ ] No sensitive data logged
- [ ] Timestamps included
- [ ] Correlation IDs for tracing

---

## 9. Configuration

### Configuration Management
- [ ] Config separated from code
- [ ] Environment-specific overrides
- [ ] Sensitive config encrypted/secured
- [ ] Defaults are safe
- [ ] Config validation on startup

### Feature Flags
- [ ] Feature flags for new features
- [ ] Flags have clear naming
- [ ] Cleanup plan for old flags
- [ ] Flag state logged

---

## 10. Code Style

### Consistency
- [ ] Follows project style guide
- [ ] Linter/formatter configured
- [ ] Consistent patterns across codebase
- [ ] Import order standardized
- [ ] Consistent error handling patterns

### Formatting
- [ ] Proper indentation
- [ ] Reasonable line length (< 120 chars)
- [ ] Consistent brace style
- [ ] Proper whitespace usage
- [ ] No trailing whitespace

---

## Code Smell Reference

### Common Code Smells

| Smell | Description | Refactoring |
|-------|-------------|-------------|
| **Long Method** | > 30 lines | Extract Method |
| **Large Class** | Too many responsibilities | Extract Class |
| **Long Parameter List** | > 4 parameters | Parameter Object |
| **Feature Envy** | Method uses other class more | Move Method |
| **Data Clumps** | Same params appear together | Extract Class |
| **Primitive Obsession** | Primitives instead of objects | Replace with Object |
| **Switch Statements** | Complex conditionals | Strategy Pattern |
| **Parallel Inheritance** | Mirror class hierarchies | Collapse Hierarchy |
| **Lazy Class** | Does too little | Inline Class |
| **Speculative Generality** | Unused abstractions | Remove |
| **Temporary Field** | Fields only sometimes used | Extract Class |
| **Message Chains** | a.b().c().d() | Hide Delegate |
| **Middle Man** | Class that only delegates | Remove Middle Man |
| **Inappropriate Intimacy** | Classes too coupled | Move/Extract |
| **Comments** | Explaining bad code | Refactor code |

---

## Clean Code Principles

### Functions
```
✅ Do one thing
✅ Have descriptive names
✅ Have few arguments
✅ Have no side effects
✅ Don't repeat yourself
```

### Classes
```
✅ Small and focused
✅ One reason to change
✅ Cohesive methods
✅ Minimal dependencies
✅ Encapsulated state
```

### Error Handling
```
✅ Use exceptions, not error codes
✅ Provide context with exceptions
✅ Define exception classes
✅ Don't return null
✅ Don't pass null
```

---

## Review Questions

Ask yourself:

1. **Could a junior developer understand this?**
2. **Would I be comfortable maintaining this in 6 months?**
3. **Are there any hidden assumptions?**
4. **What happens when this fails?**
5. **Is this tested adequately?**
6. **Could this be simpler?**
7. **Does this follow project conventions?**
8. **Are there any security implications?**

---

## Refactoring Checklist

Before approving code with issues:

- [ ] Critical issues must be fixed
- [ ] Major issues should be fixed or tracked
- [ ] Minor issues can be noted for future
- [ ] Technical debt is documented
- [ ] Follow-up tasks created if needed
