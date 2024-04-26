README
# locales-check

`locales-check` is a tiny library designed to identify discrepancies between your locale files by detecting missing keys. It analyzes the combined structure of all your locale files and provides a report on any absent keys. Currently, the library supports only JSON files, which must be stored in the same locales directory.

## Content
- [Why?](#why)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Why?
When we incorporated multiple languages into our projects, managing consistent keys across all language files became a challenge. Often, some keys were overlooked, and even code reviews occasionally failed to catch these omissions. To address this issue, we implemented this small library to then use it as a check in our Continuous Integration (CI) workflow to identify any missing keys in our locale files.


## Usage 

Install the package in your project:

With npm

```sh
npm install --save-dev locales-check
```
With yarn
```sh
yarn add -D locales-check
```


Use it via script in your `package.json` file:

```json
{
  "scripts": {
    "locales-check": "locales-check --localesPath='./path/to/locales-files/'"
  }
}
```

## Configuration
### `localesPath`

* Name: `localesPath`
* CLI argument: `--localesPath`
* Required: Yes
* Type: `string`
* Description: The path where your locales files are placed
* Examples: `./path/to/locales-files`

### `ci`

* Name: `ci`
* CLI argument: `--ci`
* Required: No
* Default: `false`
* Type: `boolean`
* Description: Causes the process to exit with exit code 1 if at least one translation key is missing or unused (useful if it is part of a CI pipeline).



## License

[MIT](LICENSE.md)
