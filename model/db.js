const Sequelize = require('sequelize');

const sequelize = new Sequelize("rede_social", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});//Rotas

module.exports = {
    Sequelize: Sequelize,
    sequelize : sequelize
};