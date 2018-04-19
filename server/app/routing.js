const routes = require('./routes');
const app = require('express')();

module.exports = () => {
    app.get('/users', routes.user.getAll);
    app.get('/users/:id([0-9]+)', routes.user.getOne);
    app.post('/users', routes.user.create);
    app.put('/users/:id([0-9]+)', routes.user.update);
    app.delete('/users/:id([0-9]+)', routes.user.delete);

    return app;
};
