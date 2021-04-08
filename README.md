# Formeez

A breeding ground for micro-libs

Tired of these things?
* reading a checkbox by seeing if it is checked and then deriving the value?
* trying to set a radio buttons by iterating over them to see which is which?
* getting or setting selects by touching all the options and selected properties?

This little collection of modules helps when dealing with thigs like getting
form data structure (inputs) to act more like data objects in scripting.

----
## Helper libs
Supporting modules do fundamentally useful jquery-type stuff.

### `Q.js`
Helps with element querying

### `Klass.js`
Does basic class name manipulation

### `Util.js`
Misc, like exporting values to global scope, provides "ready-hook"

----

## Form Ease
Ease your use of forms, and stuff.

### `AbstractInput.js`
Dealing with reading/writing form inputs is a cognitive quagmire.
Compound fields require touchy looping over options or sister fields.
You need to separate values from status of "checked" or "selected"
Sometimes they are mutually exclusive values, but sometimes not!

This input wrapper makes forms easier to manipulate.
The field abstraction object provides a common interface.
The get/set functions are bound to the "value" accessor.
It creates the essential structure allows customizable value handling.

### `AbstractForm.js`
  just want simple way to treat form logically without the strangeness
  don't want to think about storage, retrieval

### `AbstractStorage.js`
It also consolidates to local storage for retaining input values.
