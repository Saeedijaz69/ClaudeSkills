# Code Generation Prompt Templates

## Universal Code Request Template

```markdown
# Code Request: [Feature Name]

## Context
- **Language:** [e.g., TypeScript, Python, Go]
- **Framework:** [e.g., React, FastAPI, none]
- **Environment:** [e.g., Node.js 18, Python 3.11]
- **Package Manager:** [e.g., npm, pip, cargo]

## Existing Context
```[language]
// Relevant existing code, types, or interfaces
```

## Task Description
[Clear description of what the code should do]

## Requirements

### Functional
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Non-Functional
- **Performance:** [requirements]
- **Security:** [requirements]
- **Error Handling:** [requirements]

## Input/Output Specification

### Input
```[language]
// Type definition or example
```

### Output
```[language]
// Type definition or example
```

## Constraints
- **Must use:** [libraries, patterns]
- **Must avoid:** [anti-patterns, deprecated APIs]
- **Style:** [coding conventions]

## Examples

### Example 1
**Input:**
```[language]
// example input
```

**Expected Output:**
```[language]
// example output
```

## Quality Checklist
- [ ] Include comprehensive error handling
- [ ] Add JSDoc/docstring comments
- [ ] Follow [style guide]
- [ ] Include type annotations
- [ ] Make it testable
```

---

## Specialized Templates

### React Component

```markdown
# React Component: [ComponentName]

## Context
- React version: [18.x]
- Styling: [Tailwind CSS / CSS Modules / Styled Components]
- State management: [useState / Zustand / Redux]
- TypeScript: [Yes/No]

## Component Purpose
[What this component does and where it's used]

## Props Interface
```typescript
interface [ComponentName]Props {
  // Required props
  propName: type;
  
  // Optional props
  optionalProp?: type;
  
  // Callbacks
  onChange?: (value: type) => void;
}
```

## Component Behavior
- **Default state:** [initial state description]
- **User interactions:** [click, hover, input behaviors]
- **Side effects:** [API calls, subscriptions]

## Requirements
- [ ] Accessible (ARIA attributes, keyboard navigation)
- [ ] Responsive
- [ ] Loading state handling
- [ ] Error state handling
- [ ] Empty state handling

## Example Usage
```tsx
<[ComponentName]
  prop1={value1}
  prop2={value2}
  onChange={(val) => console.log(val)}
/>
```

## Expected Structure
```tsx
// Imports
// Types
// Component
// - Props destructuring
// - State hooks
// - Effect hooks
// - Handlers
// - Render
// Export
```
```

### API Endpoint

```markdown
# API Endpoint: [Endpoint Name]

## Context
- Framework: [Express / FastAPI / NestJS]
- Database: [PostgreSQL / MongoDB / none]
- Authentication: [JWT / API Key / none]

## Endpoint Specification

### Route
```
[METHOD] /api/v1/[resource]/[path]
```

### Request
**Headers:**
```
Authorization: Bearer [token]
Content-Type: application/json
```

**Path Parameters:**
- `id`: [type] - [description]

**Query Parameters:**
- `page`: number - [description]
- `limit`: number - [description]

**Request Body:**
```json
{
  "field1": "type",
  "field2": "type"
}
```

### Response

**Success (200/201):**
```json
{
  "success": true,
  "data": {}
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Requirements
- [ ] Input validation
- [ ] Authentication check
- [ ] Authorization check
- [ ] Rate limiting
- [ ] Logging
- [ ] Error handling

## Business Logic
[Description of what the endpoint should do]
```

### Database Query/Migration

```markdown
# Database: [Query/Migration Name]

## Context
- Database: [PostgreSQL / MySQL / MongoDB]
- ORM: [Prisma / Sequelize / TypeORM / raw SQL]

## Purpose
[What this query/migration accomplishes]

## Schema Context
```sql
-- Relevant existing tables/collections
```

## Requirements

### For Query:
- Tables involved: [list]
- Filters: [conditions]
- Sorting: [order by]
- Pagination: [yes/no]
- Joins: [describe relationships]

### For Migration:
- Action: [CREATE / ALTER / DROP]
- Changes: [describe changes]
- Rollback strategy: [how to reverse]

## Expected Results
```sql
-- Example output format
```

## Performance Considerations
- Expected row count: [estimate]
- Indexes needed: [list]
- Query optimization: [requirements]
```

### Algorithm Implementation

```markdown
# Algorithm: [Algorithm Name]

## Problem Statement
[Clear description of the problem to solve]

## Input
- Type: [data type]
- Constraints: [size limits, value ranges]
- Example: [sample input]

## Output
- Type: [data type]
- Constraints: [requirements]
- Example: [sample output]

## Requirements
- Time complexity: O([requirement])
- Space complexity: O([requirement])
- Edge cases: [list cases to handle]

## Approach
[Optional: suggest preferred approach or let AI decide]

## Test Cases
```
Input: [test1]
Expected: [output1]

Input: [test2]  
Expected: [output2]

Input: [edge case]
Expected: [edge output]
```

## Implementation Notes
- Language: [language]
- Use built-in: [allowed/forbidden methods]
- Comments: [explain complexity analysis]
```

### Test Suite

```markdown
# Test Suite: [Module/Function Name]

## Context
- Testing framework: [Jest / Pytest / Vitest]
- Code to test:
```[language]
// Function or module signature
```

## Test Requirements

### Unit Tests
1. **Happy path:** [normal successful cases]
2. **Edge cases:** [boundary conditions]
3. **Error cases:** [expected failures]

### Test Categories
- [ ] Input validation tests
- [ ] Business logic tests
- [ ] Error handling tests
- [ ] Integration tests (if applicable)

## Test Data
```[language]
// Mock data or fixtures
```

## Coverage Goals
- Line coverage: [X]%
- Branch coverage: [X]%
- Function coverage: [X]%

## Output Format
- Use describe/it blocks
- Include meaningful test names
- Group related tests
- Add setup/teardown as needed
```

### CLI Tool

```markdown
# CLI Tool: [Tool Name]

## Context
- Language: [Node.js / Python / Go]
- CLI framework: [Commander / Click / Cobra]

## Purpose
[What the tool does]

## Commands

### Command 1
```bash
tool-name [command] [options] [arguments]
```

**Options:**
- `-o, --option <value>`: [description]
- `-f, --flag`: [description]

**Arguments:**
- `arg1`: [description] (required)
- `arg2`: [description] (optional)

**Example:**
```bash
tool-name generate --output ./dist --verbose
```

## Requirements
- [ ] Help command (-h, --help)
- [ ] Version flag (-v, --version)
- [ ] Colored output
- [ ] Progress indicators for long operations
- [ ] Error messages with exit codes
- [ ] Configuration file support (optional)

## Exit Codes
- 0: Success
- 1: General error
- 2: Invalid arguments
```

---

## Best Practices for Code Prompts

1. **Specify the language and version** - Syntax varies between versions
2. **Include existing code context** - Types, interfaces, related functions
3. **Define input/output clearly** - With types and examples
4. **List explicit constraints** - What to use and what to avoid
5. **Provide test cases** - Expected behavior for validation
6. **Request specific patterns** - Error handling, logging, etc.
7. **Set quality expectations** - Comments, types, tests
