const WebSocket = require('ws');

// created a new server instance at port 8080, disable permessage-deflate
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log("Chatroom server started, listening on port 8080...")
  });

// clients array for each connection
let clients = []
// username set for duplicate username check
let usernames = new Set()

// user timeout in milliseconds
const userTimeout = 90000

// emitted when server-client handshake is complete
wss.on('connection', (connection) => {
    // when a message is received from client
    connection.on('message', (message) => {
        // parse JSON format data
        const data = JSON.parse(message)

        // code: 0, user left chatroom by clicking disconnect button, instruct user to close the connection
        if(data.Code === 0) {
            console.log(data.username + ' left chatroom, server received code: 0')
            usernames.delete(data.username)
            connection.send(JSON.stringify({CODE: 4}))
        }
        // code: 9, requested duplicate username check for new user init
        else if(data.Code === 9){
            // duplicate found, send back code: 1, indicating duplicate username
            if(usernames.has(data.username)) {
                console.log('New user is trying: ' + data.username + ' which is a duplicate username, server return code: 1')
                connection.send(JSON.stringify({CODE: 1}))
            }
            // add new user to the username set, and welcome new user message from server
            else {
                console.log(data.username + ' is added as a new user to the chatroom')
                // add current connected client to the clients array
                clients.push({connection: connection, username: data.username, activeTime: Date.now()})
                usernames.add(data.username)
                broadcast({username: data.username, message: 'now joined chatroom! :)'})
            }
        }
        // regular message for broadcast
        else {
            clients.find(client => client.connection === connection)['activeTime'] = Date.now()
            broadcast(data)
        }
    })
});

// broadcast function for sending message to each user
function broadcast(message) {
    const data = JSON.stringify(message)
    clients.forEach(client => client.connection.send(data))
}

// clean up any disconnected clients
setInterval(cleanUp, 100)
function cleanUp() {
    // clean up clients that are inactive
    const clientsTimeoutLeaving = clients.filter(client => Date.now() - client.activeTime > userTimeout)
    clientsTimeoutLeaving.forEach(client => {
        broadcast({username: client.username, message: 'was​ ​disconnected​ ​due​ ​to inactivity'})
        console.log(client.username + ' is disconnected due to inactivity, server return code 2')
        usernames.delete(client.username)
        client.connection.send(JSON.stringify({CODE: 2}))
    })
    // clean up clients that have lost connection
    const clientsDisconnectLeaving = clients.filter(client => client.connection.readyState === client.connection.CLOSED)
    clientsDisconnectLeaving.forEach(client => {
        broadcast({username: client.username, message: ' ​left​ ​the​ ​chat,​ ​connection​ ​lost'})
        console.log(client.username + ' is disconnected')
        usernames.delete(client.username)
    })
    clients = clients.filter(client =>  client.connection.readyState !== client.connection.CLOSED)
    clients = clients.filter(client => Date.now() - client.activeTime <= userTimeout)
}

// gracefully close the server upon receiving SIGTERM and SIGINT
process.on('SIGTERM', () => {
    wss.close()
    console.info('SIGTERM received. Closing the server..')
    process.exit(0);
})
process.on('SIGINT', () => {
    wss.close()
    console.info('SIGINT received. Closing the server..')
    process.exit(0);
})