const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu)

module.exports = { Restaurant, Menu }
