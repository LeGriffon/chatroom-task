import React, { Component } from 'react';

class MessageWindow extends Component {

    displayMessages = () => this.props.messages.map(message => 
        <div>
            <strong>{message.username}</strong> <em>{message.message}</em>
        </div>
    )
    

  render() {
    return (
      <div id="messageWindow">
          {this.displayMessages()}
      </div>
    );
  }
}

export default MessageWindow;
