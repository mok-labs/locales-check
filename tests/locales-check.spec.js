const localesCheck = require('../src/locales-check');
describe('localesCheck', () => {
  let consoleInfoSpy;
  let consoleTableSpy;
  let processExitSpy;

  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleTableSpy = jest.spyOn(console, 'table').mockImplementation();
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
  });

  afterEach(() => {
    consoleInfoSpy.mockClear();
    consoleTableSpy.mockClear();
    processExitSpy.mockClear();
  });

  describe('when there are missing keys', () => {
    it('logs info title', () => {
      localesCheck('tests/fixtures/locales-with-missing-keys');
      expect(consoleInfoSpy).toHaveBeenCalledWith('CHECK LOCALES FAILED - Missing keys in locales files:');
    });

    it('logs missing keys in table format', () => {
      localesCheck('tests/fixtures/locales-with-missing-keys');
      expect(consoleTableSpy).toHaveBeenCalledWith([
        { 'File': 'english.json', 'Missing Key': 'home.content.why.title' },
        { 'File': 'english.json', 'Missing Key': 'home.content.about.title' },
        { 'File': 'english.json', 'Missing Key': 'contributing' },
        { 'File': 'spanish.json', 'Missing Key': 'help.title' },
        { 'File': 'spanish.json', 'Missing Key': 'help.content.issues.description' },
      ]);
    });

    it('does not call process.exit by default', () => {
      localesCheck('tests/fixtures/locales-without-missing-keys');
      expect(processExitSpy).not.toHaveBeenCalled();
    });

    describe('when ci is false', () => {
      it('does not call process.exit with code 1', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys', ci = false);
        expect(processExitSpy).not.toHaveBeenCalled();
      });
    });

    describe('when ci is true', () => {
      it('calls process.exit with code 1', () => {
        localesCheck('tests/fixtures/locales-with-missing-keys', ci = true);
        expect(processExitSpy).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('when there are no missing keys', () => {
    it('does not log info title', () => {
      localesCheck('tests/fixtures/locales-without-missing-keys');
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it('does not log missing keys in table format', () => {
      localesCheck('tests/fixtures/locales-without-missing-keys');
      expect(consoleTableSpy).not.toHaveBeenCalled();
    });

    it('does not call process.exit', () => {
      localesCheck('tests/fixtures/locales-without-missing-keys');
      expect(processExitSpy).not.toHaveBeenCalled();
    });

    describe('when ci is true', () => {
      it('does not call process.exitt', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys', ci = true);
        expect(processExitSpy).not.toHaveBeenCalled();
      });
    });
  });
});
