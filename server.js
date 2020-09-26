const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('room.ejs');
})

server.listen(3030);