const getLocalesMissingKeys = require('../src/get-locales-missing-keys');
const getLocalesStructure = require('../src/get-locales-structure');

describe('getLocalesMissingKeys', () => {
  describe('with base locales missing keys', () => {
    it('returns missing keys when base locales have missing keys', () => {
      const localesFiles = {
        'en.json': {
          'home': {
            'title': 'Home title',
            'content': {},
          },
          'help': {
            'title': 'Help title',
          },
        },
        'es.json': {
          'home': {
            'title': 'Título de inicio',
            'content': {
              'welcome': {
                'title': 'Bienvenida',
              },
            },
          },
        },
      };
      
      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result['en.json']).toBeDefined();
      expect(result['es.json']).toBeDefined();
      expect(result['en.json']).toContain('home.content.welcome.title');
      expect(result['es.json']).toContain('help.title');
    });
  });

  describe('with regional variants missing keys', () => {
    it('does not report regional variants (they use fallback)', () => {
      const localesFiles = {
        'es.json': {
          'home': {
            'title': 'Título de inicio',
            'content': {
              'welcome': {
                'title': 'Bienvenida',
              },
            },
          },
        },
        'esES.json': {
          'home': {
            'title': 'Título de inicio',
          },
        },
      };
      
      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result).not.toHaveProperty('esES.json');
      expect(result).toEqual({});
    });
  });

  describe('with no missing keys', () => {
    it('returns empty object when all base locale keys are present', () => {
      const localesFiles = {
        'en.json': {
          'home': {
            'title': 'Home title',
            'content': {
              'welcome': {
                'title': 'Welcome',
              },
            },
          },
        },
        'es.json': {
          'home': {
            'title': 'Título de inicio',
            'content': {
              'welcome': {
                'title': 'Bienvenida',
              },
            },
          },
        },
      };

      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result).toEqual({});
    });
  });

  describe('with only regional variants (no base locales)', () => {
    it('returns empty object (regional variants are not checked)', () => {
      const localesFiles = {
        'esES.json': {
          'home': {
            'title': 'Título de inicio',
          },
        },
      };

      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result).toEqual({});
    });
  });

  describe('with multiple base locales and regional variants', () => {
    it('only reports missing keys in base locales, ignores regional variants', () => {
      const localesFiles = {
        'en.json': {
          'home': {
            'title': 'Home',
            'content': {
              'welcome': {
                'title': 'Welcome',
              },
            },
          },
        },
        'es.json': {
          'home': {
            'title': 'Inicio',
          },
        },
        'enUS.json': {
          'home': {
            'title': 'Home',
          },
        },
        'esES.json': {
          'home': {
            'title': 'Inicio',
            'content': {
              'welcome': {
                'title': 'Bienvenida',
              },
            },
          },
        },
      };
      
      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result['es.json']).toBeDefined();
      expect(result['es.json']).toContain('home.content.welcome.title');
      
      expect(result['enUS.json']).toBeUndefined();
      expect(result['esES.json']).toBeUndefined();
    });
  });

  describe('with no base locales (backward compatibility)', () => {
    it('compares all files when no base locales are present (original behavior)', () => {
      const localesFiles = {
        'en.json': {
          'home': {
            'title': 'Home',
            'content': {
              'welcome': {
                'title': 'Welcome',
              },
            },
          },
        },
        'es.json': {
          'home': {
            'title': 'Inicio',
          },
        },
      };
      
      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result['es.json']).toBeDefined();
      expect(result['es.json']).toContain('home.content.welcome.title');
    });

    it('works with only regional variants when no base locales exist', () => {
      const localesFiles = {
        'esES.json': {
          'home': {
            'title': 'Inicio',
            'content': {
              'welcome': {
                'title': 'Bienvenida',
              },
            },
          },
        },
        'enUS.json': {
          'home': {
            'title': 'Home',
          },
        },
      };
      
      const mergedStructure = getLocalesStructure(Object.values(localesFiles));
      
      const result = getLocalesMissingKeys(mergedStructure, localesFiles);
      
      expect(result['enUS.json']).toBeDefined();
      expect(result['enUS.json']).toContain('home.content.welcome.title');
    });
  });
});
