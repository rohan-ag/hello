const express = require('express');
const app = express();
const {
    v4: uuidv4
} = require('uuid');

const server = require('http').Server(app);
const socketIO = require('socket.io')(server);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:roomId', (req, res) => {
    res.render('room', {
        roomId: req.params.roomId
    });
})

server.listen(3030);


socketIO.on('connection', socket => {
    socket.on('join-room', () => {
        console.log('Room joined')
    })
})