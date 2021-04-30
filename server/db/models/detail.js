const Sequelize = require('sequelize');
const db = require('../db')

const Detail = db.define('detail', {
    displayName: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.STRING,
    },
    contactTel: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },
    resume: {
        // will store a URL type endpoint
        type: Sequelize.STRING,
    },
    headshot: {
        // will store a URL type endpoint
        type: Sequelize.STRING,
    },
});

module.exports = Detail
