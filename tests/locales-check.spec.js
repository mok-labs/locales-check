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
        { 'File': 'en.json', 'Missing Key': 'home.content.why.title' },
        { 'File': 'en.json', 'Missing Key': 'home.content.about.title' },
        { 'File': 'en.json', 'Missing Key': 'contributing' },
        { 'File': 'es.json', 'Missing Key': 'help.title' },
        { 'File': 'es.json', 'Missing Key': 'help.content.issues.description' },
      ]);
    });

    it('does not call process.exit by default', () => {
      localesCheck('tests/fixtures/locales-without-missing-keys');
      expect(processExitSpy).not.toHaveBeenCalled();
    });

    describe('when ci is false', () => {
      it('does not call process.exit with code 1', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys', false);
        expect(processExitSpy).not.toHaveBeenCalled();
      });
    });

    describe('when ci is true', () => {
      it('calls process.exit with code 1', () => {
        localesCheck('tests/fixtures/locales-with-missing-keys', true);
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
      it('does not call process.exit', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys', true);
        expect(processExitSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('backward compatibility - without fallback (no base locales)', () => {
    describe('when there are missing keys', () => {
      it('logs info title', () => {
        localesCheck('tests/fixtures/locales-with-missing-keys-without-fallback');
        expect(consoleInfoSpy).toHaveBeenCalledWith('CHECK LOCALES FAILED - Missing keys in locales files:');
      });

      it('logs missing keys in table format (compares all files)', () => {
        localesCheck('tests/fixtures/locales-with-missing-keys-without-fallback');
        expect(consoleTableSpy).toHaveBeenCalled();
        const tableCall = consoleTableSpy.mock.calls[0][0];
        expect(tableCall).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ 'File': 'esES.json', 'Missing Key': 'home.title' }),
            expect.objectContaining({ 'File': 'esES.json', 'Missing Key': 'help.title' }),
          ])
        );
      });

      describe('when ci is true', () => {
        it('calls process.exit with code 1', () => {
          localesCheck('tests/fixtures/locales-with-missing-keys-without-fallback', true);
          expect(processExitSpy).toHaveBeenCalledWith(1);
        });
      });
    });

    describe('when there are no missing keys', () => {
      it('does not log info title', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys-without-fallback');
        expect(consoleInfoSpy).not.toHaveBeenCalled();
      });

      it('does not log missing keys in table format', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys-without-fallback');
        expect(consoleTableSpy).not.toHaveBeenCalled();
      });

      it('does not call process.exit', () => {
        localesCheck('tests/fixtures/locales-without-missing-keys-without-fallback');
        expect(processExitSpy).not.toHaveBeenCalled();
      });
    });
  });
});
