const express = require('express');
const bodyParser = require('body-parser');

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
	let matchedTodo;

	//iterate over todos array. find the match.
	todos.map(function(todo) {
		if(todoid === todo.id){
		 matchedTodo = todo;
		} 
	});

	if (matchedTodo) {  // if the variable is found return otherwise return not found
		return res.json(matchedTodo);
	} else{
		return res.status(404).send();
	}

});

//POST request /todos
app.post('/todos', function(req, res) {
	let body = req.body;

	// add id field
	body.id = todoNextId++;

	// push body into array
	todos.push(body);

	res.json(body);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});

