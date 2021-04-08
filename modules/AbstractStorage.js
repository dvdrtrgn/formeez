// AbstractStorage.js
//
const LS = localStorage;

function save(obj) {
  var str = JSON.stringify(obj.data);

  LS.setItem(obj.name, str);
}

function backup(obj) {
  var str = LS.getItem(obj.name);

  if (confirm('Rewrite backup data?')) {
    LS.setItem(obj.name + '_bu', str);
    return 'backup done!';
  }
  return 'skipping backup';
}

function restore(obj) {
  var str = LS.getItem(obj.name + '_bu');

  LS.setItem(obj.name, str);
}

function open(obj) {
  var str = LS.getItem(obj.name);

  try {
    obj.data = JSON.parse(str);
  } catch(err) {}

  obj.data = obj.data || {};
}

function make(str) {
  if (!str) throw 'need name';
  var obj = {};

  obj = {
    kind: 'AbstractStorage',
    name: str,
    data: {},
    save: () => save(obj),
    backup: () => backup(obj),
    restore: () => restore(obj),
  };

  open(obj);

  return obj;
}

export default { make };

/*



*/
