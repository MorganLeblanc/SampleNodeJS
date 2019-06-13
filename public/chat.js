$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')

    //Initialize buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Send username to client
    send_username.click(function(){
        console.log(username.val())
        socket.emit('change_username', { username: username.val()})
    })

    //Send message to client
    send_message.click(function () {
        socket.emit('new_message', {message : message.val()})
    })

    //listen for new messages from client
    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ":" + data.message + "</p>")
    })

    //When keypressed, emit typing event
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen for other typing events
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
});