
/**
 * Module dependencies.
 */

var type;

try {
  type = require('type');
} catch(e){
  type = require('type-component');
}

/**
 * Module exports.
 */

module.exports = copy;

/**
 * Copies the properties of `obj`.
 *
 * @param {Mixed} any object
 * @param {Mixed} any object
 * @api public
 */

function copy(obj,to){
  switch (type(obj)) {
    case 'object':
      var c = type(to) == 'object' ? to : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          c[key] = copy(obj[key],c[key]);
        }
      }
      return c;

    case 'array':
      var c = type(to) == 'array' ? to : [];
      c.length = obj.length;
      for (var i = 0, l = obj.length; i < l; i++) {
        c[i] = copy(obj[i],c[i]);
      }
      return c;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}
