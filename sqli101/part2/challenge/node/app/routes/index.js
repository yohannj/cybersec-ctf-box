const express = require('express');
const router  = express.Router();

let db;

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

module.exports = database => { 
	db = database;
	return router;
};
