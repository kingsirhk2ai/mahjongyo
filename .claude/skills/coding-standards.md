# Coding Standards

Universal coding standards applicable across all projects.

## Core Principles

- Code is read more than written
- Clear variable and function names
- Self-documenting code preferred over comments
- Consistent formatting
- Simplest solution that works

## Best Practices

### DRY (Don't Repeat Yourself)
- Extract common logic into functions
- Create reusable components
- Share utilities across modules
- Avoid copy-paste programming

### YAGNI (You Aren't Gonna Need It)
- Don't build features before they're needed
- Avoid speculative generality
- Add complexity only when required
- Start simple, refactor when needed

## Variable Naming

```javascript
// ✅ GOOD: Descriptive names
const userSearchQuery = 'john'
const isAuthenticated = true
const totalAmount = 1000

// ❌ BAD: Unclear names
const q = 'john'
const flag = true
const x = 1000
```

## Function Naming

```javascript
// ✅ GOOD: Verb-noun pattern
async function fetchUserData(userId) { }
function calculateTotal(items) { }
function isValidEmail(email) { }

// ❌ BAD: Unclear or noun-only
async function user(id) { }
function total(items) { }
function email(e) { }
```

## Immutability

```javascript
// ✅ ALWAYS use spread operator
const updatedUser = {
  ...user,
  name: 'New Name'
}

const updatedArray = [...items, newItem]

// ❌ NEVER mutate directly
user.name = 'New Name'  // BAD
items.push(newItem)     // BAD
```

## Error Handling

```javascript
// ✅ GOOD: Comprehensive error handling
async function fetchData(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw new Error('Failed to fetch data')
  }
}

// ❌ BAD: No error handling
async function fetchData(url) {
  const response = await fetch(url)
  return response.json()
}
```

## Async/Await

```javascript
// ✅ GOOD: Parallel execution when possible
const [users, products, stats] = await Promise.all([
  fetchUsers(),
  fetchProducts(),
  fetchStats()
])

// ❌ BAD: Sequential when unnecessary
const users = await fetchUsers()
const products = await fetchProducts()
const stats = await fetchStats()
```

## Comments

```javascript
// ✅ GOOD: Explain WHY, not WHAT
// Use exponential backoff to avoid overwhelming API during outages
const delay = Math.min(1000 * Math.pow(2, retryCount), 30000)

// ❌ BAD: Stating the obvious
// Increment counter by 1
count++
```

## Anti-Patterns to Avoid

### Large Functions
```javascript
// ❌ BAD: Function > 50 lines
function processData() {
  // 100 lines of code
}

// ✅ GOOD: Split into smaller functions
function processData() {
  const validated = validateData()
  const transformed = transformData(validated)
  return saveData(transformed)
}
```

### Deep Nesting
```javascript
// ❌ BAD: 5+ levels of nesting
if (user) {
  if (user.isAdmin) {
    if (data) {
      if (data.isValid) {
        if (hasPermission) {
          // Do something
        }
      }
    }
  }
}

// ✅ GOOD: Early returns
if (!user) return
if (!user.isAdmin) return
if (!data) return
if (!data.isValid) return
if (!hasPermission) return

// Do something
```

### Magic Numbers
```javascript
// ❌ BAD: Unexplained numbers
if (retryCount > 3) { }
setTimeout(callback, 500)

// ✅ GOOD: Named constants
const MAX_RETRIES = 3
const DEBOUNCE_DELAY_MS = 500

if (retryCount > MAX_RETRIES) { }
setTimeout(callback, DEBOUNCE_DELAY_MS)
```

**Remember**: Code quality is not negotiable. Clear, maintainable code enables rapid development and confident refactoring.
