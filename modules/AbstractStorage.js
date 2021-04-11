// AbstractStorage.js
//
const LS = localStorage;

// -------------------
// UTIL

function backup(API) {
  var str = LS.getItem(API.name);

  if (confirm('Rewrite backup data?')) {
    LS.setItem(API.name + '_bu', str);

    return 'backup done!';
  }
  return 'skipping backup';
}

function restore(API) {
  var str = LS.getItem(API.name + '_bu');

  LS.setItem(API.name, str);

  location.reload(); // TODO remove?
}

function write(API, obj) {
  var str = JSON.stringify(obj);

  if (str) LS.setItem(API.name, str);
}

function read(API) {
  var str = LS.getItem(API.name);
  var data = {};

  try {
    data = JSON.parse(str);
  } catch (err) { }

  return data || {};
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
    kind: {
      value: 'AbstractStorage',
      writable: false,
    },
    data: {
      get: () => read(API),
      set: (obj) => write(API, obj),
    },
    backup: {
      value: () => backup(API),
    },
    restore: {
      value: () => restore(API),
    },
  });

  return API;
}

function AbstractStorage(name) {
  var API;

  if (!name) throw 'need name';

  API = _api_factory(name);

  // Assign props/meths
  Object.assign(API, {
  });

  return API;
}

export default AbstractStorage;

/*



*/
