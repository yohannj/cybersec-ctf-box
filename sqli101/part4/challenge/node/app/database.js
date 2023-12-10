const { ClickHouse } = require('clickhouse');

class Database {
	constructor() {
		this.clickhouse = new ClickHouse({
			url: 'http://clickhouse'
		});
	}

	async testQueryInBlind(query) {
		return this.clickhouse.query(query).toPromise().then((value) => {
			return 'Query is valid';
		})
		.catch(err => {
			return 'Query is not valid';
		});
	}
}

module.exports = Database;
