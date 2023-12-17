# sqli101 - part 2
This is a tutorial challenge to discover and see different kind of SQL injections and way to exploit them.  
Refer to the [presentation](https://docs.google.com/presentation/d/1f11ZtCoYZrSaO8SzACD5eCSsKP6NflrWv6HNrSu7-O4/preview) to go through the tutorial.

In this second step, the flag is behind the POST endpoint `/user_lookup`. It takes one parameter in the body: search.  
Your goal is to read the admin password.

## Storytelling
Come on, that vulnerability isn't that bad. One could only connect as another user.

I removed that function, in the mean time I added a new feature: search user.  
It's important to connect with other people.

## Playing the box
You can access the code inside the `dist` folder.  
To start the challenge, go to `challenge` and run `docker-compose up -d`.
