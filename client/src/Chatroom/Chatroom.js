import React, { Component,Fragment } from 'react';
import MessageWindow from './MessageWindow/MessageWindow';
import TextBar from './TextBar/TextBar';

const URL = 'ws://localhost:8080/'

class Chatroom extends Component {
    state = {
        messages: []
    }
    
    connection = new WebSocket(URL)

    componentDidMount = () => {
        this.connection.onopen = () => {
            console.log('connected')
          }

        this.connection.onmessage = (message) => {
            const data = JSON.parse(message.data)
            this.setState({messages: [...this.state.messages, data]})
        }

        this.connection.onclose = () => {
            console.log('disconnected, trying to reconnect')
            // automatically try to reconnect on connection loss
            this.setState({
                connection: new WebSocket(URL),
            })
        }
    }

    getMessage = (message) => {
        const data = {username: this.props.username, message: message}
        this.connection.send(JSON.stringify(data))
        this.setState({messages: [...this.state.messages, message]})
    }

    disconnect = () => {
        console.log('Disconnecting')
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
