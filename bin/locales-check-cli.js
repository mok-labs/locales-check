#!/usr/bin/env node
const cli = require('cac')();
const localesCheck = require('../src/locales-check');

cli
  .command('[path]', 'Check json locales files for missing keys')
  .option('--localesPath <localesPath>', 'Specify the path to locales')
  .option('--ci', 'Exit with code 1 if there are missing keys')
  .action((path, options) => {
    if (options && options.localesPath) {
      localesCheck(options.localesPath, !!options.ci);
    } else {
      console.error('localesPath is required.');
      process.exit(1);
    }
  });
cli.help();

cli.parse();
