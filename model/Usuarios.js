const db = require('./db');

const Usuarios = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING(50), allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING(30), allowNull: false
    },
    email: {
        type: db.Sequelize.STRING(50), allowNull: false, unique: true
    }
});

//Usuarios.sync({force: true});

module.exports = Usuarios;