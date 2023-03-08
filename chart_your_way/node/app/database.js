const { ClickHouse } = require('clickhouse');

class Database {
	constructor() {
		this.clickhouse = new ClickHouse({
			url: 'http://clickhouse'
		});
	}

	async fetchMetricValues(metricName) {
		return this.clickhouse
					.query(`SELECT color, ${metricName} as value FROM data`)
					.toPromise()
					.catch(err => []);
	}
}

module.exports = Database;
