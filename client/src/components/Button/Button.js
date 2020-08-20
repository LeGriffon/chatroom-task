import React, { Component } from 'react';
import './Button.css'

const button = (props) => {
  return (
    <div>
        <input className='button' onClick={props.onClick} type={props.type} value={props.value}/>
    </div>
  )
};

export default button;
