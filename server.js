const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
const todos = [];
let todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('todo API Root ');
});

// GET request /todos

app.get('/todos', function(req, res) {
	res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id', function(req, res) {
	const todoid = parseInt(req.params.id, 10); // any request returns as a string thus needs to be an Integer
	const matchedTodo = _.findWhere(todos, {id: todoid});


	if (matchedTodo) {  // if the variable is found return otherwise return not found
		return res.json(matchedTodo);
	} else{
		return res.status(404).send();
	}

});

//POST request /todos
app.post('/todos', function(req, res) {
	let body = _.pick(req.body, 'description', 'completed'); // use_.pick to only pick description and completed

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;


	todos.push(body);

	res.json(body);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});
