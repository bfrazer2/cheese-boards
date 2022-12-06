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
        const board1 = await Board.create(seedBoard[0]) 
        const board2 = await Board.create(seedBoard[2]) 
        const cheese1 = await Cheese.create(seedCheese[0]) 
        const cheese2 = await Cheese.create(seedCheese[1]) 
        const cheese3 = await Cheese.create(seedCheese[2]) 

        await board1.addCheeses([cheese2,cheese3])
        await board2.addCheeses([cheese1,cheese2,cheese3])
        await cheese2.addBoards([board1,board2])

        const board1Cheeses = await board1.getCheeses()
        const board2Cheeses = await board2.getCheeses()
        const cheese2Boards = await cheese2.getBoards()

        expect(board1Cheeses.length).toEqual(2)
        expect(board1Cheeses[0].title).toEqual("Kesong Puti")
        expect(board1Cheeses[1].title).toEqual("Anari")

        expect(board2Cheeses.length).toEqual(3)

        expect(cheese2Boards.length).toEqual(2)
        expect(cheese2Boards[0].type).toEqual("Soft")
        expect(cheese2Boards[1].type).toEqual("Goat")
    })

    test('boards can be eager loaded with cheeses', async () => {
        await sequelize.sync({force: true})
        await Board.bulkCreate(seedBoard)
        await Cheese.bulkCreate(seedCheese)

        const board1 = await Board.findByPk(1)
        const board2 = await Board.findByPk(3)
        const cheese1 = await Cheese.findByPk(2)
        const cheese2 = await Cheese.findByPk(3)
        const cheese3 = await Cheese.findByPk(1)
        await board1.addCheeses([cheese1,cheese2])
        await board2.addCheeses([cheese1,cheese2,cheese3])

        const boardWithCheeses = await Board.findAll({
            include: [
                {model: Cheese}
            ]
        })

        expect(boardWithCheeses[0].cheeses.length).toBe(2)
        expect(boardWithCheeses[1].cheeses.length).toBe(0)
        expect(boardWithCheeses[2].cheeses.length).toBe(3)
    })

    test('users can be eager loaded with boards', async () => {
        await User.bulkCreate(seedUser)

        const user1 = await User.findByPk(1)
        const board1 = await Board.findByPk(1)
        const board2 = await Board.findByPk(2)
        await user1.addBoards([board1,board2])

        const userWithBoards = await User.findAll({
            include: [{model: Board}]
        })

        expect(userWithBoards[0].boards.length).toBe(2)
        expect(userWithBoards[1].boards.length).toBe(0)
    })

    test('boards can be eager loaded with cheeses', async () => {
        const board1 = await Board.findByPk(1)
        const board2 = await Board.findByPk(3)
        const cheese2 = await Cheese.findByPk(3)
        await cheese2.addBoards([board1,board2])

        const cheeseWithBoards = await Cheese.findAll({
            include: [
                {model: Board}
            ]
        })

        expect(cheeseWithBoards[2].boards.length).toBe(2)
        expect(cheeseWithBoards[1].boards.length).toBe(0)
    })
});