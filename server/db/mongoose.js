const mongoose = require('mongoose');
require('../api/models/Users');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test-cubex', { useNewUrlParser: true })
    .then(() => console.log("DB SUCCESS CONNECT"));

module.exports = mongoose;