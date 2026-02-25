# Changelog

All notable changes to this repository will be documented in this file.

> The format is based on [Keep a Changelog](https://keepachangelog.com/en/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-20

### 🚀 Added
- **Locale fallback system support**
  - When base locale files are present (e.g., `en.json`, `es.json`), the library now uses a fallback system:
    - Base locale files are compared against each other and must have the same keys
    - Regional variant files (e.g., `esES.json`, `enUS.json`, `esCL.json`) are automatically ignored
    - Regional variants use their base locale as fallback, so missing keys in variants are not reported
    - Only base locale files are checked and reported when missing keys are found
  - This allows regional variants to have incomplete translations without triggering errors

### 🤖 Changed
- Internal logic now automatically detects and separates base locales from regional variants
- Regional variants no longer trigger missing key errors when base locales are present (they use fallback)

### ✅ Backward Compatible
- **Fully backward compatible**: The library maintains the original behavior when no base locale files are detected
  - If only non-base locale files are present (e.g. `enUS.json`, `esES.json`), all files are compared as before
  - Existing repositories without base locale files will continue to work exactly as they did in v1.0.0
  - No changes required in existing codebases - the library automatically detects the locale structure and applies the appropriate behavior

## [1.0.0] - 2024-05-31

> First release of the library to check locales missing keys
### 🚀 Added
- [PR#1](https://github.com/mok-labs/locales-check/pull/1) Logic to report missing keys from cli and ci, setup of jest, eslint and github cli
