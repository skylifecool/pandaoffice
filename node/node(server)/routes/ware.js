const sequelize = require('./models').sequelize;

const {
    Board,
    Category,
    User,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    get : {
    board_data : (body, callback) => {
        Board.findAll({
            where : { board_id : body.id }
        })
        .then(result => {
            callback(result);
        })
        .catch(err => {
            throw err;
        })
    }
}