
var aEvent = $.Event('keydown');
aEvent.keyCode = 65;

describe('shortcut.js', function(){
  var testFn1, testFn2, phoneFn, preventsDefault;

  beforeEach(function(){
    testFn1 = jasmine.createSpy('testFn1');
    testFn2 = jasmine.createSpy('testFn1');
    phoneFn = jasmine.createSpy('phoneFn');
    preventsDefault = spyOn(aEvent, 'preventDefault');

    $(document.body).append('<input id="phone"></input>');

    shortcut('a').bindsTo(testFn1).bindsTo(testFn2);
    shortcut('b').bindsTo(testFn1);
    shortcut('c').bindsTo(testFn2);
    shortcut('d').bindsTo(testFn2).preventDefault();
    shortcut('e', '#phone').bindsTo(phoneFn);
    shortcut('e').bindsTo(testFn1);
  });

  afterEach(function(){
    shortcut('a').unbind();
    shortcut('b').unbind();
    shortcut('c').unbind();
    shortcut('d').unbind();
    shortcut('e', '#phone').unbind();
    shortcut('e').unbind();
  });




  // Multple functions to one shortcut
  it('should fire all bound functions', function(){
    shortcut('a').trigger()
    expect(testFn1).toHaveBeenCalled()
    expect(testFn2).toHaveBeenCalled()

    shortcut('e', '#phone').trigger()
    expect(phoneFn).toHaveBeenCalled()
  });

  // element bindings
  it('should not fire a shortcut bound to targets without a second paramter', function(){
    shortcut('e').trigger()
    expect(phoneFn).not.toHaveBeenCalled()
  });

  // element bindings
  it('should not fire window functions when a second paramater is passed', function(){
    shortcut('e', '#phone').trigger()
    expect(testFn1).not.toHaveBeenCalled()
  });

  // No Conflict mode
  it('should properly utilize noConflict()', function(){
    var s = shortcut.noConflict();
    expect(shortcut).toBeUndefined();
    window.shortcut = s;
  });

  // Global pause
  it('should pause every dispatch when the global pause is called', function(){
    shortcut.pause();
    shortcut('a').trigger();
    expect(testFn1).not.toHaveBeenCalled()
  });

  // Global resume
  it('should resume every dispatch when the global resume is called', function(){
    shortcut.resume();
    shortcut('a').trigger();
    expect(testFn1).toHaveBeenCalled()
  });

  // Removes associated functions
  it('-unbind() should remove functions associated to shortcut/selector', function(){
    shortcut('d').unbind()
    shortcut('d').trigger()
    expect(testFn2).not.toHaveBeenCalled()
  });

  // bindsTo function
  it('-bindsTo() should add a function to the array', function(){
    shortcut('f').bindsTo(testFn1).bindsTo(testFn2);
    expect(shortcut('f').functions().length).toBe(2);
    expect(typeof shortcut('f').functions()[0]).toBe('function');
  });

  // Prevents Default
  it('-preventDefault() should add a function to the array the preventsDefault', function(){
    // Check that it gets added
    expect(shortcut('a').preventDefault().functions().length).toBe(3);

    // make sure it prevents default, sets returnValue to false, returns false
    shortcut('i').preventDefault();
    var e = $.Event('keydown', { keyCode: 73 });
    var preventDefaultFn = shortcut('i').functions()[0];
    var retVal = preventDefaultFn(e);
    expect(retVal).toBe(false);
    expect(e.isDefaultPrevented()).toBeTruthy();
    expect(e.returnValue).toBe(false);
  });

  // Trigger function
  it('-trigger() should call the functions', function(){
    shortcut('b').trigger()
    expect(testFn1).toHaveBeenCalled()
  });

  // Chaining
  it('should be chainable', function(){
    expect(shortcut('a').bindsTo).toBeDefined()
    expect(shortcut('a').bindsTo(function(){}).bindsTo).toBeDefined()
    expect(shortcut('a').preventDefault().bindsTo).toBeDefined()
    expect(shortcut('a').pause().bindsTo).toBeDefined()
    expect(shortcut('a').resume().bindsTo).toBeDefined()
    expect(shortcut('a').trigger().bindsTo).toBeDefined()
    expect(shortcut('a').unbind().bindsTo).toBeDefined()
  });

  // shortcut pause
  it('-pause() should pause the shortcut', function(){
    shortcut('a').pause().trigger()
    expect(testFn1).not.toHaveBeenCalled()
    expect(testFn2).not.toHaveBeenCalled()
    expect(shortcut('a').isPaused).toBeTruthy()
  });

  // functions bound after pause
  it('should not call functions bound after -pause() has been called', function(){
    var testFn3 = jasmine.createSpy('testFn3');
    shortcut('a').pause().bindsTo(testFn3).trigger();
    expect(testFn3).not.toHaveBeenCalled();
  });

  // resume function
  it('should respond to shortcuts after -resume() is called', function(){
    shortcut('r').bindsTo(testFn2).pause().trigger()
    expect(testFn2).not.toHaveBeenCalled()
    shortcut('r').resume().trigger()
    expect(testFn2).toHaveBeenCalled()
    expect(shortcut('r').isPaused).toBeFalsy()
  });

  // error passing non function to bindsTo
  it('should throw an error if you do not pass a function to -bindsTo()', function(){
    expect(function(){shortcut('a').bindsTo('hello')}).toThrow(new Error("You must pass a function to the bindsTo functoin"));
  });

  it('should be a registered AMD module', function(){
    require(['shortcut'], function(_shortcut){
      expect(shortcut).toBe(_shortcut);
    })

  });

});
