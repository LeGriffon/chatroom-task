const WebSocket = require('ws');

// created a new server instance at port 8080, disable permessage-deflate
const wss = new WebSocket.Server({ port: 8080 }, {
    perMessageDeflate: false
  });

// clients array for each connection
let clients = []
// username set for duplicate username check
let usernames = new Set()

// emitted when server-client handshake is complete
wss.on('connection', (connection) => {

    // add current connected client to the clients array
    clients.push(connection)

    // when a message is received from client
    connection.on('message', (message) => {
        // parse JSON format data
        const data = JSON.parse(message)

        // code: 0, user left chatroom by clicking disconnect button
        if(data.Code === 0) {
            usernames.delete(data.username)
        }
        // code: 9, requested duplicate username check for new user init
        else if(data.Code === 9){
            console.log(data)
            // duplicate found, send back code: 1, indicating duplicate username
            if(usernames.has(data.username)) {
                connection.send(JSON.stringify({CODE: 1}))
            }
            // add new user to the username set, and welcome new user message from server
            else {
                usernames.add(data.username)
                broadcast({username: data.username, message: "now joined chatroom! :)"})
            }
        }
        // regular message for broadcast
        else {
            broadcast(data)
        }
    })
});


// broadcast function for sending message to each user
function broadcast(message) {
    const data = JSON.stringify(message)
    clients.forEach(client => client.send(data))
}

// clean up any disconnected clients
setInterval(cleanUp, 100)
function cleanUp() {
    const clientsLeaving = clients.filter(client => client.readyState === client.CLOSED)
    clients = clients.filter(client => client.readyState !== client.CLOSED)
}