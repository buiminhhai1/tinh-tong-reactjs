import React from 'react';
import classes from './Button.module.css';
const Button = (props) => (
    <button 
        name={props.name}
        className={[classes.Button, classes[props.style]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default Button;