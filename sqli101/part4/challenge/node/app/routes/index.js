const express = require('express');
const router  = express.Router();

let db;

router.post('/internal/test_query_validity', (req, res) => {
	let query = req.body.query;

	if(query === undefined) {
		return res.status(400).send('Missing query');
	}

	if(!query.startsWith('SELECT')) {
		return res.status(400).send('query must start with SELECT');
	}

	return db.testQueryInBlind(query)
		.then((value) => {
			return res.status(200).send(value);
		})
		.catch(err => {
			return res.status(500).send('An internal error occurred. Our administrators have been contacted and will investigate. Considering our very high security exigence, it is likely you are a malicious actor, in that case they will hack you back!');
		})
});

module.exports = database => { 
	db = database;
	return router;
};
