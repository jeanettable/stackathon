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
    link: {
        type: Sequelize.STRING,
    },
    resume: {
        // will store a URL type endpoint
        type: Sequelize.STRING,
    },
    headshot: {
        // will store a URL type endpoint
        type: Sequelize.STRING,
        defaultValue: 'https://www.pngitem.com/middle/hhmRJo_profile-icon-png-image-free-download-searchpng-employee/',
    },
});

module.exports = Detail
