# @suin/biome.json

> An opinionated [Biome](https://biomejs.dev/) configuration that extends [Ultracite](https://github.com/haydenbleasel/ultracite) with warning-level rules for uninterrupted development flow

[![npm version](https://img.shields.io/npm/v/@suin/biome.json.svg)](https://www.npmjs.com/package/@suin/biome.json)
[![npm downloads](https://img.shields.io/npm/dm/@suin/biome.json.svg)](https://www.npmjs.com/package/@suin/biome.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/suin/biome.json/actions/workflows/ci.yml/badge.svg)](https://github.com/suin/biome.json/actions/workflows/ci.yml)
[![Publish](https://github.com/suin/biome.json/actions/workflows/publish.yml/badge.svg)](https://github.com/suin/biome.json/actions/workflows/publish.yml)

## The Problem

Setting up Biome configuration often involves:

1. **Development interruptions** - Error-level rules that stop you mid-coding
2. **Visual confusion** - Both compiler errors and linter errors show as red, making it hard to distinguish between actual code issues and style violations
3. **Manual rule setup** - Tedious configuration of hundreds of linting rules
4. **Team inconsistency** - Different developers end up with different configs
5. **Maintenance burden** - Configs become outdated and need constant updates

### Before (Manual Configuration)

```jsonc
{
  "linter": {
    "rules": {
      "recommended": true,
      "correctness": {
        "noUndeclaredVariables": "error", // Blocks development
        "useExhaustiveDependencies": "error"
      },
      "suspicious": {
        "noConsole": "error", // Shows as red (same as compiler errors!)
        "noDebugger": "error" // Confuses actual bugs with style issues
      }
      // ... hundreds more rules to configure manually
    }
  },
  "formatter": {
    "quoteStyle": "single", // Inconsistent choices
    "semicolons": "asNeeded"
  }
  // No type safety, easy to break
}
```

**Result:** Development constantly interrupted by linting errors, visual confusion between compiler errors and style violations (both red!), inconsistent team configurations.

### After (With @suin/biome.json)

```json
{
  "extends": ["@suin/biome.json"]
}
```

**Result:** Comprehensive, warning-level rules that guide without blocking development, with clear visual distinction between actual errors (red) and style suggestions (yellow warnings).

## The Solution

This package provides a **pre-compiled Biome configuration** that eliminates common development workflow issues:

1. **Uninterrupted coding flow** - All rules set to "warn" so you can keep coding
2. **Clear visual distinction** - Compiler errors show as red, linter suggestions show as yellow warnings
3. **Zero setup required** - Just extend the config and start developing
4. **Proven rule foundation** - Built on Ultracite's battle-tested preset
5. **Automatic maintenance** - Stays current with Biome and Ultracite updates
6. **Team consistency** - Everyone gets the same rules out of the box

The solution is **non-invasive** and works with your existing Biome setup without breaking changes.

## Installation

```bash
# Using bun (recommended)
bun add -D @suin/biome.json

# Using npm
npm install --save-dev @suin/biome.json

# Using pnpm
pnpm add -D @suin/biome.json
```

## Quick Start

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/<framework>"]
}
```

Pick your framework from the list below (for example, Next.js uses both `react` and `next`). That's it! Your project now uses the opinionated configuration with **warning-level rules** for a better development experience.

## Usage Examples

### Framework-specific Configuration (copy-paste)

Use one of the following presets based on your framework.

#### Next.js

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@suin/biome.json",
    "@suin/biome.json/react",
    "@suin/biome.json/next"
  ]
}
```

#### React (Vite, CRA, etc.)

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/react"]
}
```

#### Vue

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/vue"]
}
```

#### Svelte

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/svelte"]
}
```

#### Solid

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/solid"]
}
```

#### Qwik

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/qwik"]
}
```

#### Angular

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/angular"]
}
```

#### Remix

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/remix"]
}
```

#### Astro

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/astro"]
}
```

### With Custom Overrides

You can override any rules in your own `biome.json`:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/<framework>"],
  "formatter": {
    "lineWidth": 120
  },
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error" // Make console warnings into errors
      }
    }
  }
}
```

### Project-Specific Customizations

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/<framework>"],
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  },
  "files": {
    "ignore": ["dist/", "build/", "*.config.js"]
  }
}
```

