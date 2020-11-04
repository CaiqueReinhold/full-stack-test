import React from 'react';

import Button from './Button';

export default function UserItem(props) {
    const handleEdit = (event) => {
        event.stopPropagation();
        props.onEditClick(props.user);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        props.onDeleteClick(props.user);
    };

    return (
        <div className='text-action'>
            <span>{props.user.name}</span>
            <span>
                <span className='mr-1'>
                    <Button flat={true} onClick={handleEdit}><i className="material-icons">create</i></Button>
                </span>
                <span>
                    <Button flat={true} onClick={handleDelete}><i className='material-icons'>clear</i></Button>
                </span>
            </span>
        </div>
    );
}
