const { expect } = require('chai');
const { coerce } = require('./index');


describe('Coerce', () => {
  describe('Keywords', () => {
    it('turns \'true\' values to true', () => {
      expect(coerce({
        foo: 'true'
      })).to.deep.equal({
        foo: true
      });
    });

    it('turns \'false\' values to false', () => {
      expect(coerce({
        foo: 'false'
      })).to.deep.equal({
        foo: false
      });
    });

    it('turns \'null\' values to null', () => {
      expect(coerce({
        foo: 'null'
      })).to.deep.equal({
        foo: null
      });
    });

    it('turns \'undefined\' values to undefined', () => {
      expect(coerce({
        foo: 'undefined'
      })).to.deep.equal({
        foo: undefined
      });
    });
  });

  describe('Params', () => {
    it('runs shallow param through an uppercase formatter', () => {
      expect(coerce({
        foo: 'hi'
      }, { coerceMap: { foo: (val) => val.toUpperCase() }}, 'foo')).to.deep.equal({
        foo: 'HI'
      });
    });

    it('runs deep param through an uppercase formatter', () => {
      expect(coerce({
        foo: {
          boo: 'hi'
        }
      }, { coerceMap: { 'foo.boo': (val) => val.toUpperCase() }}, 'foo.boo')).to.deep.equal({
        foo: {
          boo: 'HI'
        }
      });
    });
  });
});
