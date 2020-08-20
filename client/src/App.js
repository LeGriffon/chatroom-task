import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login/Login'
import Chatroom from './pages/Chatroom/Chatroom'

const App = (props) => {
  // state object that stores current username and systemMessage
  const [usernameState, setUsernameState] = useState({
    username: null
  })

  const [systemMessageState, setSystemMessageState] = useState({
    systemMessage: null
  })

  // username state handler for setting username
  const setUsername = (username) => {
    setUsernameState({username: username})
  }

  //system message state handler for setting system message
  const setSystemMessage = (message) => {
    setSystemMessageState({systemMessage: message})
  }

  let display = null
  if(!usernameState.username) {
    display = (
      <Login setUsername={setUsername} systemMessage={systemMessageState.systemMessage} />
    )
  }
  else {
    display = <Chatroom username={usernameState.username} setUsername={setUsername} setSystemMessage={setSystemMessage} />
  }

  return (
    <div className="App">
      {display}
    </div>
  )
}

export default App;
