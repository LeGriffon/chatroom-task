import React, { Component } from 'react';
import './TextInput.css'

class TextInput extends Component {
  render() {
    return (
        <input className='textinput' onKeyDown={this.props.onKeyDown} type={this.props.type} id={this.props.id} value={this.props.value} />
    );
  }
}

export default TextInput;
