const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { coerce } = require('./index');


describe('Coerce', () => {
  describe('Keywords', () => {
    it('turns \'true\' values to true', () => {
      assert.deepStrictEqual(coerce({ foo: 'true' }), { foo: true });
    });

    it('turns \'false\' values to false', () => {
      assert.deepStrictEqual(coerce({ foo: 'false' }), { foo: false });
    });

    it('turns \'null\' values to null', () => {
      assert.deepStrictEqual(coerce({ foo: 'null' }), { foo: null });
    });

    it('turns \'undefined\' values to undefined', () => {
      assert.deepStrictEqual(coerce({ foo: 'undefined' }), { foo: undefined });
    });
  });

  describe('Params', () => {
    it('runs shallow param through an uppercase formatter', () => {
      assert.deepStrictEqual(
        coerce({ foo: 'hi' }, { coerceMap: { foo: (val) => val.toUpperCase() } }, 'foo'),
        { foo: 'HI' }
      );
    });

    it('runs deep param through an uppercase formatter', () => {
      assert.deepStrictEqual(
        coerce({ foo: { boo: 'hi' } }, { coerceMap: { 'foo.boo': (val) => val.toUpperCase() } }, 'foo.boo'),
        { foo: { boo: 'HI' } }
      );
    });
  });
});