### TypeScript Projects

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@suin/biome.json", "@suin/biome.json/<framework>"],
  "linter": {
    "rules": {
      "correctness": {
        "noUndeclaredVariables": "warn" // Re-enable for TypeScript
      }
    }
  }
}
```

### TypeScript Configuration Integration

To avoid duplicate warnings between Biome and TypeScript compiler, you can extend the included TypeScript configuration:

```json
{
  "extends": ["@suin/biome.json/tsconfig"],
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

This disables TypeScript's `noUnusedLocals` and `noUnusedParameters` since Biome's `noUnusedVariables` rule handles unused variable detection.

## CI/CD Configuration

### ⚠️ Important: Handling Warnings in CI

Since this configuration uses **warning-level rules** for better developer experience, Biome will exit with code 0 (success) even when warnings are found. This is intentional for local development but can be problematic in CI/CD environments where you want to ensure code quality.

**The Problem**: In CI, developers might miss warnings because the build appears successful:

```yaml
# ❌ This will pass even with warnings
- run: npx biome ci
```

**The Solution**: Use the `--error-on-warnings` flag in your CI configuration:

```yaml
# ✅ This will fail if any warnings are found
- run: npx biome ci --error-on-warnings
```

### Example CI Configurations

#### GitHub Actions

```yaml
name: CI
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npx biome ci --error-on-warnings
```

#### GitLab CI

```yaml
lint:
  image: node:20
  script:
    - npx biome ci --error-on-warnings
```

#### Other CI Commands

```bash
# Format check with error on warnings
npx biome format --error-on-warnings

# Lint check with error on warnings
npx biome lint --error-on-warnings

# Both format and lint with error on warnings
npx biome check --error-on-warnings
```

### Local vs CI Behavior

- **Local Development**: Warnings don't block your workflow
- **CI/CD Pipeline**: Warnings are treated as errors to maintain code quality

This approach gives you the best of both worlds: uninterrupted development locally while ensuring high code quality in your repository.

## Opinionated Choices

This configuration makes several opinionated choices to promote consistency and best practices. These opinions are documented in [OPINIONS.md](./OPINIONS.md):

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

> Local development for this repository assumes a Devbox environment. Install [Devbox](https://www.jetify.com/devbox) and enter the environment with `devbox shell` before running the commands below. Bun and Task are provisioned automatically inside the shell.

```bash
# Clone the repository
git clone https://github.com/suin/biome.json.git
cd biome.json

# Enter Devbox shell (provisions Bun and Task)
devbox shell

# Install dependencies
bun install

# Update Biome types (if needed)
task update-biome-types

# Build the configuration
task build
```

### Making Changes

1. **Edit `src/custom.jsonc`** with your changes
2. **Run `task build`** to generate the compiled config
3. **Test the changes** in a sample project
4. **Submit a PR** with your modifications

### Development Scripts

```bash
# Build the configuration
task build

# Update Biome TypeScript definitions
task update-biome-types

# Update dependencies and rebuild
bun update ultracite && task build

# Verify build output
cat dist/core.json | head -20
```

### Testing Changes

```bash
# Test in a sample project
mkdir test-project && cd test-project
echo '{"extends": ["../dist/core.json"]}' > biome.json
echo 'console.log("test")' > test.js
bunx biome check test.js  # Should show warnings, not errors
```

### Bug Reports

If you find a bug, please create an issue with:

- A minimal reproduction case
- Your environment details (Bun/Node.js version, package versions)
- Expected vs actual behavior
- Output of `bunx biome rage` command

## License

MIT © [suin](https://github.com/suin)

## License Acknowledgment

This package builds upon [Ultracite](https://github.com/haydenbleasel/ultracite) (MIT License)
as its foundation, extending it.

---

Built with ❤️ using [Bun](https://bun.sh), [TypeScript](https://typescriptlang.org), and [Biome](https://biomejs.dev)
