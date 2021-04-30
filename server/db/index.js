//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Event = require('./models/event')
const { List, listEntry } = require('./models/list')
const Detail = require('./models/detail')

//associations could go here!
User.hasMany(Event);  //intended for production-users only**

// User.belongsToMany(Event, { through: List, foreignKey: 'ownerId' });
Event.belongsToMany(User, { through: List, foreignKey: 'eventId' });

User.hasMany(List);
List.belongsTo(User);

List.belongsToMany(User, {
  through: listEntry,
  foreignKey: 'userId',
});
User.belongsToMany(List, {
  through: listEntry,
  foreignKey: 'listId',
  onDelete: 'SET NULL',
});

User.hasOne(Detail);
Detail.belongsTo(User);



//TO VIEW MAGIC METHODS FOR EACH MODEL:
console.log('User MM>>> ', Object.keys(User.prototype));
console.log('Event MM>>> ', Object.keys(Event.prototype));
console.log('List MM>>> ', Object.keys(List.prototype));

module.exports = {
  db,
  User,
  Event,
  List,
  Detail,
}
