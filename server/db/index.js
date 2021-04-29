//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/event')
const List = require('./models/list')

//associations could go here!
User.hasMany(Event);

User.belongsToMany(Event, { through: List, foreignKey: 'userId' });
Event.belongsToMany(User, { through: List, foreignKey: 'eventId' });

module.exports = {
  db,
  User,
  Event,
}
