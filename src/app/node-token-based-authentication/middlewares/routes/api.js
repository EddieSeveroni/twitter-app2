const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const mongoose = require('mongoose')
const db = "mongodb+srv://EddieSeveroni10:1016@cluster0-oxme7.mongodb.net/twitter-app2"

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

router.post('/sign-in', (req, res) => {
    let userData = req.body
    console.log('userData')
    console.log(userData)
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