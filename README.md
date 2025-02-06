# depwise

**depwise** is a CLI tool for evaluating the health of npm packages. It provides a comprehensive overview of package status by analyzing various metrics and presenting them in an easy-to-read format.

## Overview

depwise helps you make informed decisions about which npm packages to use in your projects by providing key insights:

- Latest version and release date information
- Weekly download statistics
- Deprecation status alerts
- GitHub repository metrics (stars, open issues, last update)
- All information presented in a clean, formatted table

## Installation

You can install **depwise** globally (when published) or run it using `npx`:

```bash
# If published:
npm install -g depwise

# Run with:
depwise react lodash axios

# Alternatively, try without installing:
npx depwise react lodash axios
```

## Examples

Here's what the output looks like when inspecting popular packages:

```bash
$ depwise react lodash axios

Fetching package data...

┌─────────┬────────────┬─────────────┬───────────┬────────────┬───────┬─────────────┬──────────────┐
│ Package │ Version    │ Release     │ Downloads │ Deprecated │ Stars │ Open Issues │ Last Updated │
├─────────┼────────────┼─────────────┼───────────┼────────────┼───────┼─────────────┼──────────────┤
│ react   │ 18.2.0     │ 2022-06-14  │ 23.5M     │ No        │ 214k  │ 1.1k        │ 2024-03-15   │
│ lodash  │ 4.17.21    │ 2021-04-10  │ 45.2M     │ No        │ 57.4k │ 178         │ 2024-03-10   │
│ axios   │ 1.6.7      │ 2024-01-31  │ 32.1M     │ No        │ 103k  │ 412         │ 2024-03-14   │
└─────────┴────────────┴─────────────┴───────────┴────────────┴───────┴─────────────┴──────────────┘
```

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/depwise.git

# Install dependencies
cd depwise
npm install

# Run tests
npm test
```
