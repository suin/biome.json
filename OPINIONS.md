# Opinions

This document explains the opinionated choices made in `@suin/biome.json`.

## Warning-Level Rules Instead of Errors

All linting rules are set to "warn" level instead of "error" level.

**Reasoning**: This allows continuous development flow without interruption. Developers can distinguish between actual compilation errors and style issues, addressing warnings during code review or dedicated cleanup phases while maintaining code quality guidance without blocking productivity.

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