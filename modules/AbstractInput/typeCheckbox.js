// AbstractCheckbox.js

function AbstractCheckbox(API) {

  Object.assign(API._, {
    dataType: 'mixed',
    set: function (val) {
      if (val === undefined) return 'Arg 1 needed.';

      if (val === true) {
        API._.nodes.forEach(e => e.checked = true);
      } else {
        if (!Array.isArray(val)) val = [val];

        API._.nodes.forEach(e => e.checked = val.includes(e.value));
      }
    },
    get: function () {
      var val = [];

      API._.nodes.forEach(e => {
        if (e.checked) val.push(e.value);
      });

      return API.multiVal ? val : val[0];
    },
  });

  return API;
}

export default AbstractCheckbox;

/*



*/
