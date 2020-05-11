const express = require('express');
const Router = express.Router();
const {
    getLists,
    createList,
    addUpdateListItem,
    deleteList    
} = require('../../data/lists');

Router.get('/', async function(req, res, next) {
    try {
        const data = await getLists();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

Router.post('/', async function(req, res, next) {
    try {
        const data = await createList(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});