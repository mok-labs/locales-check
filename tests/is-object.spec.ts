const isObject = require('../src/is-object');

describe('isObject', () => {
  describe('with empty object', () => {
    it('should return true', () => {
      expect(isObject({})).toBe(true);
    });
  });

  describe('with object with keys', () => {
    it('should return true', () => {
      expect(isObject({ hello: 'world' })).toBe(true);
    });
  });

  describe('with array', () => {
    it('should return false', () => {
      expect(isObject([])).toBe(false);
    });
  });

  describe('with string', () => {
    it('should return false', () => {
      expect(isObject('hello')).toBe(false);
    });
  });
});
