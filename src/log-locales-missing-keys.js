function logLocalesMissingKeys(missingKeys) {
  console.info('CHECK LOCALES FAILED - Missing keys in locales files:');
  const missingKeysInTableFormat = Object.entries(missingKeys).flatMap(([localeFileName, missingKeyPaths]) =>
    missingKeyPaths.map(missingKeyPath => ({ 'File': localeFileName, 'Missing Key': missingKeyPath })),
  );
  console.table(missingKeysInTableFormat);
}

module.exports = logLocalesMissingKeys;
