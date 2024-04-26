const logLocalesMissingKeys = require('../src/log-locales-missing-keys');
describe('logLocalesMissingKeys', () => {
  let consoleInfoSpy;
  let consoleTableSpy;

  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleTableSpy = jest.spyOn(console, 'table').mockImplementation();
    logLocalesMissingKeys({
      'english.json': [
        'contributing',
        'home.content.welcome.description',
        'home.content.about.description',
      ],
      'spanish.json': [
        'help.title',
        'help.content.issues.description',
      ],
    });
  });
  describe('when there are missing keys', () => {
    it('logs info title', () => {
      expect(consoleInfoSpy).toHaveBeenCalledWith('CHECK LOCALES FAILED - Missing keys in locales files:');
    });

    it('logs missing keys in table format', () => {
      expect(consoleTableSpy).toHaveBeenCalledWith([
        { 'File': 'english.json', 'Missing Key': 'contributing' },
        { 'File': 'english.json', 'Missing Key': 'home.content.welcome.description' },
        { 'File': 'english.json', 'Missing Key': 'home.content.about.description' },
        { 'File': 'spanish.json', 'Missing Key': 'help.title' },
        { 'File': 'spanish.json', 'Missing Key': 'help.content.issues.description' },
      ]);
    });
  });
});
