// AbstractForm.js
//
import AbstractInput from './AbstractInput/index.js';
import AbstractStorage from './AbstractStorage.js';
import Q from './Q.js';

const INPUTS = 'input[name], select[name], textarea[name]';

function getInputs(form) {
  if (!form) throw 'form needed';
  return Q.all(INPUTS, form);
}

// -------------------
// UTIL

function nameHash(arr, obj = {}) {
  arr.forEach(e => (e.name in obj) ? void (0) : obj[e.name] = e);
  return obj;
}

function abstractInputs(API) {
  console.log(API.form)
  var objs = getInputs(API.form);
  var arr = [];

  objs.forEach(function (e) {
    arr.push(AbstractInput(e));
  });

  return arr;
}

function readForm(API) {
  var objs = Object.values(API.hash);
  var data = {};

  objs.forEach(e => {
    var nom = e.name;
    var val = e.value;
    console.log('read', nom, val)
    data[nom] = val
  });

  return API.data = data;
}

function loadForm(API) {
  var objs = Object.values(API.hash);

  objs.forEach(e => {
    var nom = e.name;
    var val = API.store.data[nom];
    console.log('load', nom, val)
    e.value = val;
  });
}

function saveForm(API) {
  API.store.data = API.readForm();
  API.store.save();
}

function initStorage(API) {
  API.store = AbstractStorage(API.form.name);
}

function bindEvents(API) {
  API.form.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    console.log('saveForm');
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
    read: {
      value: () => readForm(API),
    },
    load: {
      value: () => loadForm(API),
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
    d: form,
    data: null,
    scanForInputs: function () {

    },
    inputs: abstractInputs(API),
  });

  bindEvents(API);
  initStorage(API);
  loadForm(API); // get from storage

  return API;
}

export default AbstractForm;

/*



*/
