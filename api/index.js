const { Router } = require('express');
const userRouter = require('./resources/user');
const challengesRouter = require('./resources/challenges');

module.exports.connect = function (app, path) {
    const router = Router();

    router.use('/users', userRouter, function (req, res) {
        res.send(res.locals.data);
    });

    router.use('/challenges', challengesRouter, function (req, res) {
        res.send(res.locals.data);
    });

    app.use(path, router);
};
