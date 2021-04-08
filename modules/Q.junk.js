// Q.junk.js
//
import Q from './Q.js';

const samples = [
  'foobarz',
  'body',
  true,
  document.querySelector('body'),
  document.querySelectorAll('body'),
  document.getElementsByTagName('body'),
  $('body'),
  $('body').get(),
  '',
  {},
  '!body',
  null,
  function () { },
];

function test() {
  samples.forEach(function (e) {
    var out = 'unknown';
    try {
      out = Q.type(e);
    } catch (e) { }
    console.log('Qtest', out, Q.normalize(e), { e });
  });
}

function fullPath(ele) {
  var names = [];
  while (ele.parentNode) {
    if (ele.id) {
      names.unshift('#' + ele.id);
      break;
    } else {
      if (ele == ele.ownerDocument.documentElement) names.unshift(ele.tagName);
      else {
        for (var c = 1, e = ele; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(`${ele.tagName}:nth-child(${c})`);
      }
      ele = ele.parentNode;
    }
  }
  return names.join(' > ');
}

function buildIndexCSSPath(ele) {
  var parent = ele.parentNode;
  var frag;

  // if this is the root node, include its tag name the start of the string
  if (parent === document) { return ele.tagName; }

  // find this element's index as a child, and recursively ascend
  frag = buildIndexCSSPath(parent) + ' > :nth-child(';
  return frag + (Array.prototype.indexOf.call(parent.children, ele) + 1) + ')';
}

export { test, buildIndexCSSPath, fullPath };
