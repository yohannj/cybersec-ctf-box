const express = require('express');
const router  = express.Router();

let db;

router.post('/check_credentials', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	if(username === undefined || password === undefined) {
		return res.status(400).send('Missing username or password in a json body');
	}

	return db.testQuery("SELECT count() as c\nFROM user\nWHERE username = '" + username + "' AND password = '" + password + "'")
		.then((value) => {
			let response = value[0]['c'] === 0 ? 'Invalid credentials' : 'Valid credentials, here is your flag: flag{to_be_or_not_to_be_let_me_be_admin}';
			return res.status(200).send(response);
		})
		.catch(err => {
			return res.status(500).send('An internal error occurred. Our administrators have been contacted and will investigate. Considering our very high security exigence, it is likely you are a malicious actor, in that case they will hack you back!');
		})
});

router.post('/user_lookup', (req, res) => {
	let search = req.body.search;

	if(search === undefined) {
		return res.status(400).send('Missing search');
	}

	return db.testQuery("SELECT username\nFROM user\nWHERE username LIKE '%" + search + "%'")
		.then((value) => {
			let response = value.map(row => row['username']);
			return res.status(200).send(response);
		})
		.catch(err => {
			return res.status(500).send('An internal error occurred. Our administrators have been contacted and will investigate. Considering our very high security exigence, it is likely you are a malicious actor, in that case they will hack you back!');
		})
});

router.post('/internal/test_query_validity', (req, res) => {
	let query = req.body.query;

	if(query === undefined) {
		return res.status(400).send('Missing query');
	}

	if(!query.startsWith('SELECT')) {
		return res.status(400).send('query must start with ');
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
