const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Menu model
let Menu = sequelize.define("Menu", {
title: Sequelize.STRING
})
module.exports = {Menu};
