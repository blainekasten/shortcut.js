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

    shortcut('a', document.body).bindsTo(testFn1).bindsTo(testFn2);
    shortcut('b', document.body).bindsTo(testFn1);
    shortcut('c', document.body).bindsTo(testFn2);
    shortcut('d', document.body).bindsTo(testFn2).preventDefault();
    shortcut('e', document.querySelector('#phone')).bindsTo(phoneFn);
    shortcut('e', document.body).bindsTo(testFn1);
  });

  afterEach(function(){
    shortcut('a', document.body).unbind();
    shortcut('b', document.body).unbind();
    shortcut('c', document.body).unbind();
    shortcut('d', document.body).unbind();
    shortcut('e', document.querySelector('#phone')).unbind();
    shortcut('e', document.body).unbind();
  });




  // Multple functions to one shortcut
  it('should fire all bound functions', function(){
    shortcut('a', document.body).trigger()
    expect(testFn1).toHaveBeenCalled()
    expect(testFn2).toHaveBeenCalled()

    shortcut('e', document.querySelector('#phone')).trigger()
    expect(phoneFn).toHaveBeenCalled()
  });

  // element bindings
  it('should not fire a shortcut bound to targets without a second paramter', function(){
    shortcut('e', document.body).trigger()
    expect(phoneFn).not.toHaveBeenCalled()
  });

  // element bindings
  it('should not fire window functions when a second paramater is passed', function(){
    shortcut('e', document.querySelector('#phone')).trigger()
    expect(testFn1).not.toHaveBeenCalled()
  });

  // Global pause
  it('should pause every dispatch when the global pause is called', function(){
    shortcut.pause();
    shortcut('a', document.body).trigger();
    expect(testFn1).not.toHaveBeenCalled()
  });

  // Global resume
  it('should resume every dispatch when the global resume is called', function(){
    shortcut.resume();
    shortcut('a', document.body).trigger();
    expect(testFn1).toHaveBeenCalled()
  });

  // Removes associated functions
  it('-unbind() should remove functions associated to shortcut/selector', function(){
    shortcut('d', document.body).unbind()
    shortcut('d', document.body).trigger()
    expect(testFn2).not.toHaveBeenCalled()
  });

  // bindsTo function
  it('-bindsTo() should add a function to the array', function(){
    shortcut('f', document.body).bindsTo(testFn1).bindsTo(testFn2);
    expect(shortcut('f', document.body).functions().length).toBe(2);
    expect(typeof shortcut('f', document.body).functions()[0]).toBe('function');
  });

  // Prevents Default
  it('-preventDefault() should add a function to the array the preventsDefault', function(){
    // Check that it gets added
    expect(shortcut('a', document.body).preventDefault().functions().length).toBe(3);

    // make sure it prevents default, sets returnValue to false, returns false
    shortcut('i', document.body).preventDefault();
    var e = $.Event('keydown', { keyCode: 73 });
    var preventDefaultFn = shortcut('i', document.body).functions()[0];
    var retVal = preventDefaultFn(e);
    expect(retVal).toBe(false);
    expect(e.isDefaultPrevented()).toBeTruthy();
    expect(e.returnValue).toBe(false);
  });

  // Trigger function
  it('-trigger() should call the functions', function(){
    shortcut('b', document.body).trigger()
    expect(testFn1).toHaveBeenCalled()
  });

  // Chaining
  it('should be chainable', function(){
    expect(shortcut('a', document.body).bindsTo).toBeDefined()
    expect(shortcut('a', document.body).bindsTo(function(){}).bindsTo).toBeDefined()
    expect(shortcut('a', document.body).preventDefault().bindsTo).toBeDefined()
    expect(shortcut('a', document.body).pause().bindsTo).toBeDefined()
    expect(shortcut('a', document.body).resume().bindsTo).toBeDefined()
    expect(shortcut('a', document.body).trigger().bindsTo).toBeDefined()
    expect(shortcut('a', document.body).unbind().bindsTo).toBeDefined()
  });

  // shortcut pause
  it('-pause() should pause the shortcut', function(){
    shortcut('a', document.body).pause().trigger()
    expect(testFn1).not.toHaveBeenCalled()
    expect(testFn2).not.toHaveBeenCalled()
    expect(shortcut('a', document.body).isPaused).toBeTruthy()
  });

  // functions bound after pause
  it('should not call functions bound after -pause() has been called', function(){
    var testFn3 = jasmine.createSpy('testFn3');
    shortcut('a', document.body).pause().bindsTo(testFn3).trigger();
    expect(testFn3).not.toHaveBeenCalled();
  });

  // resume function
  it('should respond to shortcuts after -resume() is called', function(){
    shortcut('r', document.body).bindsTo(testFn2).pause().trigger()
    expect(testFn2).not.toHaveBeenCalled()
    shortcut('r', document.body).resume().trigger()
    expect(testFn2).toHaveBeenCalled()
    expect(shortcut('r', document.body).isPaused).toBeFalsy()
  });

  // error passing non function to bindsTo
  it('should throw an error if you do not pass a function to -bindsTo()', function(){
    expect(
      function(){
        shortcut('a', document.body).bindsTo('hello')
      }
    ).toThrow(
      new Error("You must pass a function to the bindsTo method, check the call for the shortcut('a', 'undefined') method")
    );
  });

});

