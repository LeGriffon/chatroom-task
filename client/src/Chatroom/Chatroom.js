import React, { Component,Fragment } from 'react';
import MessageWindow from './MessageWindow/MessageWindow';
import TextBar from './TextBar/TextBar';

const URL = 'ws://localhost:8080/'

class Chatroom extends Component {
    // state object that stores Chatroom's message array
    // each message is structured as {username, message}
    state = {
        messages: []
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
    }

    // duplicate username check handler for each user's init process
    // code 9 is sent to server for duplicate username check
    initNewUser = () => {
        const data = {username: this.props.username, Code:9}
        this.connection.send(JSON.stringify(data))
    }

    // message handler that send user's message to server and update local meesage array 
    getMessage = (message) => {
        const data = {username: this.props.username, message: message}
        this.connection.send(JSON.stringify(data))
    }

    // connection handler that disconnect user from server with respect to different exit code
    disconnect = (code) => {        
        // code 0: User left chatroom by clicking disconnect button
        if(code === 0) {
            const data = {username:this.props.username, Code:0}
            this.connection.send(JSON.stringify(data))
            this.getMessage(" just left the chatroom, ​connection​ ​lost :(")
            this.props.setSystemMessage("You have logged out of the chatroom")
        }
        // code 1: server returned error code, duplicate username
        else if(code === 1) {
            this.props.setSystemMessage(this.props.username + " Nickname is​ ​already​ ​taken")
        }
        // code 1: server returned error code, inactive logout
        else if(code === 2) {
            this.props.setSystemMessage("Disconnected​ ​by​ ​the​ ​server​ ​due​ ​to​ ​inactivity")
        }
        // connection colse routine
        this.props.setUsername(null)
        this.connection.close()
    }


  render() {
    return (
      <Fragment>
          <MessageWindow messages={this.state.messages} />
          <TextBar getMessage={this.getMessage} disconnect={this.disconnect} />
      </Fragment>
    );
  }
}

export default Chatroom;
