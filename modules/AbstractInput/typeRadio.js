// AbstractRadio.js

function AbstractRadio(API) {

  Object.assign(API._, {
    dataType: 'string',
    set: function (val) {
      if (val === undefined) return 'Arg 1 needed.';

      API._.nodes.forEach(e => e.checked = (e.value === val));
    },
    get: function () {
      var val = '';

      API._.nodes.forEach(e => {
        if (e.checked) val = e.value;
      });

      return val;
    },
  });

  return API;
}

export default AbstractRadio;

/*



*/
