import React from 'react';

import Button from './Button';
import Checkbox from './Checkbox';

export default function TaskItem(props) {
    return (
        <div className='text-action'>
            <span style={{ textDecoration: props.task.state ? 'line-through' : 'none' }}>
                {props.task.description}
            </span>
            <span>
                <span className='mr-1'>
                    <Checkbox
                        value={props.task.state}
                        onChange={(status) => props.onStatusChange(props.task, status)} />
                </span>
                <span>
                    <Button flat={true} onClick={() => props.onClickDelete(props.task)}>
                        <i className='material-icons'>clear</i>
                    </Button>
                </span>
            </span>
        </div>
    );
}
