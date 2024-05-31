const getLocalesMissingKeys = require('../src/get-locales-missing-keys');

const testCases = {
  missingKeys: {
    structure: {
      'home': {
        'title': undefined,
        'content': {
          'welcome': {
            'title': undefined,
          },
          'about': {
            'title': undefined,
          },
        },
      },
      'contact': undefined,
      'help': {
        'title': undefined,
        'content': {
          'issues': {
            'title': undefined,
            'description': undefined,
          },
        },
      },
    },
    localesFiles: {
      'english.json': {
        'home': {
          'title': 'Home title',
          'content': {},
        },
        'help': {
          'title': 'Help title',
          'content': {
            'issues': {
              'title': 'Issues title',
              'description': 'Issues description',
            },
          },
        },
      },
      'spanish.json': {
        'home': {
          'title': 'Título de inicio',
          'content': {
            'welcome': {
              'title': 'Bienvenida',
            },
          },
        },
        'help': {
          'content': {
            'issues': {
              'title': 'Título de problemas',
            },
          },
        },

        'contact': 'Contacto',
      },
    },
    expectedOutput: {
      'english.json': [
        'home.content.welcome.title',
        'home.content.about.title',
        'contact',
      ],
      'spanish.json': [
        'home.content.about.title',
        'help.title',
        'help.content.issues.description',
      ],
    },
  },
  noMissingKeys: {
    structure: {
      'home': {
        'title': undefined,
        'content': {
          'welcome': {
            'title': undefined,
            'description': undefined,
          },
          'about': {
            'title': undefined,
          },
        },
      },
      'help': {
        'title': undefined,
        'content': {
          'issues': {
            'title': undefined,
          },
        },
      },
    },
    localesFiles: {
      'english.json': {
        'home': {
          'title': 'Home title',
          'content': {
            'welcome': {
              'title': 'Welcome',
              'description': 'Welcome description',
            },
            'about': {
              'title': 'About',
            },
          },
        },
        'help': {
          'title': 'Help title',
          'content': {
            'issues': {
              'title': 'Issues title',
              'description': 'Issues description',
            },
          },
        },
      },
      'spanish.json': {
        'home': {
          'title': 'Título de inicio',
          'content': {
            'welcome': {
              'title': 'Bienvenida',
              'description': 'Descripción de bienvenida',
            },
            'about': {
              'title': 'Acerca de',
            },
          },
        },
        'help': {
          'title': 'Título de ayuda',
          'content': {
            'issues': {
              'title': 'Título de problemas',
              'description': 'Descripción de problemas',
            },
          },
        },
      },
    },
    expectedOutput: {},
  },
};

describe('getLocalesMissingKeys', () => {
  describe('with missing keys', () => {
    it('returns an object with missing keys', () => {
      const missingKeys = getLocalesMissingKeys(
        testCases.missingKeys.structure, testCases.missingKeys.localesFiles,
      );
      expect(missingKeys).toEqual(testCases.missingKeys.expectedOutput);
    });
  });

  describe('without missing keys', () => {
    it('returns an empty object', () => {
      const missingKeys = getLocalesMissingKeys(
        testCases.noMissingKeys.structure, testCases.noMissingKeys.localesFiles,
      );
      expect(missingKeys).toEqual(testCases.noMissingKeys.expectedOutput);
    });
  });
});
