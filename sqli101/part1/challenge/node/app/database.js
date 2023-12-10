const { ClickHouse } = require('clickhouse');

class Database {
	constructor() {
		this.clickhouse = new ClickHouse({
			url: 'http://clickhouse'
		});
	}

	async testQuery(query) {
		return this.clickhouse.query(query).toPromise();
	}
}

module.exports = Database;
