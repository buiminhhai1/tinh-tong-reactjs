import React from 'react';
import classes from './Result.module.css';

const Result = (props) => (
    <div className={classes.Result}>
        {props.result}
    </div>
);

export default Result;