jest.autoMockOff();


var shortcut = require('../index.js');

describe('shortcut library', function(){

  describe('public methods', function(){
    it('global pause mode', function(){
      var mock = jest.genMockFunction();

      shortcut('shift a').bindsTo(mock);
      shortcut.pause();

      shortcut('shift a').trigger();

      expect(mock).not.toBeCalled();
    });

    it('global resume mode', function(){
      var mock = jest.genMockFunction();

      shortcut('shift a').bindsTo(mock);
      shortcut.pause();
      shortcut.resume();

      shortcut('shift a').trigger();

      expect(mock).toBeCalled();
    });
  });


  describe('implementations', function(){
    it('should bind to the window for functions', function(){
      //var keyDownEvent = new window.Event('keydown');
      //var keyUpEvent = new window.Event('keyup');
      console.log(window);
    });
  });

});
