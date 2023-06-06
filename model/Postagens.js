const db = require('./db');

const Postagens = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING, allowNull: false
    },

    conteudo: {
        type: db.Sequelize.TEXT, allowNull: false
    },

   idUsuario: {
        type: db.Sequelize.INTEGER, allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
});

//Postagens.sync({force: true});

module.exports = Postagens;