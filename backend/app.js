require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));

//app user
const Todo = require("./model/model").Todo;

//main

app.get("/todo", async (req, res) => {
    try {
        const toto_list = await Todo.find()
        return res.status(200).json(toto_list);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
})

app.post("/todo/add", async (req, res) => {
    try {
        const item = await Todo.create({
            content: req.body.content
        });
        return res.status(200).json(item);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
})

app.post("/todo/delete/:id", async (req, res) => {
    try {
        id = req.params.id
        const item = await Todo.remove({
            _id: id
        }) 
        return res.status(200).json(item);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
})

//search


module.exports = app;