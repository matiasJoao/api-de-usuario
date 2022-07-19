const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/api', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
