jest.dontMock('../evaluate_key.js');
var evaluateKey = require('../evaluate_key.js')

describe('evaluating the key', function(){

  it('return mod properly', function(){
    navigator.platform = 'yo';
    expect( evaluateKey({keyCode: 17}) ).toEqual('mod');
    expect( evaluateKey({keyCode: 224}) ).not.toEqual('mod');
    expect( evaluateKey({keyCode: 91}) ).not.toEqual('mod');

    navigator.platform = 'Mac';
    expect( evaluateKey({keyCode: 17}) ).not.toEqual('mod');
    expect( evaluateKey({keyCode: 224}) ).toEqual('mod');
    expect( evaluateKey({keyCode: 91}) ).toEqual('mod');
  });

  it('returns shift', function(){
    expect( evaluateKey({keyCode: 16}) ).toEqual('shift');
  });

  it('returns optn', function(){
    expect( evaluateKey({keyCode: 18}) ).toEqual('optn');
  });

  it('returns space', function(){
    expect( evaluateKey({keyCode: 32}) ).toEqual('space');
  });

  it('returns down', function(){
    expect( evaluateKey({keyCode: 40}) ).toEqual('down');
  });

  it('returns up', function(){
    expect( evaluateKey({keyCode: 38}) ).toEqual('up');
  });

  it('returns right', function(){
    expect( evaluateKey({keyCode: 39}) ).toEqual('right');
  });

  it('returns left', function(){
    expect( evaluateKey({keyCode: 37}) ).toEqual('left');
  });

  it('returns tab', function(){
    expect( evaluateKey({keyCode: 9}) ).toEqual('tab');
  });

  it('returns rtn', function(){
    expect( evaluateKey({keyCode: 13}) ).toEqual('rtn');
  });

  it('returns regular alpha characters', function(){
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // charCodes start at 65
    for (var i = 65, l = alphabet.length + 65; i < l; i ++) {
      expect( evaluateKey({keyCode: i}) ).toEqual( alphabet[i - 65] );
    }
  });

});
