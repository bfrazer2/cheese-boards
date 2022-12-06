const {sequelize} = require('./db')
const {User, Board, Cheese} = require('./models/index');
const {
    seedUser,
    seedBoard,
    seedCheese
  } = require('./seedData');

describe('User, Board & Cheese Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
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
    });

    test('can create a cheese', async () => {
        const cheese1 = await Cheese.create(seedCheese[0])
        expect(cheese1.title).toEqual("Rubing")
        expect(cheese1.description).toEqual("Hard French Goat Cheese")
    });
});

describe('User, Board & Cheese Associatiosn', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    });

    test('user can have many boards', async () => {
        const user1 = await User.create(seedUser[0])
        const board1 = await Board.create(seedBoard[0])
        const board2 = await Board.create(seedBoard[1])
        await user1.addBoards([board1,board2])
        const user1Boards = await user1.getBoards()
        expect(user1Boards.length).toEqual(2)
        expect(user1Boards[0].type).toEqual("Soft")
        expect(user1Boards[1].type).toEqual("Hard")
    })
    
    test('boards cna have many cheeses & cheeses can have many boards', async () => {
        await sequelize.sync({force: true})
        const board1 = await Board.create(seedBoard[0]) //Soft
        const board2 = await Board.create(seedBoard[2]) //Goat
        const cheese1 = await Cheese.create(seedCheese[0]) //Hard Goat
        const cheese2 = await Cheese.create(seedCheese[1]) //Soft Goat
        const cheese3 = await Cheese.create(seedCheese[2]) //Soft Goat

        await board1.addCheeses([cheese2,cheese3])
        await board2.addCheeses([cheese1,cheese2,cheese3])
        await cheese2.addBoards([board1,board2])

        const board1Cheeses = await board1.getCheeses()
        const cheese2Boards = await cheese2.getBoards()

        expect(board1Cheeses.length).toEqual(2)
        expect(board1Cheeses[0].title).toEqual("Kesong Puti")
        expect(board1Cheeses[1].title).toEqual("Anari")

        expect(cheese2Boards.length).toEqual(2)
        expect(cheese2Boards[0].type).toEqual("Soft")
        expect(cheese2Boards[1].type).toEqual("Goat")
    })
});