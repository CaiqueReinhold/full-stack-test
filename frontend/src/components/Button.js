import './Button.css'

import React from 'react';

export default function Button(props) {
    const classes = ['btn'];
    if (props.flat) {
        classes.push('flat');
    }
    return <button className={classes.join(' ')} onClick={props.onClick}>{props.children}</button>;
}
