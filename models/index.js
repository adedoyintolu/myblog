const { Categories } = require('./category');
const { dbConnection } = require('./database');
const { Tags } = require('./tag');
const { Users } = require('./user');
const { Comments } = require('./comment');
const { Posts } = require('./post');


module.exports = { Categories, Tags, Users, Comments, Posts, dbConnection };

