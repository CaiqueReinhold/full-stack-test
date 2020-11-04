import './TextInput.css';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function TextInput(props) {
    const [state, setState] = useState({ active: false });
    const inputRef = useRef(null);
    const handleFocus = e => setState({ active: e.type === 'focus' });

    let classes = [];
    if (state.active ||
        (inputRef.current && inputRef.current.value.length > 0) ||
        (props.value && props.value.length > 0)) {
        classes.push('active');
    }
    if (state.active) {
        classes.push('focus');
    }

    return (
        <div className='text-input-outer'>
            <div className={`text-input-wrapper ${classes.join(' ')}`}>
                <div className='input-container'>
                    <input type='text' name={props.name} className='input-text'
                        autoFocus={props.autofocus}
                        onFocus={handleFocus}
                        onBlur={handleFocus}
                        onChange={(e) => {
                            props.onChange(e.target.value)
                        }}
                        ref={inputRef}
                        value={props.value}></input>
                    <label className='input-label'>{props.label}</label>
                </div>
                <div className={`input-border ${props.errorMsg ? 'bad' : ''}`}></div>
                <span className={`message ${props.errorMsg ? 'bad' : ''}`}>{props.errorMsg}</span>
            </div>
        </div>
    );
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    autofocus: PropTypes.bool,
    label: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
    value: PropTypes.string
}

TextInput.defaultProps = {
    type: 'text',
    autofocus: false
};

export default TextInput;
