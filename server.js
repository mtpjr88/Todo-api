const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: 'false'
}, {
	id: 2,
	description: 'Go to market',
	comleted: false
}, {
	id: 3,
	description: 'work on javascript',
	completed: true
}];
app.get('/', function (req, res) {
	res.send('todo API Root ');
});

// GET /todos

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

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});