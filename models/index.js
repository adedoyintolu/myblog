const { Categories } = require('./category');
const { dbConnection } = require('./database');
const { Tags } = require('./tag');
const { Users } = require('./user');
const { Comments } = require('./comment');


module.exports = { Categories, Tags, Users, Comments, dbConnection };

