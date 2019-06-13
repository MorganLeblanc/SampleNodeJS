//set express as framework
const express = require('express')
const app = express()

//set ejs as template engine
app.set('view engine', 'ejs')

//set middleware
app.use(express.static('public'))

//Client routes
app.get('/', (req, res) => {
    res.render('chat')
})

//listen on port 3000
server = app.listen(3000)

//socket.io setup
const io = require("socket.io")(server)

//listen to every connection
io.on('connection', (socket) => {
    console.log('New user has connected')

    //set default username
    socket.username = "Anonymous"

    //Listen for user attempting to change username
    socket.on('change_username', (data) => {
        console.log(data.username)
        socket.username = data.username
    })

    //listen for new message from user
    socket.on('new_message', (data) => {
        //display the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })


    //Listen for typing messages and broadcast them to other users
    socket.on('typing', (data => {
        socket.broadcast.emit('typing', {username : socket.username})
    }))
})