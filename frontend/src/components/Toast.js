import './Toast.css';

import React from 'react';
import { useSelector } from 'react-redux';

export default function Toast() {
    const msg = useSelector((state) => state.toast);
    if (msg) {
        return (
            <div className='toast-container'>
                <div className='toast'>{msg}</div>
            </div>
        );
    }
    return null;
}
