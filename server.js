const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.send('todo API Root ');
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});