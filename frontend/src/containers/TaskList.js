import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Pagination from '../components/Pagination';
import { List, ListItem } from '../components/List';
import Button from '../components/Button';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';

import routes from '../routes';
import history from '../history';
import { config } from '../Constants';
import { fetchTasks, updateTaskState, deleteTask, nextPage, previousPage } from '../store/actions/tasks';

export default function TaskList() {
    const dispatch = useDispatch();

    const { tasks, total, page } = useSelector((state) => ({
        tasks: state.tasks.tasks,
        total: state.tasks.totalTasks,
        page: state.tasks.page
    }), shallowEqual);

    const user = useSelector(state => state.users.selectedUser);

    useEffect(() => {
        dispatch(fetchTasks(user.id));
    }, [page, user, dispatch]);

    const handleCreateTask = () => {
        history.push(routes.taskCreate.replace(':userId', user.id));
    };

    const handleStateChange = (task, state) => {
        dispatch(updateTaskState(task, state));
    };

    const handleDelete = (task) => {
        dispatch(deleteTask(task));
    };

    const fetching = useSelector(state => state.tasks.fetching);

    let mainEl = <div className='text-message'>Tasks will appear here...</div>;
    if (tasks.length > 0) {
        mainEl = (
            <List>
                {tasks.map((task, i) => (
                    <ListItem key={task.id}>
                        <TaskItem
                            task={task}
                            onStatusChange={handleStateChange}
                            onClickDelete={handleDelete} />
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
                <h1>{user.name}'s tasks</h1>
                <Button onClick={handleCreateTask}><i className='material-icons'>add</i></Button>
            </div>
            {mainEl}
            <div className='text-message'>
                <Pagination
                    page={page}
                    totalItems={total}
                    itemsPerPage={config.ITEMS_PAGE}
                    onNext={() => dispatch(nextPage())}
                    onPrevious={() => dispatch(previousPage())} />
            </div>
        </div>
    );
}
