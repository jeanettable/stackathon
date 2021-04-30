const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    // eventTitle: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // ownerId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
});

const listEntry = db.define('listEntry', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  listId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = {
  List,
  listEntry,
}