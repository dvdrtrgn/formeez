// AbstractForm.js
//
import AbstractInput from './AbstractInput/index.js';
import AbstractStorage from './AbstractStorage.js';
import Q from './Q.js';

function getInputs(form) {
  return Q.all('input[name], select[name], textarea[name]', form);
}

function nameHash(arr, obj = {}) {
  arr.forEach(e => (e.name in obj) ? void (0) : obj[e.name] = e);
  return obj;
}

function abstractInputs(form) {
  var objs = getInputs(form);
  var arr = [];

  objs.forEach(function (e) {
    arr.push(AbstractInput(e));
  });

  return arr;
}

function readForm(self) {
  var objs = self.inputs;
  var data = {};

  objs.forEach(e => {
    var nom = e.name;
    var val = e.value;

    data[nom] = val
  });

  return self.data = data;
}

function loadForm(self) {
  var inputs = self.inputs;

  inputs.forEach(e => {
    var nom = e.name;
    var val = self.store.data[nom];
    console.log('fill', nom, val)
    e.value = val;
  });
}

function saveForm(self) {
  self.store.data = self.readForm();
  self.store.save();
}

function initStorage(self) {
  self.store = AbstractStorage.make(self.form.name);
}

function bindEvents(self) {
  self.form.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    console.log('saveForm');
    saveForm(self);
  });
}

function make(form) {
  var self;
  form = Q.one(form); // normalize for one

  if (!form) throw 'nothing there';
  if (!form.nodeName === 'FORM') throw 'not a form';
  if (!form.name) form.name = form.id;

  self = {
    form,
    readForm: () => readForm(self),
    loadForm: () => loadForm(self),
  };

  self.inputs = abstractInputs(form);
  self.hash = nameHash(self.inputs, {})

  bindEvents(self);
  initStorage(self);
  loadForm(self);

  return self;
}

export default { make };

/*

attach to form
  DATIFY ALL THE THINGS!

  abstract form

*/
