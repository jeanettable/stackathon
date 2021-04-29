//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/event')
const List = require('./models/list')

//associations could go here!
User.hasMany(Event);

User.belongsToMany(Event, { through: List, foreignKey: 'userId' });
Event.belongsToMany(User, { through: List, foreignKey: 'eventId' });

User.hasMany(Event);
List.belongsTo(User);

//TO VIEW MAGIC METHODS FOR EACH MODEL:
console.log('User MM>>> ', Object.keys(User.prototype));
console.log('Event MM>>> ', Object.keys(Event.prototype));
console.log('List MM>>> ', Object.keys(List.prototype));

module.exports = {
  db,
  User,
  Event,
  List,
}
