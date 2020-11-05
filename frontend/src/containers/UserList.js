import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import history from '../history';
import routes from '../routes';
import { config } from '../Constants';

import UserItem from '../components/UserItem';
import { List, ListItem } from '../components/List';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

import { deleteUser, nextPage, previousPage, selectUser } from '../store/actions/users';

export default function UserList() {
    const dispatch = useDispatch();
    const handleUserSelected = (user) => {
        dispatch(selectUser(user));
        history.push(routes.tasks.replace(':userId', user.id.toString()));
    };
    const handleCreateUser = () => {
        history.push(routes.userCreate);
    };
    const handleEditUser = (user) => {
        dispatch(selectUser(user));
        history.push(routes.userEdit.replace(':userId', user.id.toString()));
    };
    const handleDeleteUser = (user) => {
        dispatch(deleteUser(user));
    };

    const { page, users, totalUsers } = useSelector((state) => ({
        page: state.users.page,
        users: state.users.users,
        totalUsers: state.users.totalUsers
    }), shallowEqual);

    const fetching = useSelector(state => state.tasks.fetching);
    let mainEl = <div className='text-message'>Users will appear here...</div>;
    if (users.length > 0) {
        mainEl = (
            <List>
                {users.map((user, i) => (
                    <ListItem key={user.id} onClick={() => handleUserSelected(user)}>
                        <UserItem user={user} onEditClick={handleEditUser} onDeleteClick={handleDeleteUser} />
                    </ListItem>
                ))}
            </List>
        );
    }
    if (fetching) {
        mainEl = <Loader />
    }

    return (
        <div>
            <div className='text-action'>
                <h1>Users</h1>
                <Button onClick={handleCreateUser} ><i className='material-icons'>add</i></Button>
            </div>
            {mainEl}
            <div className='text-message'>
                <Pagination
                    page={page}
                    totalItems={totalUsers}
                    itemsPerPage={config.ITEMS_PAGE}
                    onNext={() => dispatch(nextPage())}
                    onPrevious={() => dispatch(previousPage())} />
            </div>
        </div>
    );
}
