(function() {
  var MRF, doMagic, getComments, getDelay, getSizesToShow, makeReg, setNewScreenSizes, unComment;
  MRF = new Object();
  MRF.settings = {
    inheritance: false,
    live: false,
    delay: 0,
    _delay: 500,
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
    current: 0,
    previous: screen.width
  };
  MRF.loadedsizes = [];
  setNewScreenSizes = function() {
    MRF.screensizes['previous'] = MRF.screensizes['current'];
    return MRF.screensizes['current'] = screen.width;
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
        MRF.settings['_delay'] = MRF.settings['_delay'] * 1.5;
        return a;
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
  getSizesToShow = function() {
    var a, c, i, s, sizes, x, _i, _len;
    sizes = [];
    i = MRF.settings['inheritance'];
    c = MRF.screensizes['current'];
    s = MRF.sizes;
    a = ['mobile', 'tablet', 'desktop', 'bigscreen', 'hdtv'];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      x = a[_i];
      if (c > s[x]['size']) {
        if (i) {
          sizes.push(s[x]['label']);
        } else {
          sizes[0] = s[x]['label'];
        }
      }
    }
    return sizes;
  };
  doMagic = function() {
    var c, comments, exp, _i, _len, _results;
    setNewScreenSizes();
    exp = getSizesToShow();
    comments = getComments(exp);
    _results = [];
    for (_i = 0, _len = comments.length; _i < _len; _i++) {
      c = comments[_i];
      _results.push(unComment(c));
    }
    return _results;
  };
  doMagic();
}).call(this);
