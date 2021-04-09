// AbstractForm.js
//
import AbstractInput from './AbstractInput/index.js';
import AbstractStorage from './AbstractStorage.js';
import Q from './Q.js';

function getInputs(form) {
  return Q.all('input[name], select[name], textarea[name]', form);
}

function abstractInputs(form) {
  var inputs = getInputs(form);
  var arr = [];

  inputs.forEach(function (e) {
    arr.push(AbstractInput(e));
  });

  return arr;
}

function readForm(obj) {
  var inputs = obj.inputs;
  var data = {};

  inputs.forEach(e => {
    var nom = e.name;
    if (!nom) return;
    var val = e.value;

    data[nom] = val
  });

  return obj.data = data;
}

function loadForm(obj) {
  var inputs = obj.inputs;

  inputs.forEach(e => {
    var nom = e.name;
    var val = obj.store.data[nom];

    e.value = val;
  });
}

function saveForm(obj) {
  obj.store.data = obj.readForm();
  obj.store.save();
}

function initStorage(obj) {
  obj.store = AbstractStorage.make(obj.form.name);
}

function bindEvents(obj) {
  obj.form.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    console.log('saveForm');
    saveForm(obj);
  });
}

function make(form) {
  var obj;
  form = Q.one(form); // normalize for one

  if (!form) throw 'nothing there';
  if (!form.nodeName === 'FORM') throw 'not a form';
  if (!form.name) form.name = form.id;

  obj = {
    form,
    readForm: () => readForm(obj),
    loadForm: () => loadForm(obj),
  };

  obj.inputs = abstractInputs(form);

  bindEvents(obj);
  initStorage(obj);
  loadForm(obj);

  return obj;
}

export default { make };

/*

attach to form
  DATIFY ALL THE THINGS!

  abstract form

*/
