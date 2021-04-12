# Formeez

A breeding ground for micro-libs

Tired of these things?
* reading a checkbox by seeing if it is checked and then deriving the value?
* trying to set a radio buttons by iterating over them to see which is which?
* getting or setting selects by touching all the options and selected properties?

This little collection of modules helps when dealing with things like getting
form data structure (inputs) to act more like data objects in scripting.

----
## Helper libs
Supporting modules do fundamentally useful query-type stuff.

### `Q.js`
Helps with element querying

### `Klass.js`
Does basic class name manipulation

### `Util.js`
Misc, like exporting values to global scope, provides "ready-hook"

----

## Form Ease

Ease your use of forms, and stuff.


### `AbstractForm.js`

A simple constructt to treat a form logically without the strangeness. (see "Objections" below)
It abstracts all inputs into one object for easy access and storage.
It uses the libs shown below...


### `AbstractStorage.js`

I don't want to think about storage.
So this retains/retrieves form values using local storage.


### `AbstractInput.js`

This input wrapper makes forms easier to manipulate.
The field abstraction object provides a regularized interface.
The get/set functions are bound to the `.value` accessor.
It creates the essential structure allows customizable value handling.
All types. You can always read `options` property to see what (if any) indirect values are available

I think this make form input(s) operations much easier to reason about.
It just works as one would expect!


## My objections to form operations

Dealing with reading/writing form inputs is a cognitive quagmire.
Compound fields require touchy looping over options or sister fields.
You need to separate values from status of "checked" or "selected"
Sometimes they are mutually exclusive values, but sometimes not!


### Terms

  `indirect value`

    Involves changing the `checked` or `selected` properties (depending on input type).

  `compound value`

    A so-called input (singular) with the potential for multiple values (always treat as arrays?).

  `compound input`

    The classic is the `radio`... they are conceptually a single/exclusive values but have multiple inputs.
    Any singlularly named input that has multiple indirect values (such as selects).



### The "types" we deal with

Different form inputs have incompatible paradigms for getting and setting values.

The simplest is the direct value for text type fields.

Then the complexity starts with indirect values.
Toggle type fields radio and checkbox (and select) have values determined by selection status
getting and setting this field isn't direct.
you need to track which fields are chosen and then derive values.

It gets even more complicated when the values for those are either exclusive or inclusive.
A radio and single select is by nature an exclusive field with multiple values.
A multiple select or overloaded checkbox are inclusive.

There is the odd case of having multiple checkboxes with the same name (like radios) having _compound_ values.

Having declarative control (treat as data).
 over representing (getting) the value and setting the values in the same way isn't easy.


## Chart

I see the types can be read and written in the following ways.

* type 1 (direct)
  * __text__ get/set with `string` _text type_ fields
* type 2 (indirect, singles)
  * __radios__ get as `string` and set with `string` (while handling the toggle _options abstraction_)
  * __checkbox__ get as `string` set with `string` (or `boolean` check/uncheck all)
  * __select-one__ get as `string`, set as `string` (or `array` uses last value)
* type 3 (indirect, multi)
  * __select-multiple__ get as `array`, set as `array` (or `string` to set only one)
  * __checkboxes/overloaded__ get as `array`, set as `array` (or `string` to set only one)
