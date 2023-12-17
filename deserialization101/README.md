# Deserialization 101
This is a tutorial challenge to discover Insecure Deserialization in Java and way to exploit them.  
Refer to the [presentation](https://docs.google.com/presentation/d/1rHkQTNvTNiaPtfItw8ZyQSbm9QYDS4XJZtlmva9SYT0/preview) to go through the tutorial.

The flag is in the file `flag` located in the root folder of the service.

## Storytelling
I'm writing an App with many mini games.

I just created a first one. There is a hardcoded list of numbers and you have to guess them all!  
You can send a number, and it will tell you how many numbers in the list are smaller than yours.

Do you want to play with me? Hopefully you cannot break my game...

## Playing the box
You can access the code inside the `dist` folder.  
To start the challenge, go to `challenge` and run `docker-compose up -d`.

## Not covered
This box expects basic Java and Python knowledge.  
Plenty of ressources of high quality are available through your favorite search engine.

## Contributing
Improvements are welcome!

If it concerns the code, please fork this repository and open a PR. It is advised to open an issue first to discuss the improvement.  
If it is related to the slides, open an issue.  
If you have an improvement idea, you can also open an issue.
