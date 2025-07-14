# Opinions

This document explains the opinionated choices made in `@suin/biome.json`.

## Warning-Level Rules Instead of Errors

All linting rules are set to "warn" level instead of "error" level.

**Reasoning**: This solves two critical developer experience issues:

1. **Visual distinction**: Compiler errors appear in red, while linter warnings appear in yellow/orange. This visual difference helps developers immediately distinguish between actual code problems that prevent compilation and style suggestions that improve code quality.

2. **Uninterrupted development flow**: Warning-level rules allow continuous development without interruption. Developers can focus on getting their logic working first, then address style issues during code review or dedicated cleanup phases.

**The confusion problem**: When both compiler errors and linter errors show as red in your IDE, it becomes difficult to prioritize what needs immediate attention. A missing semicolon (style issue) appears just as urgent as an undefined variable (actual bug). This creates cognitive overhead and slows down development.

**The solution**: By using warning-level rules, developers can:

- Immediately identify and fix actual compilation errors (red)
- Address style improvements when convenient (yellow warnings)
- Maintain code quality guidance without blocking productivity
- Reduce mental fatigue from constant error-level interruptions

## Disable `useTopLevelRegex` for Safety

The `useTopLevelRegex` rule is disabled by default.

**Reasoning**: While `useTopLevelRegex` is intended as a performance optimization, it encourages a practice that can introduce subtle, hard-to-debug bugs due to the stateful nature of JavaScript's `RegExp` objects with global (`g`) or sticky (`y`) flags. These objects maintain an internal `lastIndex` property that can cause unexpected behavior when reused across an application—especially in asynchronous code or within shared libraries.

**Safety over micro-optimization**: The safest default practice is to create a new `RegExp` instance for each use, guaranteeing a stateless object and eliminating potential bugs. Modern JavaScript engines (like V8) cache compiled regex bytecode, making new `RegExp` object creation extremely cheap. The decision to reuse a `RegExp` instance should be a conscious optimization made after profiling, not a default behavior.

**Examples of problematic code**:

```javascript
// Problematic - shared global RegExp can cause bugs
const GLOBAL_REGEX = /pattern/g;

function processItems(items) {
  return items.filter((item) => GLOBAL_REGEX.test(item)); // lastIndex state affects results
}

// Safe - new RegExp instance each time
function processItems(items) {
  return items.filter((item) => /pattern/g.test(item));
}
```

## Enforce `Array<T>` Syntax Over `T[]`

The `useConsistentArrayType` rule is configured to enforce generic array syntax.

**Reasoning**: This provides consistency with other generic types (`Promise<T>`, `Map<K, V>`, `Set<T>`). The generic syntax is more explicit and readable, especially for complex nested types, easier to scan and understand in type definitions, and aligns with modern TypeScript best practices.

**Examples**:

```typescript
// Preferred
const numbers: Array<number> = [1, 2, 3];
const promises: Array<Promise<string>> = [];

// Discouraged
const numbers: number[] = [1, 2, 3];
const promises: Promise<string>[] = [];
```

## Disable TypeScript's `noUnusedLocals` in Favor of Biome

We provide a base `tsconfig.json` with `noUnusedLocals: false` and `noUnusedParameters: false`.

**Reasoning**: This eliminates duplicate warnings between TypeScript compiler and Biome's `noUnusedVariables`. Biome's implementation is more comprehensive and provides better autofix capabilities. This reduces noise in the development environment and centralizes unused variable detection in one tool.

## Double Quote Style for Strings

JavaScript/TypeScript strings are enforced to use double quotes (`"`).

**Reasoning**: This aligns with Prettier's default configuration, ensuring consistency when teams use both tools. It matches HTML attribute syntax and reduces cognitive load by having one consistent quote style across the codebase.

## Disable TypeScript's `noUndeclaredVariables`

The `noUndeclaredVariables` rule is turned off in the Biome configuration.

**Reasoning**: TypeScript compiler already handles undeclared variable detection more accurately. This avoids false positives in TypeScript environments, reduces redundant error reporting, and allows TypeScript to be the source of truth for variable declarations.

## Disable `useLiteralKeys` to Avoid Conflicts with TypeScript

The `useLiteralKeys` rule is disabled to prevent conflicts with TypeScript's `noPropertyAccessFromIndexSignature`.

**The Story**: When you enable TypeScript's `noPropertyAccessFromIndexSignature` flag (a recommended strict mode option), it requires bracket notation (`obj["foo"]`) for accessing properties on objects with index signatures. This makes it explicit when you're accessing dynamic properties versus guaranteed ones.

Meanwhile, Biome's `useLiteralKeys` rule wants to do the opposite—it converts `obj["foo"]` to `obj.foo` for cleaner code. This creates an irreconcilable conflict.

**Why Can't Biome Fix This?** You might wonder: doesn't Biome v2.0+ have type inference? Yes, it does! But `useLiteralKeys` is intentionally kept as a fast, syntactic-only rule. Making it type-aware would require:

- Understanding TypeScript's index signatures
- Slowing down the rule significantly
- Breaking existing workflows that expect instant feedback

The Biome team has acknowledged this incompatibility and closed it as "not planned"—it's a deliberate choice to keep the rule simple and fast (see [biomejs/biome#463](https://github.com/biomejs/biome/issues/463)).

**The Technical Context**:

- `noPropertyAccessFromIndexSignature` enforces consistent syntax (not type safety)
- `noUncheckedIndexedAccess` is the flag that actually adds `| undefined` for type safety
- Biome's type inference is opt-in and focused on complex rules like `noFloatingPromises`
- Simple rules like `useLiteralKeys` stay fast by remaining syntactic

**Our Decision**: We prioritize TypeScript's consistency requirements over Biome's style preferences. The bracket notation makes your code's intent clearer, distinguishing between "this property definitely exists" and "this property might exist."

**Example**:

```typescript
type Config = { [key: string]: string };
const config: Config = {
  /* ... */
};

// TypeScript requires this (clear intent)
const value = config["apiKey"];

// Biome wants this (would cause TS error)
const value = config.apiKey; // Error: TS4111
```

**Learn More**:

- [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) - TypeScript docs
- [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) - TypeScript docs
- [`useLiteralKeys`](https://biomejs.dev/linter/rules/use-literal-keys/) - Biome docs
