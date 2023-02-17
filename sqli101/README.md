# sqli101

sqli101 is a box introducing SQL injections.

It will cover four injections:
* Bypassing login/password to login as any user
* Retrieving any password in a known table
* Dumping any data when seeing the result of the request
* Dumping any data in a blind SQL injection

To confirm the exploitation of those injections, four flags are to be found, they are in the format: `flag{...}`.

# Material
## Slides
The slides provided presentes briefly what is SQL and what are SQL injections, and then explain the different attacks of this box.
https://docs.google.com/presentation/d/1f11ZtCoYZrSaO8SzACD5eCSsKP6NflrWv6HNrSu7-O4/preview

## Code
This repository can be seen as a white box, do not hesitate to check the code.
Obviously as this is self-hosted, the flags can be read from the code, but the real challenge is to start the services using `docker-compose up -d` and try to find them by interacting with the services.

# Not covered
This box does not explain the underlying technologies that are used. (e.g. docker, clickhouse, nodejs)
Plenty of ressources of high quality are available through your favorite search engine.

# Contributing
Improvements are welcome!

If it concerns the code, please fork this repository and open a PR. It is advised to open an issue first to discuss the improvement.
If it is related to the slides, open an issue.
If you have an improvement idea, you can also open an issue.
