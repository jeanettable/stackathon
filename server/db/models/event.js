const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    callType: {
        type: Sequelize.ENUM('EPA', 'ECC', 'EPDA', 'open call'),
    },
    eventDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    eventTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    jobDuration: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    description: {
        type: Sequelize.TEXT,
    },
    contractType: {
        type: Sequelize.ENUM('Broadway', 'LORT', 'Off Broadway', 'Dinner Theatre'),
    },
    productionCo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    jobLocation: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Event