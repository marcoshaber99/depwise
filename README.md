[![npm version](https://badge.fury.io/js/depwise.svg)](https://www.npmjs.com/package/depwise)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

# depwise

**depwise** is a CLI tool for evaluating the health of npm packages. It provides an overview of package status by analyzing various metrics and presenting them in an easy-to-read format.

## Overview

depwise helps you make informed decisions about which npm packages to use in your projects by providing key insights:

View on npm: [depwise](https://www.npmjs.com/package/depwise)

- Latest version and release date information
- Weekly download statistics
- Deprecation status alerts
- GitHub repository metrics (stars, open issues, last update)
- All information presented in a clean, formatted table

## Installation

Install globally via npm:

```bash
npm install -g depwise
```

Or run directly using npx:

```bash
npx depwise react lodash axios
```

## Usage

Simply run depwise followed by one or more package names:

```bash
depwise react lodash axios
```

## Example

Here's what the output looks like when inspecting popular packages:

```bash
$ depwise react lodash axios
Fetching package data...

┌─────────┬────────────────┬──────────────────────────┬────────────┬────────────┬─────────┬─────────────┬──────────────────────┐
│ Package │ Latest Version │ Release Time             │ Downloads  │ Deprecated │ Stars   │ Open Issues │ Last Updated         │
├─────────┼────────────────┼──────────────────────────┼────────────┼────────────┼─────────┼─────────────┼──────────────────────┤
│ react   │ 19.0.0         │ 2024-12-05T18:10:21.804Z │ 23,859,617 │ None       │ 232,033 │ 962         │ 2025-02-06T14:29:00Z │
├─────────┼────────────────┼──────────────────────────┼────────────┼────────────┼─────────┼─────────────┼──────────────────────┤
│ lodash  │ 4.17.21        │ 2021-02-20T15:42:16.891Z │ 46,454,052 │ None       │ 60,101  │ 87          │ 2025-02-06T14:14:47Z │
├─────────┼────────────────┼──────────────────────────┼────────────┼────────────┼─────────┼─────────────┼──────────────────────┤
│ axios   │ 1.7.9          │ 2024-12-04T07:38:16.833Z │ 46,953,183 │ None       │ 106,256 │ 671         │ 2025-02-06T14:28:48Z │
└─────────┴────────────────┴──────────────────────────┴────────────┴────────────┴─────────┴─────────────┴──────────────────────┘
```
