# cybersec-ctf-box
Cybersec CTF box proposes multiple cybersecurity challenges to train and test your skills.

Many CTF competitions share their source in Github, which is already an incredible resource for learning.

What you will find in this repository:
* Standardized challenge structure, easy to deploy
* Detailed write ups
* Tutorials (101) to discover a kind of vulnerability
* Harder challenges, hopefully on "widely" used technologies, but scarcely seen in competitions
* Fun and realists challenges

## Browsing the repository
Each box is organised with the file structure:
```
challenge_name or challenge_name/challenge_part_name
  > challenge/*
  > dist/*
  > solution/*
  > README.md
```

The `challenge/` folder helps launchign challenges.
It contains a docker-compose.yml file to run it.
If you are hosting a challenge on a server, you might want to clean what some users might have created on the box. This is not included.

The `dist/` folder contains all public files one should have to solve the challenge.
To save some network, we are only providing a script that will build the artifact.

The `solution/` folder contains a README explaining the intended way to solve the challenge.

The `README.md` file introduces the challenge and explains how to play it to get started quickly.

If you find an unintended way, you're welcome to create an issue or a PR.
The box will either be patched, or your solution will be included in `solution/README.md`.
In both cases, your name will be mentioned on the box to thank you.

## Box
### List
| Challenge | Category | Difficulty |
| --------- | -------- | ---------- |
| [Chart your way](https://github.com/yohannj/cybersec-ctf-box/tree/main/chart_your_way) | Web | Easy |
| [Deserialization 101](https://github.com/yohannj/cybersec-ctf-box/tree/main/deserialization101) | Web | Tuto / Medium |
| [Javansomware](https://github.com/yohannj/cybersec-ctf-box/tree/main/javansomware) | Rev | Easy |
| [Ranxorware](https://github.com/yohannj/cybersec-ctf-box/tree/main/ranxorware) | Rev | Baby |
| [ReaCH me](https://github.com/yohannj/cybersec-ctf-box/tree/main/reaCH_me) | Database | Medium |
| [SQLi 101](https://github.com/yohannj/cybersec-ctf-box/tree/main/sqli101) | Web | Tuto / Easy |

### Adding a box
If you would like to propose a box, you can open an Issue to discuss it.
There is no restriction in terms of category.
