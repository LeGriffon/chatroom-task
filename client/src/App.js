import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login'
import Chatroom from './Chatroom/Chatroom'

class App extends Component {
  state = {
    username: null
  }

  setUsername = (username) => {
    this.setState({username})
  }

  render() {

    let display = null
    if(!this.state.username) {
      display = (
        <Login setUsername={this.setUsername} />
      )
    }
    else {
      display = <Chatroom username={this.state.username} setUsername={this.setUsername} />
    }

    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

export default App;
