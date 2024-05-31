const getLocalesStructure = require('../src/get-locales-structure');

const testCases = {
  missingKeys: {
    input: [
      {
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
      {
        'home': {
          'title': 'Título de inicio',
          'content': {
            'about': {
              'title': 'Sobre nosotros',
            },
            'welcome': {
              'title': "Bienvenido",
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

        'contributing': 'Contribuir',
      },
    ],
    expectedOutput: {
      'help': {
        'title': undefined,
        'content': {
          'issues': {
            'title': undefined,
            'description': undefined,
          },
        },
      },
      'contributing': undefined,
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
    },
  },
  noMissingKeys: {
    input: [
      {
        'home': {
          'title': 'Home title',
          'content': {
            'about': {
              'title': 'About us',
            },
            'welcome': {
              'title': 'Welcome',
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
      {
        'home': {
          'title': 'Título de inicio',
          'content': {
            'about': {
              'title': 'Sobre nosotros',
            },
            'welcome': {
              'title': "Bienvenido",
            },
          },
        },
        'help': {
          'title': 'Ayuda',
          'content': {
            'issues': {
              'title': 'Problemas',
              'description': 'Descripción de problemas',
            },
          },
        },
      },
    ],
    expectedOutput: {
      'help': {
        'title': undefined,
        'content': {
          'issues': {
            'title': undefined,
            'description': undefined,
          },
        },
      },
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
    },
  },
};

describe('getLocalesStructure', () => {
  describe('with missing keys', () => {
    it('returns the merge of objects', () => {
      const localesStructure = getLocalesStructure(testCases.missingKeys.input);
      expect(localesStructure).toEqual(testCases.missingKeys.expectedOutput);
    });
  });

  describe('without missing keys', () => {
    it('returns the merge of objects', () => {
      const localesStructure = getLocalesStructure(testCases.noMissingKeys.input);
      expect(localesStructure).toEqual(testCases.noMissingKeys.expectedOutput);
    });
  });
});
