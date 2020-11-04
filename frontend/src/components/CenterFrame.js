import './CenterFrame.css'

import React from 'react'

export default function CenterFrame(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}
