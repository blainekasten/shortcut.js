(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.KeyHolder = (function() {
    function KeyHolder(keyArr, fn, el) {
      this.keyup = __bind(this.keyup, this);
      this.keydown = __bind(this.keydown, this);
      this.keyArr = this.keys(keyArr);
      this.fn = window[fn];
      this.setupTruths();
      el.addEventListener('keydown', this.keydown);
      el.addEventListener('keyup', this.keyup);
    }

    KeyHolder.prototype.keydown = function(e) {
      var char;
      char = this.evaluateKey(e);
      this.addTruth(e, char);
      return this.callFunction();
    };

    KeyHolder.prototype.keyup = function(e) {
      var char;
      char = this.evaluateKey(e);
      return this.removeTruth(e, char);
    };

    KeyHolder.prototype.callFunction = function() {
      this.evaluateLaunch();
      if (this.launch === true) {
        if (typeof this.fn === !'function') {
          alert('not a function');
        }
        this.fn.apply(window, arguments);
        console.log('ran function');
        return this.resetTruths();
      }
    };

    KeyHolder.prototype.evaluateKey = function(e) {
      var char;
      char = (function() {
        switch (false) {
          case e.keyCode !== 91:
            return 'meta';
          case e.keyCode !== 16:
            return 'shift';
          case e.keyCode !== 18:
            return 'optn';
          case e.keyCode !== 17:
            return 'ctrl';
          case e.keyCode !== 32:
            return 'space';
          case e.keyCode !== 40:
            return 'down';
          case e.keyCode !== 39:
            return 'right';
          case e.keyCode !== 38:
            return 'up';
          case e.keyCode !== 37:
            return 'left';
          case e.keyCode !== 9:
            return 'tab';
          case e.keyCode !== 13:
            return 'rtn';
        }
      })();
      if (!char) {
        char = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
      }
      return char;
    };

    KeyHolder.prototype.evaluateLaunch = function() {
      var key, _i, _len, _ref, _results;
      this.launch = true;
      _ref = Object.keys(this.truths);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (!this.truths[key]) {
          _results.push(this.launch = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    KeyHolder.prototype.keys = function(obj) {
      var k, keys, _i, _len;
      keys = [];
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        k = obj[_i];
        keys.push(k);
      }
      return keys;
    };

    KeyHolder.prototype.setupTruths = function() {
      var i, _i, _len, _ref, _results;
      this.truths = {};
      _ref = this.keyArr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(this.truths[i] = false);
      }
      return _results;
    };

    KeyHolder.prototype.addTruth = function(e, char) {
      if (this.keyArr.includes(char)) {
        return this.truths[char] = true;
      }
    };

    KeyHolder.prototype.removeTruth = function(e, char) {
      if (this.keyArr.includes(char)) {
        return this.truths[char] = false;
      }
    };

    KeyHolder.prototype.resetTruths = function() {
      var key, _i, _len, _ref;
      _ref = Object.keys(this.truths);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.truths[key] = false;
      }
      return this.launch = false;
    };

    return KeyHolder;

  })();

  Array.prototype.includes = function(val) {
    if (this.lastIndexOf(val) === -1) {
      return false;
    } else {
      return true;
    }
  };

}).call(this);
