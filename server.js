const express = require('express');

const db = require('./data/dbConfig.js');


const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({error: 'there was an issue getting the accounts from the database'})
        })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({error: 'there was an issue getting the account from the database/ it does not exist'})
        })
})

server.post('/api/accounts', (req, res) => {
    db('accounts').insert({name: req.body.name, budget: req.body.budget})
        .then(account => {
            res.status(201).json(account)

        })
        .catch(err => {
            res.status(500).json({error: 'there was an issue createing the account in the database'})
        })
})

server.put('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id}).update({name: req.body.name, budget: req.body.budget})
        .then(num => {
            res.status(200).json(num)
        })
        .catch(err => {
            res.status(500).json({error: 'there was an issue updateing the record in the database'})
        })
}) 

server.delete("/api/accounts/:id", (req, res) => {
    db('accounts').where({id: req.params.id}).del()
        .then(num => {
            res.status(200).json(num)
        })
        .catch(err => {
            res.status(500).json({error: 'there was an issue deleteing the record from the server'})
        })
})

module.exports = server;