const { ClickHouse } = require('clickhouse');

class Database {
	constructor() {
		this.clickhouse1 = new ClickHouse({
			url: 'http://clickhouse1'
		});
		this.clickhouse2 = new ClickHouse({
			url: 'http://clickhouse2'
		});
	}

	async testQuery(query) {
		return this.clickhouse1.query(query).toPromise();
	}

	async testQueryInBlind(query) {
		return this.clickhouse2.query(query).toPromise().then((value) => {
			return 'Query is valid';
		})
		.catch(err => {
			return 'Query is not valid';
		});
	}
}

module.exports = Database;
