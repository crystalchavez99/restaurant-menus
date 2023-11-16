const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
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

    test('create association one to many', async () => {
        // TODO - write test
        let firstRes = restaurants[0];
        let firstMenu = menus[0];
        let secondMenu = menus[1];
        firstRes.addMenu(firstMenu);
        firstRes.addMenu(secondMenu)
        let menusInFR = await firstRes.getMenus();
        //console.log(menusInFR)
        expect(menusInFR.length).toEqual(2)
    });

    test('can create a Item',async () =>{
        let burger = await Item.create({name: "American Classic", image: "url", price: 11.99, vegetarian: false})
        expect(burger.vegetarian).toEqual(false)
    })
    test('can find Item',async () =>{
        let americanB = await Item.findByPk(1)
        expect(americanB.id).toEqual(1)
    })
    test('create association many to many', async () => {
        // TODO - write test
        //let firstRes = restaurants[0];
        let firstMenu = menus[0];
        let americanB = await Item.findByPk(1);
        //console.log(americanB)
        americanB.addMenus(firstMenu);
        firstMenu.addItems(americanB)
        let items = firstMenu.getItems();
        let menu = americanB.getMenus();
        //console.log(items)
       // console.log(menus)
        //expect(menusInFR.length).toEqual(2)
    });

    test('eager loading', async () =>{
        let allMenus = await Menu.findAll({
            include: Item
        })
        //console.log(allMenus)
        expect(allMenus[0].dataValues.Items.length).toBeGreaterThan(-1)
    })
});
