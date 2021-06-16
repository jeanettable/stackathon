//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Event = require('./models/event')
// const List = require('./models/list')
const UserDetails = require('./models/userDetail')

//associations could go here!
User.belongsToMany(Event, { through: 'lists' });
Event.belongsToMany(User, { through: 'lists' });

User.hasOne(UserDetails);

//TO VIEW MAGIC METHODS FOR EACH MODEL:
console.log('User MM>>> ', Object.keys(User.prototype));
console.log('Event MM>>> ', Object.keys(Event.prototype));

module.exports = {
  db,
  User,
  Event,
  // List,
  UserDetails,
}
