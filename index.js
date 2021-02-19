global.__basedir = __dirname;

const path = require('path');
const express = require("express");
const config = require('./config/config.json')
const bodyParser = require('body-parser');
const api = require('./api');
const db = require('./db');
const fileUpload = require('express-fileupload');

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
    });
});

app.get('/challenge-photos/*', function (req, res) {
    const reqPath = req.path;
    res.sendFile(path.join(__basedir, ...reqPath.split('/')), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

app.get('/lit-html/*', function (req, res) {
    const reqPath = req.path;
    res.sendFile(path.join(__basedir, 'node_modules', ...reqPath.split('/')), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

app.use(fileUpload());

app.post('/fileupload', (req, res) => {
    const fileName = req.files.fileContent.name;
    const filePath = path.join(__basedir, 'challenge-photos', fileName);

    console.log(filePath);

    req.files.fileContent.mv(filePath, (error) => {
        if(error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
              });
            res.end(JSON.stringify({ status: 'error', message: error }))
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }));
    })
});

app.use(express.static(path.join(__basedir, 'static')));

api.connect(app, '/api');

app.get('/', function (req, res) {
    res.sendFile(path.join(__basedir, 'index.html'));
});

app.get('/log-in', function (req, res) {
    res.sendFile(path.join(__basedir, 'log-in.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__basedir, 'register.html'));
})

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