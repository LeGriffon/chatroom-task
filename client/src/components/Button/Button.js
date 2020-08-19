import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div className="button">
          <input onClick={this.props.onClick} type={this.props.type} value={this.props.value}/>
      </div>
    );
  }
}

export default Button;
