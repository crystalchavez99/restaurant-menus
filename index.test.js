const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    let restaurants;
    let menus;
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the
        // test suite is run
        await sequelize.sync({ force: true });
        restaurants = await Restaurant.bulkCreate(seedRestaurant);
        menus = await Menu.bulkCreate(seedMenu)
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        let firstRes = restaurants[0];
        expect(firstRes.name).toEqual("AppleBees")
    });

    test('can create a Menu', async () => {
        // TODO - write test
        let firstMenu = menus[0];
        expect(firstMenu.title).toEqual('Breakfast')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        let indi = await Restaurant.findByPk(3)
        expect(indi.cuisine).toEqual('Indian')
    });

    test('can find Menus', async () => {
        // TODO - write test
        let lunch = await Menu.findOne({ where: { title: 'Lunch' } });
        expect(lunch.title).toEqual('Lunch')
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        let byeSheep = await Restaurant.findByPk(2);
        await byeSheep.destroy();
        byeSheep = await Restaurant.findByPk(2);
        expect(byeSheep).toEqual(null)
    });
})
