const { getBaseLanguage, isBaseLocale } = require('../src/get-locale-info');

describe('get-locale-info', () => {
  describe('getBaseLanguage', () => {
    it('returns the base language for base locale files (2 characters)', () => {
      expect(getBaseLanguage('en.json')).toBe('en');
      expect(getBaseLanguage('es.json')).toBe('es');
      expect(getBaseLanguage('fr.json')).toBe('fr');
      expect(getBaseLanguage('de.json')).toBe('de');
    });

    it('returns the base language for regional variant files (extracts first 2 characters)', () => {
      expect(getBaseLanguage('enUS.json')).toBe('en');
      expect(getBaseLanguage('enUK.json')).toBe('en');
      expect(getBaseLanguage('esES.json')).toBe('es');
      expect(getBaseLanguage('esCL.json')).toBe('es');
      expect(getBaseLanguage('esMX.json')).toBe('es');
      expect(getBaseLanguage('frFR.json')).toBe('fr');
      expect(getBaseLanguage('deDE.json')).toBe('de');
    });

    it('handles uppercase and mixed case file names', () => {
      expect(getBaseLanguage('EN.json')).toBe('en');
      expect(getBaseLanguage('ES.json')).toBe('es');
      expect(getBaseLanguage('EnUS.json')).toBe('en');
      expect(getBaseLanguage('EsES.json')).toBe('es');
    });

    it('handles file names without extension', () => {
      expect(getBaseLanguage('en')).toBe('en');
      expect(getBaseLanguage('es')).toBe('es');
      expect(getBaseLanguage('enUS')).toBe('en');
      expect(getBaseLanguage('esES')).toBe('es');
    });

    it('handles single character file names', () => {
      expect(getBaseLanguage('e.json')).toBe('e');
      expect(getBaseLanguage('a.json')).toBe('a');
    });
  });

  describe('isBaseLocale', () => {
    it('returns true for base locale files (exactly 2 characters)', () => {
      expect(isBaseLocale('en.json')).toBe(true);
      expect(isBaseLocale('es.json')).toBe(true);
      expect(isBaseLocale('fr.json')).toBe(true);
      expect(isBaseLocale('de.json')).toBe(true);
      expect(isBaseLocale('pt.json')).toBe(true);
      expect(isBaseLocale('it.json')).toBe(true);
    });

    it('returns false for regional variant files (more than 2 characters)', () => {
      expect(isBaseLocale('enUS.json')).toBe(false);
      expect(isBaseLocale('enUK.json')).toBe(false);
      expect(isBaseLocale('esES.json')).toBe(false);
      expect(isBaseLocale('esCL.json')).toBe(false);
      expect(isBaseLocale('esMX.json')).toBe(false);
      expect(isBaseLocale('frFR.json')).toBe(false);
      expect(isBaseLocale('deDE.json')).toBe(false);
    });

    it('returns false for non-standard file names', () => {
      expect(isBaseLocale('english.json')).toBe(false);
      expect(isBaseLocale('spanish.json')).toBe(false);
      expect(isBaseLocale('e.json')).toBe(false);
      expect(isBaseLocale('a.json')).toBe(false);
    });

    it('handles file names without extension', () => {
      expect(isBaseLocale('en')).toBe(true);
      expect(isBaseLocale('es')).toBe(true);
      expect(isBaseLocale('enUS')).toBe(false);
      expect(isBaseLocale('esES')).toBe(false);
    });

    it('handles uppercase and mixed case file names', () => {
      expect(isBaseLocale('EN.json')).toBe(true);
      expect(isBaseLocale('ES.json')).toBe(true);
      expect(isBaseLocale('En.json')).toBe(true);
      expect(isBaseLocale('EnUS.json')).toBe(false);
      expect(isBaseLocale('EsES.json')).toBe(false);
    });
  });
});
