import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../store/actions/users';

export default function GetUser(props) {
    const dispatch = useDispatch();

    let { userId } = useParams();
    userId = parseInt(userId);

    const user = useSelector((state) => state.users.selectedUser);

    useEffect(() => {
        if (!user) {
            dispatch(getUser(userId));
        }
    }, [userId, user, dispatch]);

    if (!user) {
        return <div className='text-message'>User not found!</div>
    }

    return props.children;
}
