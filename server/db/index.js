//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/event')
const { List, listEntry } = require('./models/list')

//associations could go here!
User.hasMany(Event);  //intended for production-users only

User.belongsToMany(Event, { through: List, foreignKey: 'ownerId' });
Event.belongsToMany(User, { through: List, foreignKey: 'eventId' });

List.hasMany(listEntry);
User.hasOne(listEntry); // creates unique constraint: one user, one entry per list

//TO VIEW MAGIC METHODS FOR EACH MODEL:
console.log('User MM>>> ', Object.keys(User.prototype));
console.log('Event MM>>> ', Object.keys(Event.prototype));
// console.log('List MM>>> ', Object.keys(List.prototype));

module.exports = {
  db,
  User,
  Event,
  List,
}
