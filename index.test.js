const {sequelize} = require('./db')
const {User, Board, Cheese} = require('./models/index');
const {
    seedUser,
    seedBoard,
    seedCheese
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('can create a user', async () => {
        const user1 = await User.create({
            name: "Ben",
            email: "ben@email.com",
        })
        expect(user1.name).toEqual('Ben')
        expect(user1.email).toEqual('ben@email.com')
    });
});