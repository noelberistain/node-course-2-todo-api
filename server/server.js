var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//     console.log(req.body);
// });

app.listen(3000, function () {
    console.log('Started on port 3000');
});

app.post('/todos', function (req, res) {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(
        function (doc) { res.send(doc) },
        function (e) { res.status(400).send(e) });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

module.exports = { app };
// var newTodo = new Todo({
//     text: '     '
// });

// newTodo.save().then(
//     doc =>
//         console.log('Saved todo', doc),
//     e =>
//         console.log('Unable to save todo', e)
// );

// var otherTodo = new Todo({
//     text: 'Something to do'
// });

// otherTodo.save().then(
//     doc =>
//         console.log(JSON.stringify(doc, undefined, 2)),
//     e =>
//         console.log('Unable to save', e)
// );




// var user = new User({
//     email: 'andrew@example.com '
// });

// user.save().then(
//     doc => console.log('User saved', doc),
//     e => console.log('Unable to save user', e)
// );