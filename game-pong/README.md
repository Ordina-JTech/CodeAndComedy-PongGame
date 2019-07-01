# Code and Comedy - Game Pong

## Prerequisites
* [Node.js](https://nodejs.org/)
* [NPM](https://www.npmjs.com)
* [Angular CLI](https://angular.io/guide/setup-local) - Version 7 or higher

## Installing
```bash
npm install
```

### With bash
Import project into IntelliJ IDEA.

1. Click on "Add Configuration" in the top bar off the IDE.
1. From the list of templates select “Bash”.
    - Set “Script” to `game-pong/src/assets/scripts/pong_start`.
    - Set "Interpreter path" to `/usr/bin/env`.
    - Set "Interpreter options" to `bash`.
    - Below "Before launch: Build, Activate tool window":
        - Press on the `+`
        - Select `Build`.
    - Press Apply.
    - Press OK.
3. Run the application by using the green arrow in the top of the IDE.

### With Terminal
Get public IP address wifi in terminal:

```bash
ipconfig getifaddr en0
```

Run application in terminal:

```bash
ng serve --host 'ipadres'
```
In browser go to:
`ipadres`:4200/
