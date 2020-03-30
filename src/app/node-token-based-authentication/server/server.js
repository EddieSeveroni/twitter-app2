const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('../database/db');

// Port number our Express server will run on
const PORT = 3001

// Express API file(s) for the app
const api = require('../middlewares/routes/api');

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect( dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remove MongoDB warning error
mongoose.set('useCreateIndex', true);

// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use('/api', api)

// Define PORT
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
}); 

// Testing a get request
app.get('/' , function(req, res){
    res.send('Hello from server')
})