import './List.css';

import React from 'react';

export function ListItem(props) {
    const classes = ['list-item'];
    if (props.onClick) {
        classes.push('clickable');
    }
    return <div className={classes.join(' ')} onClick={props.onClick} >{props.children}</div>;
}

export function List(props) {
    return (
        <div className='list-container'>
            {props.children}
        </div>
    );
}
