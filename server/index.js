const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = []

wss.on('connection', (connection) => {
    clients.push(connection)
    broadcast({username: "admin", message: "A user has entered the chatroom"})

    connection.on('message', (message) => {
        const data = JSON.parse(message)
        broadcast(data)
    })
});

setInterval(cleanUp, 100)

function broadcast(message) {
    const data = JSON.stringify(message)
    clients.forEach(client => client.send(data))
}

function cleanUp() {
    const clientsLeaving = clients.filter(client => client.readyState === client.CLOSED)
    clients = clients.filter(client => client.readyState !== client.CLOSED)
    clientsLeaving.forEach(client => broadcast({username: "admin", message:"A user has left the room"}))
}