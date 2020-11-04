import './Pagination.css';

import React from 'react';

export default function Pagination(props) {
    const totalPages = parseInt(props.totalItems / props.itemsPerPage) + (props.totalItems % props.itemsPerPage > 0 ? 1 : 0);
    console.log(props, totalPages);

    const handlePrevious = (event) => {
        if (props.page > 1) {
            props.onPrevious();
        }
    };

    const handleNext = () => {
        if (props.page < totalPages) {
            props.onNext();
        }
    };

    return (
        <ul className='pagination'>
            <li className={props.page > 1 ? '' : 'disabled'}>
                <a href='#!' onClick={handlePrevious}><i className="material-icons">chevron_left</i></a>
            </li>
            <li><a href='#!'>{props.page}</a></li>
            <li className={props.page < totalPages ? '' : 'disabled'}>
                <a href='#!' onClick={handleNext}><i className="material-icons">chevron_right</i></a>
            </li>
        </ul>
    );
}
