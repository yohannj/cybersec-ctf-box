# sqli101 - part 3
This is a tutorial challenge to discover and see different kind of SQL injections and way to exploit them.  
Refer to the [presentation](https://docs.google.com/presentation/d/1f11ZtCoYZrSaO8SzACD5eCSsKP6NflrWv6HNrSu7-O4/preview) to go through the tutorial.

In this third step, the flag is behind the POST endpoint `/user_lookup`. It takes one parameter in the body: search.  
Your goal is to find the secret table and read its flag.

## Storytelling
Okay, you found my password. That was pretty bad, I was using it everywhere online.  
It took me a week to update all of them. At least now I'm using a password manager.

However, I also stored a secret in the database outside the user table, and it looks like someone found it.  
Can you tell me how they did it?

## Playing the box
You can access the code inside the `dist` folder.  
To start the challenge, go to `challenge` and run `docker-compose up -d`.
