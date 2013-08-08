/*globals Node:true, NodeList:true*/
$$ = (function (document, window, $$) {
  // Node covers all elements, but also the document objects
  var node = Node.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      trigger = 'trigger',
      each = [][forEach],
      cookies = {},
      // note: createElement requires a string in Firefox
      dummy = document.createElement('i');

  nodeList[forEach] = each;

  // we have to explicitly add a window.on as it's not included
  // in the Node object.
  window.on = node.on = function (event, fn) {
    this.addEventListener(event, fn, false);

    // allow for chaining
    return this;
  };

  nodeList.on = function (event, fn) {
    this[forEach](function (el) {
      el.on(event, fn);
    });
    return this;
  };

  node.remove = function() {
    this.parentNode.removeChild(this);
  };
  nodeList.remove = function() {
    this[forEach](function (el) {
      el.parentNode.removeChild(el);
    });
  };

  node.addClass = function(_class) {
    if (this.className.indexOf(_class) === -1) {
      this.className += ' '+_class;
    }
    return this;
  };
  nodeList.addClass = function(_class) {
    this[forEach](function(el) {
      this.addClass(_class);
    });
    return this;
  };

  node.removeClass = function(_class) {
    var reg = new RegExp(' ?'+_class+' ?', 'g');
    this.className.replace(reg, '');

    return this;
  };
  nodeList.removeClass = function(_class) {
    this[forEach](function(el) {
      this.removeClass(_class);
    });

    return this;
  };

  node.parent = function() {
    return this.parentNode;
  };

  node.after = function(el) {
    if ( this.parentNode ) {
      this.parentNode.insertBefore( el, this.nextSibling );
    }

    return this;
  };
  node.before = function(el) {
    if ( this.parentNode ) {
      this.parentNode.insertBefore( el, this );
    }

    return this;
  };

  // we save a few bytes (but none really in compression)
  // by using [trigger] - really it's for consistency in the
  // source code.
  window[trigger] = node[trigger] = function (type, data) {
    // construct an HTML event. This could have
    // been a real custom event
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList[trigger] = function (event) {
    this[forEach](function (el) {
      el[trigger](event);
    });
    return this;
  };

  node.find = function (klass) {
    var r = this.querySelectorAll(klass || '☺'),
        length = r.length;
    return length == 1 ? r[0] : r;
  };

  node.hasClass = function (klass) {
    return ((" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(klass) > -1) ? true : false;
  }

  // Get a cookie value
  cookies.get = function(key) {
    return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }

  $$ = function (s) {
    // querySelectorAll requires a string with a length
    // otherwise it throws an exception
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;
    // if we have a single element, just return that.
    // if there's no matched elements, return a nodeList to chain from
    // else return the NodeList collection from qSA
    return length == 1 ? r[0] : r;
  };

  // $$.on and $$.trigger allow for pub/sub type global
  // custom events.
  $$.on = node.on.bind(dummy);
  $$[trigger] = node[trigger].bind(dummy);

  $$.cookies = cookies

  if ( typeof define === "function") {
    define( "jsmin", [], function () { return $$; } );
  }

  return $$;
})(document, this);

