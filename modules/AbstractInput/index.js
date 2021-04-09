// AbstractInput.js

import AbstractSelect from './typeSelect.js';
import AbstractRadio from './typeRadio.js';
import AbstractCheckbox from './typeCheckbox.js';

const OptionTypes = ['checkbox', 'radio', 'select-one', 'select-multiple'];
const Name = 'AbstractInput';

// -------------------
// UTIL

function ascertain(arg) {
  var ele = $(arg);

  if (!ele.length) { // not element or useful selector?
    if (typeof arg === 'string') {
      ele = $(`[name=${arg}]`);
    }
    ele = ele.length ? ele : $('<x>');
  }

  return ele.get(0); // just the elements
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

function _api_factory(name) {
  var API = {};

  // Define accessors
  Object.defineProperties(API, {
    name: {
      value: name,
      writable: false,
    },
    _: {
      value: { // outline normals
        dataType: 'string',
        form: null,
        name: null,
        query: null,
      },
      writable: false,
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
      get: function (all) {
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

function AbstractInput(name, form) {
  var API, query, dom;

  name = ascertain(name).name;
  API = _api_factory(name);

  // ERRORS?
  if (!name) throw Name + ': no name';
  query = `[name=${name}]`;
  dom = (form || document).querySelector(query);
  if (!dom) throw Name + ': no dom';
  if (!dom.type) throw Name + ': no type';
  ///ERRORS?

  if (!form) form = dom.form;
  if (!form) {
    console.warn('No form for ' + name);
    form = document;
  }

  // Assign PRIVATE props/meths
  Object.assign(API._, {
    name,
    form,
    query,
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
      return AbstractRadio(API);
    case 'checkbox':
      return AbstractCheckbox(API);
    case 'select-one':
    case 'select-multiple':
      return AbstractSelect(API);
    default: return API;
  }

}

export default AbstractInput;

AbstractInput.libs = {
  AbstractSelect,
  AbstractRadio,
  AbstractCheckbox,
};

/*

  data types
    1: 'text', get/set [string]
    2: radio, get/set [string] + options 'checked'
    3: select [mixed] + options
    3.1: select-one, get/set [string] 'selected'
    3.2: select-multiple, get/set [array] 'selected 1+'
    4: checkbox, get/set [mixed] + options 'checked 1+'

*/
