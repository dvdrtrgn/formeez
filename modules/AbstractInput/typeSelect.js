// AbstractSelect.js

function AbstractSelect(API) {

  Object.assign(API._, {
    dataType: 'mixed',
    set: function (val) {
      if (val === undefined) return 'Arg 1 needed.';

      if (val === true) {
        API._.nodes.forEach(e => e.selected = true);
      } else {
        if (!Array.isArray(val)) val = [val];

        API._.nodes.forEach(e => e.selected = val.includes(e.value));
      }
    },
    get: function () {
      var val = [];
      var opts = Array.from(API._.dom.selectedOptions);

      // "from" is nice for HTMLCollection(avoids for:in & for:of)
      opts.forEach(e => val.push(e.value));

      return API.multiVal ? val : val[0];
    },
  });

  return API;
}

export default AbstractSelect;

/*



*/
