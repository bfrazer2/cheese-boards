const {User} = require('./User')
const {Board} = require('./Board')
const {Cheese} = require('./Cheese')

Board.belongsTo(User)
User.hasMany(Board)

Cheese.belongsToMany(Board, {through: "cheese_baord"})
Board.belongsToMany(Cheese, {through: "cheese_board"})

module.exports = {User,Board,Cheese}