const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db_url="mongodb://localhost:27017/RealtorDB";

var  db = mongoose.connect(db_url, { useUnifiedTopology: true ,  useCreateIndex: true });

module.exports = db;