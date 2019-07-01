# Code and Comedy - Game Host

## Prerequisites
* [Gradle](https://docs.gradle.org/current/userguide/installation.html#installing_gradle)
* [Kotlin](https://kotlinlang.org/docs/reference/using-gradle.html)
* [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - Java SE Development Kit 8


## Installing
1. Let IntelliJ Gradle build the project. It will do this automatically
2. After the build is finished click on "Add Configuration" in the top bar off the IDE.
3. From the list of templates select “Kotlin”.
    - Set “user classpath of module” to `game-host.main`.
    - Set "Main class" to `nl.ordina.Application`.
    - Below "Before launch: Build, Activate tool window":
        - Press on the `+`
        - Select `Run gradle task`.
        - Set "gradle project" to `game-host` by selecting the folder with the blue square.
        - By "Tasks" select `testClasses`.
        - Press OK.
    - Press Apply.
    - Press OK.
4. Run the application by using the green arrow in the top of the IDE.


