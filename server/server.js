const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const router =  require('./api/routes/index');
const mongoose = require('mongoose');
require('./api/models/Users');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test-cubex', { useNewUrlParser: true }).then(() => console.log("DB SUCCESS CONNECT"));

app.use(express.json());

const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));

app.use('/api', router);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(PORT);

console.log('API server started on: ' + PORT);


