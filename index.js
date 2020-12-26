global.__basedir = __dirname;

const path = require('path');
const express = require("express");
const config = require('./config/config.json')
const bodyParser = require('body-parser');
const api = require('./api');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/styles/*.css', function (req, res) {
    const reqPath = req.path;
    res.sendFile(path.join(__basedir, ...reqPath.split('/')), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

app.get('/assets/*', function (req, res) {
    const reqPath = req.path;
    res.sendFile(path.join(__basedir, ...reqPath.split('/')), function (err) {
        if (err) {
            console.error(err);
        }
    })
})

app.get('/lit-html/*', function (req, res) {
    const reqPath = req.path;
    res.sendFile(path.join(__basedir, 'node_modules', ...reqPath.split('/')), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

app.use(express.static(path.join(__basedir, 'static')));

api.connect(app, '/api');

app.get('/', function (req, res) {
    res.sendFile(path.join(__basedir, 'index.html'));
});

app.get('/sign-in', function (req, res) {
    res.sendFile(path.join(__basedir, 'sign-in.html'));
});

app.get('*', function (req, res) {
    res.status(404).send('PAGE NOT FOUND!');
});

app.use(function (err, req, res, next) {
    if(err.message === 'BAD_REQUEST') {
        res.status(400).send('BAD_REQUEST');
        return;
    }
    res.status(500).send('SERVER ERROR');
});

db.connect().then(() => {
    app.listen(config.port, function() {
        console.log(`Server is listening on: ${config.port}`);
    });
});