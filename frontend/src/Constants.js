const prod = {
    USERS_DOMAIN: 'https://myapp.herokuapp.com',
    TASKS_DOMAIN: 'https://myapp.herokuapp.com/users',
    ITEMS_PAGE: Number(20),
};

const dev = {
    USERS_DOMAIN: 'http://localhost:8000/api/v1',
    TASKS_DOMAIN: 'http://localhost:8001/api/v1',
    ITEMS_PAGE: Number(20),
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
