// Q.js
//
// import { test, buildIndexCSSPath, fullPath } from './Q.junk.js';

const Q = {
  // buildIndexCSSPath,
  // fullPath,
  // test,
  type: function (arg) {
    if (!arg) return false;
    if (arg.jquery) return 'jquery';
    if (arg.querySelector) return 'element';
    if (arg.constructor === NodeList) return 'nodelist';
    if (arg.constructor === HTMLCollection) return 'nodelist';
    if (Array.isArray(arg)) return 'array';

    try {
      document.querySelectorAll(arg);
      return 'selector';
    } catch (e) { }

    return false;
  },
  normalize: function (arg, scope) {
    var type = this.type(arg);

    if (type === false) return [];
    if (type === 'array') return arg;
    if (type === 'element') return [arg];
    if (type === 'selector') {
      arg = (scope || document).querySelectorAll(arg);
    }

    return Array.from(arg);
  },
  root: function (scope) {
    if (!scope) return document;
    var newScope = this.normalize(scope)[0];

    if (!newScope) {
      console.warn('Q: document scope, not ', scope);
      newScope = document;
    } else if (!newScope.querySelector) {
      throw 'Q: bad scope';
    }

    return newScope;
  },
  all: function (query, scope) {
    return this.normalize(query, this.root(scope));
  },
  one: function (query, scope) {
    return this.all(query, scope)[0];
  },
};

export default Q;
