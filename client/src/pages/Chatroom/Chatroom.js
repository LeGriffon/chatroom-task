import React, { Component,Fragment } from 'react';
import './Chatroom.css';
import MessageWindow from '../../components/MessageWindow/MessageWindow';
import TextBar from '../../components/TextBar/TextBar';

const URL = 'ws://localhost:8080/'

class Chatroom extends Component {
    // state object that stores Chatroom's message array
    // each message is structured as {username, message}
    state = {
        connection: null,
        messages: [],
        connectionStatus: null
    }

    // Invoked immediately after WebSocket's connection is mounted (inserted into the tree)
    componentDidMount = () => {
        this.connect()
    }

    connect = () => {
        // Create a WebSocket object in order to communicate with the server
        const connection = new WebSocket(URL)

        // WebSocket connection is ready to send and receive data
        // First time mounted to the Chatroom, duplication of the new username has to be checked
        connection.onopen = () => {
            this.initNewUser(connection)
        }

        // messageEvent handler called when a message is received
        connection.onmessage = (message) => {
            const data = JSON.parse(message.data)
            // handles server's exit code: 1 (duplicate username)
            if(data.CODE === 1) {
                this.disconnect(data.CODE)
            }
            // handles server's exit code: 2 (inactive logout)
            else if(data.CODE === 2) {
                this.disconnect(data.CODE)
            }
            // handles server's exit code: 4 (user logout)
            else if(data.CODE === 4) {
                this.disconnect(data.CODE)
            }
            // update local message array with data sent from server
            else{
                this.setState({messages: [...this.state.messages, data]})
            }
        }

        // handles server's exit code: 3 (connection failed)
        connection.onerror = () => {
            this.disconnect(3)
        }

        // handles lost connection
        connection.onclose = () => {
            this.check()
        }
    }

    // connection handler that disconnect user from server with respect to different exit code
    disconnect = (code) => {      
        this.setState({connectionStatus: false})  
        // code 1: server returned error code, duplicate username
        if(code === 1) {
            this.props.setSystemMessage("Username " + this.props.username + " is​ ​already​ ​taken")
        }
        // code 2: server returned error code, inactive logout
        else if(code === 2) {
            this.props.setSystemMessage("Disconnected​ ​by​ ​the​ ​server​ ​due​ ​to​ ​inactivity")
        }
        // code 3: connection failed, unable to connect
        else if(code === 3) {
            this.props.setSystemMessage("Connection failed. Please try again later.")
        }
        // code 4: server returned close code, user logout
        else if(code === 4) {
            this.props.setSystemMessage("You have logged out of the chatroom")
        }
        // connection colse routine
        this.props.setUsername(null)
        this.state.connection !== null ? this.state.connection.close() : undefined
    }

    // duplicate username check handler for each user's init process
    // code 9 is sent to server for duplicate username check
    initNewUser = (connection) => {
        this.setState({connection:connection, connectionStatus: true})
        const data = {username: this.props.username, Code:9}
        this.state.connection.send(JSON.stringify(data))
    }

    // message handler that send client's message to server
    getMessage = (message) => {
        const data = {username: this.props.username, message: message}
        this.state.connection.send(JSON.stringify(data))
    }

    // user logout handler to request close to server
    userLogoutHandler = () => {
        this.setState({connectionStatus: false})  
        const data = {username:this.props.username, Code:0}
        this.state.connection.send(JSON.stringify(data))
    }

    // on connection lost check if connection is valid
    check = () => {
        const { connection } = this.state
        if (connection !== null && connection.readyState === WebSocket.CLOSED && this.state.connectionStatus) {
            this.disconnect(3)
        }
    }

  render() {
    return (
      <Fragment id="chatroom">
          <MessageWindow id='chatroomMessageWindow' messages={this.state.messages} username={this.props.username} />
          <TextBar id='textbar' getMessage={this.getMessage} userLogoutHandler={this.userLogoutHandler} />
      </Fragment>
    );
  }
}

export default Chatroom;
