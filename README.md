# @suin/biome.json

> An opinionated [Biome](https://biomejs.dev/) configuration that extends [Ultracite](https://github.com/Jamesbarford/ultracite) with warning-level rules for uninterrupted development flow

[![npm version](https://img.shields.io/npm/v/@suin/biome.json.svg)](https://www.npmjs.com/package/@suin/biome.json)
[![npm downloads](https://img.shields.io/npm/dm/@suin/biome.json.svg)](https://www.npmjs.com/package/@suin/biome.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/suin/biome.json/actions/workflows/ci.yml/badge.svg)](https://github.com/suin/biome.json/actions/workflows/ci.yml)
[![Publish](https://github.com/suin/biome.json/actions/workflows/publish.yml/badge.svg)](https://github.com/suin/biome.json/actions/workflows/publish.yml)

## The Problem

Setting up Biome configuration often involves:

1. **Development interruptions** - Error-level rules that stop you mid-coding
2. **Manual rule setup** - Tedious configuration of hundreds of linting rules  
3. **Team inconsistency** - Different developers end up with different configs
4. **Maintenance burden** - Configs become outdated and need constant updates

### Before (Manual Configuration)

```jsonc
{
  "linter": {
    "rules": {
      "recommended": true,
      "correctness": {
        "noUndeclaredVariables": "error",  // Blocks development
        "useExhaustiveDependencies": "error"
      },
      "suspicious": {
        "noConsole": "error",             // Stops development flow
        "noDebugger": "error"
      }
      // ... hundreds more rules to configure manually
    }
  },
  "formatter": {
    "quoteStyle": "single",              // Inconsistent choices
    "semicolons": "asNeeded"
  }
  // No type safety, easy to break
}
```

**Result:** Development constantly interrupted by linting errors, inconsistent team configurations.

### After (With @suin/biome.json)

```json
{
  "extends": ["@suin/biome.json"]
}
```

**Result:** Comprehensive, warning-level rules that guide without blocking development.

## The Solution

This package provides a **pre-compiled Biome configuration** that eliminates common development workflow issues:

1. **Uninterrupted coding flow** - All rules set to "warn" so you can keep coding
2. **Zero setup required** - Just extend the config and start developing
3. **Proven rule foundation** - Built on Ultracite's battle-tested preset
4. **Automatic maintenance** - Stays current with Biome and Ultracite updates
5. **Team consistency** - Everyone gets the same rules out of the box

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
  "extends": ["@suin/biome.json"]
}
```

That's it! Your project now uses the opinionated configuration with **warning-level rules** for a better development experience.

## Usage Examples

### Basic Configuration

```json
{
  "extends": ["@suin/biome.json"]
}
```

### With Custom Overrides

You can override any rules in your own `biome.json`:

```json
{
  "extends": ["@suin/biome.json"],
  "formatter": {
    "lineWidth": 120
  },
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"  // Make console warnings into errors
      }
    }
  }
}
```

### Project-Specific Customizations

```json
{
  "extends": ["@suin/biome.json"],
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
  "extends": ["@suin/biome.json"],
  "linter": {
    "rules": {
      "correctness": {
        "noUndeclaredVariables": "warn"  // Re-enable for TypeScript
      }
    }
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/suin/biome.json.git
cd biome.json

# Install dependencies
bun install

# Update Biome types (if needed)
bun run update-biome-types

# Build the configuration
bun run build
```

### Making Changes

1. **Edit `src/custom.jsonc`** with your changes
2. **Run `bun run build`** to generate the compiled config
3. **Test the changes** in a sample project
4. **Submit a PR** with your modifications

### Development Scripts

```bash
# Build the configuration
bun run build

# Update Biome TypeScript definitions
bun run update-biome-types

# Update dependencies and rebuild
bun update ultracite && bun run build

# Verify build output
cat dist/biome.json | head -20
```

### Testing Changes

```bash
# Test in a sample project
mkdir test-project && cd test-project
echo '{"extends": ["../dist/biome.json"]}' > biome.json
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

---

Built with ❤️ using [Bun](https://bun.sh), [TypeScript](https://typescriptlang.org), and [Biome](https://biomejs.dev)
