// AbstractForm.js
//
import AbstractInput from './AbstractInput/index.js';
import AbstractStorage from './AbstractStorage.js';
import Q from './Q.js';

const INPUTS = 'input[name], select[name], textarea[name]';

// -------------------
// UTIL

function getDocPath(doc) {
  var loc = doc.location;
  var path = loc.pathname.replace('index.html', '');

  return path;
}

function getAllInputs(form) {
  return Q.all(INPUTS, form);
}

function hashByName(arr, obj = {}) {
  arr.forEach(e => (e.name in obj) ? void (0) : obj[e.name] = e);
  return obj;
}

function abstractInputs(form) {
  var eles = getAllInputs(form);
  var hash = hashByName(eles); // get first of each name
  var arr = Object.values(hash); // return to array!

  return arr.map((e) => AbstractInput(e, form));
}

function prepareData(objs, data = {}) {
  objs.forEach(e => data[e.name] = e.value);
  return data;
}

// -------------------
// INTERNALS

function loadStorage(API) {
  var data = API.store.data;

  API.inputs.forEach(e => e.value = data[e.name]);
}

function saveForm(API) {
  API.store.data = API.data;
}

function initStorage(API) {
  var path = getDocPath(API.form.ownerDocument);
  var fullname = API.form.name + ':' + path;

  API.store = AbstractStorage(fullname);
}

function bindEvents(API) {
  API.form.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    saveForm(API);
  });
}

function gatherInputs(API) {
  API.inputs = abstractInputs(API.form);

  return 'All inputs abstracted for ' + API.form.name;
}

function init(API) {
  gatherInputs(API);
  bindEvents(API);

  initStorage(API);
  loadStorage(API);

  return API;
}

// -------------------
// CTOR

function _api_factory(form) {
  var API = {};

  // Define accessors
  Object.defineProperties(API, {
    form: {
      value: form,
      writable: false,
    },
    kind: {
      value: 'AbstractForm',
      writable: false,
    },
    hash: {
      get: () => hashByName(API.inputs, {}),
    },
    data: {
      get: () => prepareData(API.inputs, {}),
    },
    // prop
    inputs: {
      value: [],
      writable: true,
    },
    // meth
    loadStorage: {
      value: () => loadStorage(API),
    },
    rescan: {
      value: () => gatherInputs(API),
    },
  });

  return API;
}

function AbstractForm(form) {
  var API;

  form = Q.one(form); // normalize for one

  // ERRORS?
  if (!form) throw 'NOTHING THERE';
  if (!form.nodeName === 'FORM') throw 'NOT A FORM';
  if (!form.name) form.name = form.id;
  ///ERRORS?

  API = _api_factory(form);

  return init(API);
}

export default AbstractForm;

AbstractForm.libs = {
  AbstractInput,
  AbstractStorage,
  Q,
};

/*



*/
