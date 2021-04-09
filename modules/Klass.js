// Klass.js
//
import Q from './Q.js';

const Klass = {
  try: function (meth, eles, noms) {
    try {
      eles = Q.all(eles);
      noms = noms.trim();
      noms.split(' ').forEach(function (nom) {
        eles.forEach(e => e.classList[meth](nom));
      });
    } catch (err) {
      console.log(err.toString());
    }
    return eles;
  },
  add: function (eles, noms) {
    return this.try('add', eles, noms);
  },
  remove: function (eles, noms) {
    return this.try('remove', eles, noms);
  },
  toggle: function (eles, noms) {
    return this.try('toggle', eles, noms);
  },
};

export default Klass;

Klass.libs = {
  Q,
};
