// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
//
// import 'https://code.jquery.com/jquery-3.6.0.slim.min.js';
import AbstractInput from './modules/AbstractInput/index.js';
import AbstractForm from './modules/AbstractForm.js';
import Util from './modules/Util.js';
import Q from '../modules/Q.js';

var API = {
  libs: {
    AbstractForm,
    AbstractInput,
    Util,
    Q,
  },
};

function init() {
  var form = Q.one('#Foo');

  form = AbstractForm.make(form);

  Util.export_to({ Main: API, form, Q, Util }, window)

  console.table(API);

  Q.all('input[type=hidden]').forEach(function (e) {
    e.parentElement.addEventListener('click', function () {
      this.firstElementChild.type = 'text';
    });
  });

}

Util.ready(init);

/*


*/
