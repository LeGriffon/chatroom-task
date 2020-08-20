import React, { Component,Fragment } from 'react';
import './Chatroom.css';
import MessageWindow from '../../components/MessageWindow/MessageWindow';
import TextBar from '../../components/TextBar/TextBar';

const URL = 'ws://localhost:8080/'

class Chatroom extends Component {
    // state object that stores Chatroom's message array
    // each message is structured as {username, message}
    state = {
        messages: [],
        connectionStatus: null
    }
    
    // Create a WebSocket object in order to communicate with the server
    connection = new WebSocket(URL)

    // Invoked immediately after WebSocket's connection is mounted (inserted into the tree)
    componentDidMount = () => {

        // WebSocket connection is ready to send and receive data
        // First time mounted to the Chatroom, duplication of the new username has to be checked
        this.connection.onopen = () => {
            this.initNewUser()
        }

        this.connection.onerror = () => {
            this.disconnect(3)
        }

        // messageEvent handler called when a message is received
        this.connection.onmessage = (message) => {
            const data = JSON.parse(message.data)
            // handles server's exit code: 1 (duplicate username)
            if(data.CODE === 1) {
                this.disconnect(data.CODE)
            }
            // handles server's exit code: 2 (inactive logout)
            else if(data.CODE === 2) {
                this.disconnect(data.CODE)
            }
            // update local message array with data sent from server
            else{
                this.setState({messages: [...this.state.messages, data]})
            }
        }

        // routinely check if connection is valid
        setInterval(() => {
            if (this.connection.readyState === WebSocket.CLOSED && this.state.connectionStatus) {
                this.disconnect(3)
            }
        }, 10000);
    }

    // duplicate username check handler for each user's init process
    // code 9 is sent to server for duplicate username check
    initNewUser = () => {
        this.setState({connectionStatus: true})
        const data = {username: this.props.username, Code:9}
        this.connection.send(JSON.stringify(data))
    }

    // message handler that send client's message to server
    getMessage = (message) => {
        const data = {username: this.props.username, message: message}
        this.connection.send(JSON.stringify(data))
    }

    // connection handler that disconnect user from server with respect to different exit code
    disconnect = (code) => {      
        this.setState({connectionStatus: false})  
        // code 0: User left chatroom by clicking disconnect button
        if(code === 0) {
            const data = {username:this.props.username, Code:0}
            this.connection.send(JSON.stringify(data))
            this.props.setSystemMessage("You have logged out of the chatroom")
        }
        // code 1: server returned error code, duplicate username
        else if(code === 1) {
            this.props.setSystemMessage("Username " + this.props.username + " is​ ​already​ ​taken")
        }
        // code 2: server returned error code, inactive logout
        else if(code === 2) {
            this.props.setSystemMessage("Disconnected​ ​by​ ​the​ ​server​ ​due​ ​to​ ​inactivity")
        }
        // code 3: connection failed, unable to connect
        else if(code === 3) {
            this.props.setSystemMessage("Connection failed. Unable​ to connect to ​the​ ​server. Please refresh the page")
        }
        // connection colse routine
        this.props.setUsername(null)
        this.connection.close()
        // const data = {username: this.props.username, Code: 8}
        // this.connection.send(JSON.stringify(data))
    }


  render() {
    return (
      <Fragment id="chatroom">
          <MessageWindow id='chatroomMessageWindow' messages={this.state.messages} username={this.props.username} />
          <TextBar id='textbar' getMessage={this.getMessage} disconnect={this.disconnect} />
      </Fragment>
    );
  }
}

export default Chatroom;
