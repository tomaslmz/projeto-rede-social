const db = require('./db');

const Postagens = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING, allowNull: false
    },

    conteudo: {
        type: db.Sequelize.TEXT, allowNull: false
    },

    curtidas: {
        type: db.Sequelize.INTEGER, allowNull: true
    },

    idUsuario: {
        type: db.Sequelize.INTEGER, allowNull: false
    }
});

// Postagens.sync({force: true});

module.exports = Postagens;