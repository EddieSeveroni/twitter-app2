const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const mongoose = require('mongoose')
const db = "mongodb+srv://EddieSeveroni10:1016@cluster0-oxme7.mongodb.net/twitter-app2"
// tried also with const db = "mongodb+srv://EddieSeveroni10:1016@cluster0-oxme7.mongodb.net/eventsdb"

// Full driver example that could go into the server.js file under MongoDB connection ?
/** 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://EddieSeveroni10:1016.@cluster0-oxme7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else
            if  ( user.password !== userData.password ) {
                res.status(401).send('Invalid password')
            } else {
                res.status(200).send(user)
            }
        }
    })
})

module.exports = router