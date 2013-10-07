class window.KeyHolder

  constructor: (keyArr, fn, el) ->
    @keyArr = @keys(keyArr)
    @fn = window[fn]
    @setupTruths()
    el.addEventListener('keydown', @keydown)
    el.addEventListener('keyup', @keyup)


  keydown: (e) =>
    char = @evaluateKey(e)
    @addTruth(e, char)
    @callFunction()


  keyup: (e) => 
    char = @evaluateKey(e)
    @removeTruth(e, char)


  callFunction: ->
    @evaluateLaunch()
    if @launch is true
      if (typeof @fn is not 'function')
        alert 'not a function'
      @fn.apply(window, arguments)
      console.log 'ran function'
      @resetTruths()


  evaluateKey: (e) ->
    char = switch 
      when e.keyCode is 91 then 'meta'
      when e.keyCode is 16 then 'shift'
      when e.keyCode is 18 then 'optn'
      when e.keyCode is 17 then 'ctrl'
      when e.keyCode is 32 then 'space'
      when e.keyCode is 40 then 'down'
      when e.keyCode is 39 then 'right'
      when e.keyCode is 38 then 'up'
      when e.keyCode is 37 then 'left'
      when e.keyCode is 9 then 'tab'
      when e.keyCode is 13 then 'rtn'

    if !char
      char = String.fromCharCode(e.keyCode || e.charCode).toLowerCase()
    char


  evaluateLaunch: ->
    @launch = true
    for key in Object.keys(@truths)
      if !@truths[key] 
        @launch = false


  keys: (obj) ->
    keys = []
    for k in obj
      keys.push(k)
    keys


  setupTruths: ->
    @truths = {}
    for i in @keyArr
      @truths[i] = false


  addTruth: (e, char) ->
    if @keyArr.includes(char)
      @truths[char] = true


  removeTruth: (e, char) ->
    if @keyArr.includes(char)
      @truths[char] = false


  resetTruths: ->
    for key in Object.keys(@truths)
      @truths[key] = false
    @launch = false
