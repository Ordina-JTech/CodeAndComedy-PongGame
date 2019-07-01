# Code and Comedy Pong Game

## Prerequisites

### For game-client, -server and -pong
* [Node.js](https://nodejs.org/)
* [NPM](https://www.npmjs.com)

### For game-client and -pong
* [Angular CLI](https://angular.io/guide/setup-local) - Version 7 or higher

### For game-host
* [Gradle](https://docs.gradle.org/current/userguide/installation.html#installing_gradle)
* [Kotlin](https://kotlinlang.org/docs/reference/using-gradle.html)
* [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - Java SE Development Kit 8


## Installing

A step by step series of examples that tell you how to get a development env running

### For game-client, -server and -pong
```bash
npm install
```
### For game-host
1. Import project into IntelliJ IDEA.
1. Select the folder where you put the git repo (/game-host).
2. Let IntelliJ Gradle build the project. It will do this automatically

## Deployment

### For game-host, -server and -pong
The game-host, -server and -pong can be deployed with Docker. The `docker build` command must be run from inside their respective project directories. The projects must be run in this order:
* Run game-host:
```bash
docker build -t codeandcomedy-game-host .
docker run --rm -p 8080:8080 codeandcomedy-game-host
```
* Run game-server:
```bash
docker build -t codeandcomedy-game-server .
docker run --rm -p 5000:5000 codeandcomedy-game-server
```
* Run game-pong:
```bash
docker build -t codeandcomedy-game-pong .
docker run --rm -p 3000:80 codeandcomedy-game-pong
```

### For game-client
Upload production files to codeandcomedy.nl/games.
#### Join Game with Phone
Go to codeandcomedy.nl/games in phone browser and enter a username and gamepin.
