[![npm version](https://badge.fury.io/js/depwise.svg)](https://www.npmjs.com/package/depwise)
[![Downloads](https://img.shields.io/npm/dm/depwise.svg)](https://www.npmjs.com/package/depwise)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

# depwise

**depwise** is a CLI tool for evaluating the health of npm packages. It provides a comprehensive overview of package status by analyzing various metrics and presenting them in an easy-to-read format.

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

## Examples

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

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the tests (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/marcoshaber99/depwise.git

# Install dependencies
cd depwise
npm install

# Run tests
npm test
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Roadmap

Future enhancements may include:

- Security vulnerability scanning
- Dependency tree analysis
- Package size analysis
- TypeScript support detection
- Custom metric thresholds
- JSON output format for programmatic usage
