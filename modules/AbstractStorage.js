// AbstractStorage.js
//
const LS = localStorage;

// -------------------
// UTIL

function save(API) {
  var str = JSON.stringify(API.data);

  LS.setItem(API.name, str);
}

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

function open(API) {
  var str = LS.getItem(API.name);

  try {
    API.data = JSON.parse(str);
  } catch(err) {}

  API.data = API.data || {};
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
    save: {
      value: () => save(API),
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
    data: {},
  });

  open(API);

  return API;
}

export default AbstractStorage;

/*



*/
