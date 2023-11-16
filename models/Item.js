const {sequelize} = require("../db");
const {Sequelize} = require("sequelize");

let Item = sequelize.define("Item", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN
});

module.exports = {Item}
