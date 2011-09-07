(function() {
  var MRF, debug, doMagic, getComments, getDelay, getSizesToShow, makeReg, setNewScreenSizes, sizesInherit, sizesNotInherit, unComment;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  MRF = new Object();
  MRF.settings = {
    inheritance: true,
    live: false,
    delay: 0,
    _delay: 500,
    _delay_max: 5000,
    zone: "body"
  };
  MRF.sizes = {
    mobile: {
      size: 320,
      label: 'Mobile'
    },
    tablet: {
      size: 768,
      label: 'Tablet'
    },
    desktop: {
      size: 998,
      label: 'Desktop'
    },
    bigscreen: {
      size: 1408,
      label: 'Bigscreen'
    },
    hdtv: {
      size: 2018,
      label: 'Hdtv'
    }
  };
  MRF.screensizes = {
    current: document.width,
    previous: document.width
  };
  MRF.loadedsizes = [];
  MRF.timers = {
    loop: null,
    resize: null
  };
  setNewScreenSizes = function() {
    if (MRF.screensizes['current'] !== document.width) {
      MRF.screensizes['previous'] = MRF.screensizes['current'];
      MRF.screensizes['current'] = document.width;
      return true;
    } else {
      return false;
    }
  };
  getDelay = function(change) {
    var a;
    if (change == null) {
      change = false;
    }
    if (MRF.settings['delay'] === 0) {
      if (change) {
        return MRF.settings['_delay'] = 500;
      } else {
        a = MRF.settings['_delay'];
        MRF.settings['_delay'] = MRF.settings['_delay'] * 1.2;
        return a = a < MRF.settings['_delay_max'] ? Math.round(a) : MRF.settings['_delay_max'];
      }
    } else {
      return MRF.settings['delay'];
    }
  };
  makeReg = function(exp) {
    var i, reg, _ref;
    if (exp == null) {
      exp = "*";
    }
    reg = '^ ?(';
    if (typeof exp === "string") {
      if (exp === "*") {
        reg += MRF.sizes['mobile']['label'] + '|' + MRF.sizes['tablet']['label'] + '|' + MRF.sizes['desktop']['label'] + '|' + MRF.sizes['bigscreen']['label'] + '|' + MRF.sizes['hdtv']['label'];
      } else {
        reg += exp;
      }
    } else {
      for (i = 0, _ref = exp.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        reg += exp[i];
        if (i !== exp.length - 1) {
          reg += "|";
        }
      }
    }
    reg += ')';
    return new RegExp(reg);
  };
  getComments = function(exp, zone) {
    var c, children, comments, e, r, reg, _i, _j, _len, _len2, _ref;
    if (exp == null) {
      exp = "*";
    }
    if (zone == null) {
      zone = MRF.settings['zone'];
    }
    if (typeof zone === "string") {
      if (zone === "html" || zone === "body") {
        e = document.getElementsByTagName(zone)[0];
      } else {
        e = document.getElementById(zone);
      }
    } else {
      e = zone;
    }
    children = e.childNodes;
    comments = [];
    reg = makeReg(exp);
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      c = children[_i];
      if (c.nodeType === 8) {
        if (reg.test(c.nodeValue)) {
          comments.push(c);
        }
      }
      if (c.nodeType === 1) {
        _ref = getComments(exp, c);
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          r = _ref[_j];
          comments.push(r);
        }
      }
    }
    return comments;
  };
  unComment = function(node) {
    var parent, v;
    parent = node.parentNode;
    v = document.createElement("div");
    v.innerHTML = node.nodeValue.replace(makeReg(), "");
    while (v.firstChild) {
      parent.insertBefore(v.firstChild, node);
    }
    return parent.removeChild(node);
  };
  sizesInherit = function() {
    var a, s, sizes, _i, _len;
    sizes = [];
    a = ['mobile', 'tablet', 'desktop', 'bigscreen', 'hdtv'];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      s = a[_i];
      if (MRF.screensizes['current'] >= MRF.sizes[s]['size']) {
        sizes.push(MRF.sizes[s]['label']);
      }
    }
    return sizes;
  };
  sizesNotInherit = function() {
    var a, s, sizes, _i, _len;
    sizes = [];
    a = ['mobile', 'tablet', 'desktop', 'bigscreen', 'hdtv'];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      s = a[_i];
      if (MRF.screensizes['current'] >= MRF.sizes[s]['size']) {
        sizes[0] = MRF.sizes[s]['label'];
      }
    }
    return sizes;
  };
  getSizesToShow = function() {
    var sizes, t, t_sizes, _i, _len;
    sizes = [];
    if (MRF.settings['inheritance']) {
      t_sizes = sizesInherit();
    } else {
      t_sizes = sizesNotInherit();
    }
    for (_i = 0, _len = t_sizes.length; _i < _len; _i++) {
      t = t_sizes[_i];
      if (__indexOf.call(MRF.loadedsizes, t) < 0) {
        sizes.push(t);
      }
    }
    return sizes;
  };
  doMagic = function() {
    var c, changed, comments, delay, e, exp, _i, _j, _len, _len2;
    changed = setNewScreenSizes();
    exp = getSizesToShow();
    comments = getComments(exp);
    for (_i = 0, _len = comments.length; _i < _len; _i++) {
      c = comments[_i];
      unComment(c);
    }
    for (_j = 0, _len2 = exp.length; _j < _len2; _j++) {
      e = exp[_j];
      MRF.loadedsizes.push(e);
    }
    delay = getDelay(changed);
    if (MRF.loadedsizes.length < 5) {
      return MRF.timers['loop'] = setTimeout(doMagic, delay);
    }
  };
  debug = function(s) {
    return document.getElementById('cont').innerHTML = s;
  };
  doMagic();
}).call(this);
