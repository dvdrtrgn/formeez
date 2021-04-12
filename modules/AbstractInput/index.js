// AbstractInput.js

import AbstractSelect from './typeSelect.js';
import AbstractRadio from './typeRadio.js';
import AbstractCheckbox from './typeCheckbox.js';
import Q from '../Q.js';

const OptionTypes = ['checkbox', 'radio', 'select-one', 'select-multiple'];
const Name = 'AbstractInput';

// -------------------
// UTIL

function ascertain(query, scope) {
  var ele = Q.normalize(query, scope);

  if (!ele.length) { // not element or useful selector?
    if (typeof query === 'string') {
      ele = Q.all(`[name=${query}]`);
    }
  }
  return ele[0]; // just first element
}

function hasOptions(API) {
  return OptionTypes.includes(API.type);
}

function isSelect(API) {
  return Boolean(API.type.match(/^select/));
}

function isMulti(API) {
  var multi = API._.dom.multiple;

  if (API.type === 'checkbox') {
    multi = (API._.nodes.length > 1);
  }
  return multi;
}

// -------------------
// CTOR

function _api_factory(ele) {
  var API = {};
  var name = ele.name;
  var form = ele.form || document;

  // Define accessors
  Object.defineProperties(API, {
    name: {
      value: name,
      writable: false,
    },
    _: {
      value: { // outline normals
        dataType: 'string',
        form: form,
        name: name,
        query: `[name=${name}]`,
      },
      writable: false,
    },
    query: {
      get: () => `[name=${name}]`,
    },
    multiVal: {
      get: () => isMulti(API),
    },
    type: {
      get: () => API._.dom.type,
    },
    options: {
      get: () => hasOptions(API) ? API._.nodes.map(e => e.value) : [],
    },
    value: {
      get: () => API._.get(),
      set: (x) => API._.set(x),
    },
  });

  // PRIVATE accessors
  // nonstatic (main/nodes) as form fields might be added/removed
  Object.defineProperties(API._, {
    dom: {
      get: () => API._.form.querySelector(API._.query),
    },
    nodes: {
      get: function () {
        var all;

        if (isSelect(API)) {
          all = API._.dom.querySelectorAll('option');
        } else {
          all = API._.form.querySelectorAll(API._.query);
        }
        return Array.from(all);
      },
    },
  });

  return API;
}

function AbstractInput(sel, form) {
  var dom = ascertain(sel, form);
  var API = _api_factory(dom);

  // ERRORS?
  if (!dom) throw Name + ': no dom';
  if (!dom.name) throw Name + ': no name';
  if (!dom.type) throw Name + ': no type';
  ///ERRORS?

  if (API.form === document) console.warn('No form for ' + dom.name);

  // Assign PRIVATE props/meths
  Object.assign(API._, {
    get: function () {
      return API._.dom.value;
    },
    set: function (val) {
      if (val === undefined) return 'Arg 1 needed.';
      try {
        API._.dom.value = val;
      } catch (err) {
        console.log(err.toString());
      }
      return val;
    },
  });

  // Mutate get/setters for types
  switch (API.type) {
    case 'radio':
      AbstractRadio(API); break;
    case 'checkbox':
      AbstractCheckbox(API); break;
    case 'select-one':
    case 'select-multiple':
      AbstractSelect(API); break;
  }
  return Object.seal(API);
}

// -------------------

export default AbstractInput;

AbstractInput.libs = {
  AbstractSelect,
  AbstractRadio,
  AbstractCheckbox,
};

/*



*/
