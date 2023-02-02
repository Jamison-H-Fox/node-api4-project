const express = require('express')
const cors = require('cors')

const User = require('./users/users-model')

const server = express()
server.use(express.json())
server.use(cors())

const userArray = [
    { 
        name: 'Joey Tribbiani',
        age: 27,
        gender: 'male',
        email: 'joey@friends.hbo',
    },
    { 
        name: 'Ross Gheller',
        age: 29,
        gender: 'male',
        email: 'ross@friends.hbo',
    },
    { 
        name: 'Chandler Bing',
        age: 29,
        gender: 'male',
        email: 'chandler@friends.hbo',
    },
    { 
        name: 'Monica Gheller',
        age: 26,
        gender: 'female',
        email: 'monica@friends.hbo',
    },
    { 
        name: 'Rachel Green',
        age: 26,
        gender: 'female',
        email: 'rachel@friends.hbo',
    },
    { 
        name: 'Pheobe Buffet',
        age: 29,
        gender: 'female',
        email: 'pheobe@friends.hbo',
    },
]

server.get('/api/users', (req, res, next) => {
    res.json(userArray)
})

server.post('/api/register', (req, res, next) => {
    User.register(req.body)
    res.status(201).json(req.body)
})

server.post('/api/login', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ message: "please provide username and password" })
    } else {
        res.status(200).json({ message: `Welcome, ${username}!` })
    }
})

server.use('*', (req, res, next) => {
    res.send('<h1>Hello, there!</h1>')
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server;