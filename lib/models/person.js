/*! 
 * dependencies
 */

var mongoose = require('mongoose');

/*! 
 * Schema
 */

var PersonSch = mongoose.Schema({
  firstname: String,
  lastname: String,
  id: String,
  email: String,
  gender: String,
  birthdate: String,
  hash: String
})

var Person = mongoose.model('Person', PersonSch);

/*! 
 * Exports
 */

module.exports = Person;