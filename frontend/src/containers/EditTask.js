import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { taskValidationError, createTask } from '../store/actions/tasks';

export default function EditTask() {
    const dispatch = useDispatch();
    const [internalState, setInternalState] = useState({ description: '' });
    const user = useSelector((state) => state.users.selectedUser);

    const handleSave = () => {
        if (internalState.description.length === 0) {
            dispatch(taskValidationError('Task description cannot be empty'));
            return;
        }

        dispatch(createTask(user.id, internalState.description));
    }

    const errorMsg = useSelector(state => state.tasks.errorMsg);
    const saving = useSelector(state => state.tasks.saving);
    return (
        <div>
            <h1>New task</h1>
            <TextInput
                label='Description'
                name='description'
                onChange={(val) => setInternalState({ description: val })}
                value={internalState.description}
                autofocus
                errorMsg={errorMsg}>
            </TextInput>
            <span className='mt-1 right'>
                <Button onClick={handleSave}>{saving ? <Loader /> : 'Save'}</Button>
            </span>
        </div>
    );
}
