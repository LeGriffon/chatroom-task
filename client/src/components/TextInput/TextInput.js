import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    return (
        <input onKeyDown={this.props.onKeyDown} type={this.props.type} id={this.props.id} value={this.props.value} />
    );
  }
}

export default TextInput;
