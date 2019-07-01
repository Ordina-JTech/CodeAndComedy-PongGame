package nl.ordina.score

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.hateos.JsonError
import io.reactivex.Maybe
import org.slf4j.LoggerFactory

@Controller("/")
class UserController(private val userService: UserService) {

    @Get("/users/scores")
    fun getAllScore(): Maybe<List<User>> {
        log.debug("UserController.findAllScores() executed...")
        return userService.findAllUsers()
    }

    @Get("users/scores/{userId}")
    fun getScore(userId: String): Maybe<User> {
        log.debug("UserController.getScore({}) executed...", userId)
        return userService.findUserByUserId(userId).onErrorComplete()
    }

    @Post()
    fun postNewUser(userId: String): HttpResponse<JsonError> {
        log.debug("UserController.postNewUser({}) executed...", userId)
        return if(userService.addNewUser(userId))
            HttpResponse.ok()
        else
            HttpResponse.notFound()
    }

    companion object {
        private val log = LoggerFactory.getLogger(UserController::class.java)
    }
}