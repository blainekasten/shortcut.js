jest.dontMock('../binds_to.js');
jest.dontMock('../mappings.js');

var bindsTo = require('../binds_to.js');
var mappings = require('../mappings.js');
var error = require('../error.js');

describe('bindsTo', function(){
  beforeEach(function(){
    mappings['shift a'] = {};
    mappings['shift a']['input'] = [];

    this.shortcut = {
      keys: 'shift a',
      selector: 'input',
      bindsTo: bindsTo
    }
  });

  it('should error if passed a non fn', function(){
    this.shortcut.bindsTo(2);
    expect(error).toBeCalled();
  });

  it('should passing the function to the mapping', function(){
    var mock = jest.genMockFunction();

    this.shortcut.bindsTo(mock);

    expect(mappings[this.shortcut.keys][this.shortcut.selector][0]).toEqual(mock);
  });

  it('should be chainable', function(){
    var mock = jest.genMockFunction();

    this.shortcut.bindsTo(mock).bindsTo(mock);

    expect(mappings[this.shortcut.keys][this.shortcut.selector].length).toEqual(2);
  });
});

