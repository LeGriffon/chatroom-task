import React, { Component } from 'react';
import './Button.css'

class Button extends Component {
  render() {
    return (
      <div>
          <input className='button' onClick={this.props.onClick} type={this.props.type} value={this.props.value}/>
      </div>
    );
  }
}

export default Button;
