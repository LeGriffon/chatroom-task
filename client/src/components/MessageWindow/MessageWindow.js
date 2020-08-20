import React, { Component } from 'react';
import './MessageWindow.css'

const messagewindow = (props) => {
  // function that displays the message from chatroom using props
  const displayMessages = () => props.messages.map(message =>
    <li key={message.message}>
      <div className="message">
        <div className="username">
          <strong>{message.username}</strong>
        </div>
        
        <div className="message-messageContainer">
          <p className="message-content">{message.message}</p>
        </div>
      </div>
    </li>
  )

  return (
    <div className='messageWindow' id='messageDiv'>
      <ul>
        {displayMessages()}
      </ul>
    </div>
  )
};

export default messagewindow;
