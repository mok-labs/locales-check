const getLocalesFiles = require('../src/get-locales-files');

const testCases = {
  missingKeys: {
    localesPath: 'tests/fixtures/locales-with-missing-keys',
    expectedOutput: {
      'en.json': {
        'home': {
          'title': 'Check your translations',
          'content': {},
        },
        'help': {
          'title': "Do you need help?",
          'content': {
            'issues': {
              'title': "If you have any issues, please report them on the GitHub repository.",
              'description': "We will try to fix them as soon as possible.",
            },
          },
        },
      },
      'es.json': {
        'home': {
          'title': "Revisa tus traducciones",
          'content': {
            'why': {
              'title': "Manejar traducciones en múltiples idiomas en tu aplicación es difícil, estamos para ayudarte",
            },
            'about': {
              'title': "Somos un proyecto open source, si quieres contribuir, ¡bienvenido!",
            },
          },
        },
        'help': {
          'content': {
            'issues': {
              'title': "Si tienes algún problema, escribe un issue en el repositorio de github",
            },
          },
        },

        'contributing': "Contribuir",
      },
      'enUS.json': {},
      'esES.json': {},
    },

  },
  noMissingKeys: {
    localesPath: 'tests/fixtures/locales-without-missing-keys',
    expectedOutput: {
      'en.json': {
        'home': {
          'title': "Check your translations",
          'content': {
            'why': {
              'title': "Handling multiple languages translations in your app is hard, we are here to help.",
            },
            'about': {
              'title': "We are an open source project, welcome to contribute.",
            },
          },
        },
        'help': {
          'title':  "Do you need help?",
          'content': {
            'issues': {
              'title': "If you have any issues, please report them on the GitHub repository.",
              'description': "We will try to fix them as soon as possible.",
            },
          },
        },
      },
      'es.json': {
        'home': {
          'title': "Revisa tus traducciones",
          'content': {
            'why': {
              'title': "Manejar traducciones en múltiples idiomas en tu aplicación es difícil, estamos para ayudarte",
            },
            'about': {
              'title': "Somos un proyecto open source, si quieres contribuir, ¡bienvenido!",
            },
          },
        },
        'help': {
          'title': "¿Necesitas ayuda?",
          'content': {
            'issues': {
              'title':  "Si tienes algún problema, escribe un issue en el repositorio de github",
              'description': "Intentaremos resolverlo lo antes posible",
            },
          },
        },
      },
      'enUS.json': {},
      'esES.json': {},
    },
  },
  missingKeysWithoutFallback: {
    localesPath: 'tests/fixtures/locales-with-missing-keys-without-fallback',
    expectedOutput: {
      'enUS.json': {
        'home': {
          'title': 'Check your translations',
          'content': {},
        },
        'help': {
          'title': "Do you need help?",
          'content': {
            'issues': {
              'title': "If you have any issues, please report them on the GitHub repository.",
              'description': "We will try to fix them as soon as possible.",
            },
          },
        },
      },
      'esES.json': {},
    },
  },
  noMissingKeysWithoutFallback: {
    localesPath: 'tests/fixtures/locales-without-missing-keys-without-fallback',
    expectedOutput: {
      'enUS.json': {
        'home': {
          'title': "Check your translations",
          'content': {
            'why': {
              'title': "Handling multiple languages translations in your app is hard, we are here to help.",
            },
            'about': {
              'title': "We are an open source project, welcome to contribute.",
            },
          },
        },
        'help': {
          'title':  "Do you need help?",
          'content': {
            'issues': {
              'title': "If you have any issues, please report them on the GitHub repository.",
              'description': "We will try to fix them as soon as possible.",
            },
          },
        },
      },
      'esES.json': {
        'home': {
          'title': "Revisa tus traducciones",
          'content': {
            'why': {
              'title': "Manejar traducciones en múltiples idiomas en tu aplicación es difícil, estamos para ayudarte",
            },
            'about': {
              'title': "Somos un proyecto open source, si quieres contribuir, ¡bienvenido!",
            },
          },
        },
        'help': {
          'title': "¿Necesitas ayuda?",
          'content': {
            'issues': {
              'title':  "Si tienes algún problema, escribe un issue en el repositorio de github",
              'description': "Intentaremos resolverlo lo antes posible",
            },
          },
        },
      },
    },
  },
};

describe('getLocalesFiles', () => {
  describe('with missing keys (with fallback)', () => {
    it('returns an object with the parsed JSON files', () => {
      const localesFiles = getLocalesFiles(testCases.missingKeys.localesPath);
      expect(localesFiles).toEqual(testCases.missingKeys.expectedOutput);
    });
  });

  describe('without missing keys (with fallback)', () => {
    it('returns an object with the parsed JSON files', () => {
      const localesFiles = getLocalesFiles(testCases.noMissingKeys.localesPath);
      expect(localesFiles).toEqual(testCases.noMissingKeys.expectedOutput);
    });
  });

  describe('with missing keys (without fallback - backward compatibility)', () => {
    it('returns an object with the parsed JSON files', () => {
      const localesFiles = getLocalesFiles(testCases.missingKeysWithoutFallback.localesPath);
      expect(localesFiles).toEqual(testCases.missingKeysWithoutFallback.expectedOutput);
    });
  });

  describe('without missing keys (without fallback - backward compatibility)', () => {
    it('returns an object with the parsed JSON files', () => {
      const localesFiles = getLocalesFiles(testCases.noMissingKeysWithoutFallback.localesPath);
      expect(localesFiles).toEqual(testCases.noMissingKeysWithoutFallback.expectedOutput);
    });
  });
});
