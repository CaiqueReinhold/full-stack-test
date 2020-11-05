const prod = {
    USERS_DOMAIN: 'https://caique-users-app.herokuapp.com/api/v1',
    TASKS_DOMAIN: 'https://caique-tasks-app.herokuapp.com/api/v1',
    ITEMS_PAGE: 20,
};

const dev = {
    USERS_DOMAIN: 'http://localhost:8000/api/v1',
    TASKS_DOMAIN: 'http://localhost:8001/api/v1',
    ITEMS_PAGE: 20,
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
