const {sequelize} = require('./db')
const {User, Board, Cheese} = require('./models/index');
const {
    seedUser,
    seedBoard,
    seedCheese
  } = require('./seedData');

describe('User, Board & Cheese Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('can create a user', async () => {
        const user1 = await User.create(seedUser[0])
        expect(user1.name).toEqual('Ben')
        expect(user1.email).toEqual('ben@email.com')
    });

    test('can create a board', async () => {
        const board1 = await Board.create(seedBoard[0])
        expect(board1.type).toEqual("Soft")
        expect(board1.description).toEqual("Light & Fluffy")
        expect(board1.rating).toEqual(3)
    })
});