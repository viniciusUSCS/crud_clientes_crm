const Sequelize = require('sequelize');
const db = require('../db/connection');

const Cliente = db.define('cliente', {
    nome: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    endereço: {
        type: Sequelize.STRING,
    },
    telefone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    feedback: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Cliente