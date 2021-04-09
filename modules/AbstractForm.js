// AbstractForm.js
//
import AbstractInput from './AbstractInput/index.js';
import AbstractStorage from './AbstractStorage.js';
import Q from './Q.js';

const INPUTS = 'input[name], select[name], textarea[name]';

// -------------------
// UTIL

function getInputs(form) {
  if (!form) throw 'form needed';
  return Q.all(INPUTS, form);
}

function nameHash(arr, obj = {}) {
  arr.forEach(e => (e.name in obj) ? void (0) : obj[e.name] = e);

  return obj;
}

// -------------------
// INTERNALS

function abstractInputs(API) {
  console.log(API.form)
  var objs = getInputs(API.form);
  var arr = [];

  objs.forEach(function (e) {
    arr.push(AbstractInput(e));
  });

  return arr;
}

function prepareData(API) {
  var objs = Object.values(API.hash);
  var data = {};

  objs.forEach(e => {
    var nom = e.name;
    var val = e.value;

    data[nom] = val
  });

  return data;
}

function loadStorage(API) {
  var objs = Object.values(API.hash);

  objs.forEach(e => {
    var nom = e.name;
    var val = API.store.data[nom];

    e.value = val;
  });
}

function saveForm(API) {
  API.store.data = API.data;
}

function initStorage(API) {
  API.store = AbstractStorage(API.form.name);
}

function bindEvents(API) {
  API.form.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    saveForm(API);
  });
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
      get: () => nameHash(API.inputs, {}),
    },
    abstractInputs: {
      get: () => abstractInputs(API),
    },
    data: {
      get: () => prepareData(API),
    },
    loadStorage: {
      value: () => loadStorage(API),
    },
  });

  return API;
}

function AbstractForm(form) {
  var API;

  form = Q.one(form); // normalize for one

  // ERRORS?
  if (!form) throw 'nothing there';
  if (!form.nodeName === 'FORM') throw 'not a form';
  if (!form.name) form.name = form.id;
  ///ERRORS?

  API = _api_factory(form);

  // Assign props/meths
  Object.assign(API, {
    inputs: API.abstractInputs,
    rawinputs: getInputs(API.form),
  });

  bindEvents(API);
  initStorage(API);

  API.loadStorage();

  return API;
}

export default AbstractForm;

AbstractForm.libs = {
  AbstractInput,
  AbstractStorage,
  Q,
};

/*



*/
