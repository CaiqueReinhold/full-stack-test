import './App.css';

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import routes from './routes';

import CenterFrame from './components/CenterFrame';
import Toast from './components/Toast';

import UserList from './containers/UserList';
import EditUser from './containers/EditUser';
import TaskList from './containers/TaskList';
import GetUser from './containers/GetUser';
import EditTask from './containers/EditTask';

import { fetchUsers } from './store/actions/users';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <CenterFrame>
        <Switch>
          <Route path={routes.users} component={UserList} exact />
          <Route path={routes.userCreate} component={EditUser} exact />
          <Route path={routes.userEdit} component={EditUser} exact />
          <Route path={'/user/:userId'}>
            <GetUser>
              <Route path={routes.tasks} component={TaskList} exact />
              <Route path={routes.taskCreate} component={EditTask} exact />
            </GetUser>
          </Route>

        </Switch>
      </CenterFrame>
      <Toast />
    </div>
  );
}

export default App;
