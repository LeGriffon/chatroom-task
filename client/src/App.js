import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login/Login'
import Chatroom from './pages/Chatroom/Chatroom'

class App extends Component {
  // state object that stores current username and systemMessage
  state = {
    username: null,
    systemMessage: null
  }

  // username state handler for setting username
  setUsername = (username) => {
    this.setState({username: username})
  }

  //system message state handler for setting system message
  setSystemMessage = (message) => {
    this.setState({systemMessage: message})
  }

  render() {

    let display = null
    if(!this.state.username) {
      display = (
        <Login setUsername={this.setUsername} systemMessage={this.state.systemMessage} />
      )
    }
    else {
      display = <Chatroom username={this.state.username} setUsername={this.setUsername} setSystemMessage={this.setSystemMessage} />
    }

    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

export default App;
