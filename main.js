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

function preTweak() {

  // Q.all('*').forEach(function (ele) {
  //   ele.indeterminate = true;
  // });

  Q.all('input[type=hidden]').forEach(function (ele) {
    ele.parentElement.addEventListener('click', function () {
      this.firstElementChild.type = 'text';
    });
  });

}

function init() {
  var Foo = Q.one('#Foo');
  preTweak();

  Foo = AbstractForm(Foo);

  Util.export_to({ Main: API, Foo, Q, Util }, window)

  console.table(API);
}

Util.ready(init);

/*


*/
