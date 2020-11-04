import './Checkbox.css';

import React, { useState } from 'react';

export default function Checkbox(props) {
    const [state, setState] = useState(props.value || false);
    return (
        <input
            type='checkbox'
            onChange={(event) => {
                event.stopPropagation();
                setState(!state);
                props.onChange(!state);
            }}
            checked={state}></input>
    );
}
