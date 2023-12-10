const express       = require('express');
const app           = express();
const routes        = require('./routes');
const Database      = require('./database');

const db = new Database();

app.use(express.json());
app.use(routes(db));

app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

(async () => {
	app.listen(80, '0.0.0.0', () => console.log('Listening on port 80'));
})();
