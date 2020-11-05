import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { createUser, updateUser, userValidationError, getUser } from '../store/actions/users';

export default function EditUser() {
    const dispatch = useDispatch();
    const [internalState, setInternalState] = useState({ name: '' });

    let { userId } = useParams();
    userId = parseInt(userId);
    const user = useSelector((state) => state.users.selectedUser);

    useEffect(() => {
        if (userId) {
            if (!user) {
                dispatch(getUser(userId));
            } else {
                setInternalState({ name: user.name });
            }
        }
    }, [user, userId, dispatch]);

    const handleSave = () => {
        if (internalState.name.length === 0) {
            dispatch(userValidationError('Name cannot be empty'));
            return;
        }

        if (userId) {
            dispatch(updateUser(user, internalState.name));
        } else {
            dispatch(createUser(internalState.name));
        }
    }

    const saving = useSelector((state) => state.users.saving);
    const errorMsg = useSelector((state) => state.users.errorMsg);

    if (userId && !user) {
        return <div className='text-message'>User not found!</div>;
    }

    return (
        <div>
            <h1>{user ? 'Update user' : 'Create User'}</h1>
            <TextInput
                label='Name'
                name='name'
                onChange={(val) => setInternalState({ name: val })}
                value={internalState.name}
                autofocus
                errorMsg={errorMsg}>
            </TextInput>
            <span className='mt-1 right'>
                <Button onClick={handleSave}>{saving ? <Loader /> : 'Save'}</Button>
            </span>
        </div>
    );
}
