(function() {
  var MRF, UnComment, c, getComments, getDelay, makeReg, setNewScreenSizes, _i, _len, _ref;
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
    var reg;
    if (exp == null) {
      exp = "*";
    }
    reg = '^ ?(';
    if (exp === "*") {
      reg += MRF.sizes['mobile']['label'] + '|' + MRF.sizes['tablet']['label'] + '|' + MRF.sizes['desktop']['label'] + '|' + MRF.sizes['bigscreen']['label'] + '|' + MRF.sizes['hdtv']['label'];
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
  UnComment = function(node) {
    var parent, v;
    parent = node.parentNode;
    v = document.createElement("div");
    v.innerHTML = node.nodeValue.replace(makeReg(), "");
    while (v.firstChild) {
      parent.insertBefore(v.firstChild, node);
    }
    parent.removeChild(node);
    return "ok";
  };
  _ref = getComments();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    c = _ref[_i];
    UnComment(c);
  }
}).call(this);
