# Common Development Rules

Universal coding guidelines for all projects.

## Core Principles

**Code is read more than written**
- Clear variable and function names
- Self-documenting code preferred over comments
- Consistent formatting
- Simplest solution that works

**Avoid over-engineering (KISS)**
- No premature optimization
- Easy to understand > clever code
- Don't build features before needed
- Add complexity only when required

**No workarounds**
- Find and fix root causes, never patch symptoms
- No hacks, temporary fixes, or "will fix later" code
- If a proper fix isn't possible now, create an issue and document why

**Single Source of Truth (SSOT)**
- Every piece of data, config, or logic has exactly one authoritative source
- Never duplicate definitions — derive or reference instead
- If you find duplicated logic, extract to a shared location
- Constants, types, and config live in one place only

## Immutability (CRITICAL)

ALWAYS create new objects, NEVER mutate:

```javascript
// ❌ WRONG: Mutation
function updateUser(user, name) {
  user.name = name  // MUTATION!
  return user
}

// ✅ CORRECT: Immutability
function updateUser(user, name) {
  return {
    ...user,
    name
  }
}
```

## File Organization

MANY SMALL FILES > FEW LARGE FILES:

- High cohesion, low coupling
- 200-400 lines typical, 800 max
- Extract utilities from large components
- Organize by feature/domain, not by type

## Error Handling

ALWAYS handle errors comprehensively:

```javascript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('Detailed user-friendly message')
}
```

## Input Validation

ALWAYS validate user input:

```javascript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
})

const validated = schema.parse(input)
```

## Before Marking Work Complete

- Code is readable and well-named
- Functions are small (<50 lines)
- Files are focused (<800 lines)
- No deep nesting (>4 levels)
- Proper error handling
- No console.log statements
- No hardcoded values
- No mutation (immutable patterns used)
- No workarounds or hacks (root cause fixed)
- No duplicated logic (SSOT maintained)
