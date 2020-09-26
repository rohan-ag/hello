const express = require('express');
const app = express();
const server = require('http').Server(app);

const {
    v4: uuidv4
} = require('uuid');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:roomId', (req, res) => {
    res.render('room', {
        roomId: req.params.roomId
    });
})

server.listen(3030);