# sqli101 - part 4
This is a tutorial challenge to discover and see different kind of SQL injections and way to exploit them.  
Refer to the [presentation](https://docs.google.com/presentation/d/1f11ZtCoYZrSaO8SzACD5eCSsKP6NflrWv6HNrSu7-O4/preview) to go through the tutorial.

In this fourth step, the flag is behind the POST endpoint `/internal/test_query_validity`. An internal API that some developers seems to be using as a helper in prod. It takes one parameter in the body: query.  
Your goal is to find the secret table and read its flag.

## Storytelling
Wow wow wow. One can really dump a whole database just like that?  
I need to revamp my whole backend!

I removed everything.  
Well, actually I kept an internal endpoint to test queries. ClickHouse's query structure adds so much stuff on top of SQL, I need to be able to test my queries.  
It doesn't return any result, so there shouldn't be a problem.

## Playing the box
You can access the code inside the `dist` folder.  
To start the challenge, go to `challenge` and run `docker-compose up -d`.
