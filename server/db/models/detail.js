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
        // add image placeholder
    },
    headshot: {
        // will store a URL type endpoint
        type: Sequelize.STRING,
                // add image placeholder

    },
});

module.exports = Detail
