# sqli101 - part 1
This is a tutorial challenge to discover and see different kind of SQL injections and way to exploit them.
Refer to the [presentation](https://docs.google.com/presentation/d/1f11ZtCoYZrSaO8SzACD5eCSsKP6NflrWv6HNrSu7-O4/preview) to go through the tutorial.

In this first step, the flag is behind the POST endpoint `/check_credentials`. It takes two parameters in the body: username and password.
Your goal is to find valid credentials.

## Storytelling
I'm building my very first website!
Right now, the backend is ready, can you take a look and give me some feedback?

## Playing the box
You can access the code inside the `dist` folder.
To start the challenge, go to `challenge` and run `docker-compose up -d`.
