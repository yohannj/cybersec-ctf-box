const fs             = require('fs');
const path           = require('path');
const express        = require('express');
const router         = express.Router();
const chartController     = require('../controllers/chartController');

let db;

const response = data => ({ message: data });

router.get('/', (req, res) => {
	let metricName = req.query.metric_name || "pens";

	return db.fetchMetricValues(metricName)
		.then(values => {
			let valByColor = values.reduce(function(map, obj) {
				map[obj.color] = parseInt(obj.value);
				return map;
			}, {});

			return chartController.renderChart(metricName, valByColor)
				.then(chartHTML => {
					return res.send(chartHTML);
				})
				.catch(() => res.status(500).send(response('An internal error occurred. Our administrators have been contacted and will investigate. Considering our very high security exigence, it is likely you are a malicious actor, in that case they will hack you back!')));
		})
});

module.exports = database => { 
	db = database;
	return router;
};
