// Util.js
//
import Klass from './Klass.js';

function iterate_with(obj, fn) {
  var keys = Object.keys(obj);

  keys.forEach(fn);
}

function export_to(obj1, obj2) {
  iterate_with(obj1, i => obj2[i] = obj1[i])
}

function ready(fn) {
  document.addEventListener("DOMContentLoaded", fn)
}

export default { class: Klass, ready, iterate_with, export_to };
