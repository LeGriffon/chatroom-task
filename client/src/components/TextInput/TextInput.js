import React, { Component } from 'react';
import './TextInput.css'

const textinput = (props) => {
  return (
      <input className='textinput' onKeyDown={props.onKeyDown} type={props.type} id={props.id} value={props.value} />
  );
}

export default textinput;
