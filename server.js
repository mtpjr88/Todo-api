const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 3000;
let todos = [];
let todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('todo API Root ');
});

// GET request /todos?completed=true

app.get('/todos', function(req, res) {
	const queryParams = req.query;
	let filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {completed: false});
	}

	res.json(filteredTodos);
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

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;


	todos.push(body);

	res.json(body);
});

// Delete /todos/:id
app.delete('/todos/:id', function(req, res) {
	let todoid = parseInt(req.params.id, 10);
	let matchedTodo = _.findWhere(todos, {id:todoid});

	if(!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

// PUT .todos/:id
app.put('/todos/:id', function (req,res) {
	const todoId = parseInt(req.params.id, 10);
	const matchedTodo = _.findWhere(todos, {id: todoId});
	const body = _.pick(req.body, 'description', 'completed');
	let validAttributes = {};

	if (!matchedTodo){
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
			return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description;
	}	else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

		_.extend(matchedTodo, validAttributes);
		res.json(matchedTodo);

});
app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});
